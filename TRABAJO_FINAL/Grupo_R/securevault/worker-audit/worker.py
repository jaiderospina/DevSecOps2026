"""
Worker de Auditoría — SecureVault
Proceso asíncrono independiente que:
1. Escucha eventos del broker RabbitMQ (queue: secret_events)
2. Periódicamente revisa secretos con más de N días sin rotar y los marca como 'expired'
3. Publica alertas en queue: secret_alerts
"""
import pika
import json
import time
import logging
import os
import threading
from datetime import datetime, timedelta, timezone
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [WORKER-AUDIT] %(levelname)s %(message)s"
)
logger = logging.getLogger(__name__)

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://securevault:securevault@postgres:5432/securevault")
RABBITMQ_URL = os.getenv("RABBITMQ_URL", "amqp://guest:guest@rabbitmq:5672/")
ROTATION_DAYS = int(os.getenv("SECRET_ROTATION_DAYS", "90"))
CHECK_INTERVAL = int(os.getenv("CHECK_INTERVAL_SECONDS", "30"))

engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)


def get_connection_with_retry(max_retries=10, delay=5):
    for attempt in range(max_retries):
        try:
            return pika.BlockingConnection(pika.URLParameters(RABBITMQ_URL))
        except Exception as e:
            logger.warning(f"RabbitMQ not ready (attempt {attempt+1}/{max_retries}): {e}")
            time.sleep(delay)
    raise RuntimeError("Could not connect to RabbitMQ")


def publish_alert(channel, alert: dict):
    channel.queue_declare(queue="secret_alerts", durable=True)
    channel.basic_publish(
        exchange="",
        routing_key="secret_alerts",
        body=json.dumps(alert),
        properties=pika.BasicProperties(delivery_mode=2)
    )
    logger.info(f"Alert published: {alert}")


def check_expired_secrets(alert_channel):
    """Mark secrets older than ROTATION_DAYS as expired and publish alerts."""
    db = Session()
    try:
        cutoff = datetime.now(timezone.utc) - timedelta(days=ROTATION_DAYS)
        result = db.execute(
            text("""
                UPDATE secrets
                SET status = 'expired'
                WHERE last_rotated_at < :cutoff AND status = 'active'
                RETURNING id, name, owner_id
            """),
            {"cutoff": cutoff}
        )
        expired = result.fetchall()
        db.commit()

        for row in expired:
            secret_id, name, owner_id = row
            logger.warning(f"Secret expired: id={secret_id} name={name} owner={owner_id}")
            try:
                publish_alert(alert_channel, {
                    "type": "SECRET_EXPIRED",
                    "secret_id": str(secret_id),
                    "secret_name": name,
                    "owner_id": str(owner_id),
                    "message": f"Secret '{name}' has not been rotated in {ROTATION_DAYS}+ days.",
                    "timestamp": datetime.now(timezone.utc).isoformat(),
                })
            except Exception as e:
                logger.error(f"Failed to publish alert: {e}")

        if expired:
            logger.info(f"Marked {len(expired)} secret(s) as expired.")
        else:
            logger.info("No expired secrets found.")
    except Exception as e:
        logger.error(f"Error checking secrets: {e}")
        db.rollback()
    finally:
        db.close()


def on_event_received(ch, method, properties, body):
    try:
        event = json.loads(body)
        logger.info(f"Event received: {event.get('event')} for secret {event.get('secret_id')}")
        ch.basic_ack(delivery_tag=method.delivery_tag)
    except Exception as e:
        logger.error(f"Error processing event: {e}")
        ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)


def periodic_checker(alert_channel):
    """Run the expiry check on a fixed interval."""
    while True:
        logger.info(f"Running periodic expiry check (threshold: {ROTATION_DAYS} days)...")
        try:
            check_expired_secrets(alert_channel)
        except Exception as e:
            logger.error(f"Periodic check failed: {e}")
        time.sleep(CHECK_INTERVAL)


def wait_for_db(retries=15, delay=5):
    for i in range(retries):
        try:
            with engine.connect() as conn:
                conn.execute(text("SELECT 1"))
            logger.info("Database connection established.")
            return
        except Exception as e:
            logger.warning(f"DB not ready (attempt {i+1}/{retries}): {e}")
            time.sleep(delay)
    raise RuntimeError("Could not connect to database")


def main():
    logger.info("SecureVault Audit Worker starting...")
    wait_for_db()

    connection = get_connection_with_retry()
    channel = connection.channel()

    channel.queue_declare(queue="secret_events", durable=True)
    channel.queue_declare(queue="secret_alerts", durable=True)
    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue="secret_events", on_message_callback=on_event_received)

    # Alert channel (separate connection for thread safety)
    alert_conn = get_connection_with_retry()
    alert_channel = alert_conn.channel()

    # Start periodic checker in background thread
    checker_thread = threading.Thread(
        target=periodic_checker,
        args=(alert_channel,),
        daemon=True
    )
    checker_thread.start()

    logger.info("Worker ready. Listening for events on 'secret_events'...")
    try:
        channel.start_consuming()
    except KeyboardInterrupt:
        logger.info("Worker shutting down...")
        channel.stop_consuming()
    finally:
        connection.close()
        alert_conn.close()


if __name__ == "__main__":
    main()

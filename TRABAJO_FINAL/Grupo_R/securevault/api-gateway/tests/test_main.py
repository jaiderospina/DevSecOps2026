import os
import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(BASE_DIR))

os.environ["DATABASE_URL"] = "sqlite:///./test.db"
os.environ["SECRET_KEY"] = "test-secret-key-which-is-long-enough-123456"
os.environ["FERNET_KEY"] = "TlgmqrgYgDKS7jKdLdZEJn-4RzLMKqy0LqJKJLWqoaA="
os.environ["RABBITMQ_URL"] = "amqp://guest:guest@localhost:5672/"
os.environ["ALLOW_SELF_REGISTER_ADMIN"] = "false"

from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.database import Base, get_db
from app.main import app

SQLALCHEMY_TEST_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_TEST_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db


def reset_db():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)


def test_health():
    reset_db()
    with TestClient(app) as client:
        r = client.get("/health")
        assert r.status_code == 200
        assert r.json()["status"] == "healthy"


def test_register():
    reset_db()
    with TestClient(app) as client:
        r = client.post("/api/v1/auth/register", json={
            "username": "testuser",
            "email": "test@test.com",
            "password": "Secret123!",
            "role": "editor"
        })
        assert r.status_code == 201
        assert r.json()["username"] == "testuser"


def test_register_duplicate():
    reset_db()
    with TestClient(app) as client:
        client.post("/api/v1/auth/register", json={
            "username": "dup", "email": "dup@test.com", "password": "pass123"
        })
        r = client.post("/api/v1/auth/register", json={
            "username": "dup", "email": "dup2@test.com", "password": "pass123"
        })
        assert r.status_code == 400


def test_admin_self_registration_blocked():
    reset_db()
    with TestClient(app) as client:
        r = client.post("/api/v1/auth/register", json={
            "username": "badadmin",
            "email": "badadmin@test.com",
            "password": "Secret123!",
            "role": "admin"
        })
        assert r.status_code == 403


def test_login():
    reset_db()
    with TestClient(app) as client:
        client.post("/api/v1/auth/register", json={
            "username": "loginuser",
            "email": "login@test.com",
            "password": "mypassword",
            "role": "editor"
        })
        r = client.post("/api/v1/auth/login", json={"username": "loginuser", "password": "mypassword"})
        assert r.status_code == 200
        assert "access_token" in r.json()


def test_login_invalid():
    reset_db()
    with TestClient(app) as client:
        r = client.post("/api/v1/auth/login", json={"username": "nobody", "password": "wrong"})
        assert r.status_code == 401


def get_token(client: TestClient, username="secuser", role="editor"):
    client.post("/api/v1/auth/register", json={
        "username": username,
        "email": f"{username}@test.com",
        "password": "password123",
        "role": role
    })
    r = client.post("/api/v1/auth/login", json={"username": username, "password": "password123"})
    return r.json()["access_token"]


def test_create_secret():
    reset_db()
    with TestClient(app) as client:
        token = get_token(client)
        r = client.post(
            "/api/v1/secrets/",
            json={"name": "MY_API_KEY", "value": "super-secret-value", "category": "api_key"},
            headers={"Authorization": f"Bearer {token}"}
        )
        assert r.status_code == 201
        assert r.json()["name"] == "MY_API_KEY"


def test_viewer_cannot_create_secret():
    reset_db()
    with TestClient(app) as client:
        token = get_token(client, "vieweruser", "viewer")
        r = client.post(
            "/api/v1/secrets/",
            json={"name": "SECRET", "value": "val", "category": "other"},
            headers={"Authorization": f"Bearer {token}"}
        )
        assert r.status_code == 403


def test_reveal_secret():
    reset_db()
    with TestClient(app) as client:
        token = get_token(client, "revealuser")
        create_r = client.post(
            "/api/v1/secrets/",
            json={"name": "DB_PASS", "value": "mysecretpass", "category": "password"},
            headers={"Authorization": f"Bearer {token}"}
        )
        secret_id = create_r.json()["id"]
        r = client.get(f"/api/v1/secrets/{secret_id}/reveal", headers={"Authorization": f"Bearer {token}"})
        assert r.status_code == 200
        assert r.json()["value"] == "mysecretpass"


def test_audit_log_created():
    reset_db()
    with TestClient(app) as client:
        token = get_token(client, "audituser")
        client.post(
            "/api/v1/secrets/",
            json={"name": "AUDIT_KEY", "value": "val123", "category": "api_key"},
            headers={"Authorization": f"Bearer {token}"}
        )
        r = client.get("/api/v1/audit/", headers={"Authorization": f"Bearer {token}"})
        assert r.status_code == 200
        actions = [log["action"] for log in r.json()]
        assert "CREATE_SECRET" in actions


Path("test.db").unlink(missing_ok=True)


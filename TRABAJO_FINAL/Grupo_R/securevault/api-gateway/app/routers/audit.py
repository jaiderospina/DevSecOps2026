from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional
from app.core.database import get_db
from app.models.models import AuditLog, User, UserRole
from app.auth.jwt import get_current_user

router = APIRouter()


@router.get("/")
def get_audit_logs(
    limit: int = Query(50, le=200),
    offset: int = 0,
    action: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(AuditLog)
    if current_user.role != UserRole.admin:
        query = query.filter(AuditLog.user_id == current_user.id)
    if action:
        query = query.filter(AuditLog.action == action)
    logs = query.order_by(AuditLog.timestamp.desc()).offset(offset).limit(limit).all()
    return [
        {
            "id": str(log.id),
            "user_id": str(log.user_id) if log.user_id else None,
            "username": log.user.username if log.user else "system",
            "action": log.action,
            "resource": log.resource,
            "resource_id": log.resource_id,
            "details": log.details,
            "ip_address": log.ip_address,
            "timestamp": log.timestamp,
        }
        for log in logs
    ]


@router.get("/stats")
def get_stats(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    from app.models.models import Secret, SecretStatus
    from sqlalchemy import func
    total_secrets = db.query(Secret).filter(Secret.owner_id == current_user.id).count() if current_user.role != UserRole.admin else db.query(Secret).count()
    expired_secrets = db.query(Secret).filter(Secret.status == SecretStatus.expired).count()
    total_logs = db.query(AuditLog).count() if current_user.role == UserRole.admin else db.query(AuditLog).filter(AuditLog.user_id == current_user.id).count()
    return {
        "total_secrets": total_secrets,
        "expired_secrets": expired_secrets,
        "total_audit_events": total_logs,
    }

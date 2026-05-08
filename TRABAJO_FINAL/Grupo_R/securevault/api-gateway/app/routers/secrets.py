from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional, List
from app.core.database import get_db
from app.core.encryption import encrypt_value, decrypt_value
from app.models.models import Secret, SecretCategory, SecretStatus, AuditLog, User, UserRole, SecretAccess
from app.auth.jwt import get_current_user
from datetime import datetime, timezone
import pika, json
from app.core.config import settings

router = APIRouter()


class SecretCreate(BaseModel):
    name: str
    description: Optional[str] = None
    value: str
    category: SecretCategory = SecretCategory.other
    assign_to_user_ids: Optional[List[str]] = []


class SecretUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    value: Optional[str] = None
    category: Optional[SecretCategory] = None


class SecretAccessGrant(BaseModel):
    user_ids: List[str]


def log_action(db, user_id, action, resource, resource_id=None, ip=None, details=None):
    log = AuditLog(
        user_id=user_id, action=action, resource=resource,
        resource_id=str(resource_id) if resource_id else None,
        ip_address=ip, details=details, timestamp=datetime.now(timezone.utc)
    )
    db.add(log)
    db.commit()


def publish_event(event: dict):
    try:
        connection = pika.BlockingConnection(pika.URLParameters(settings.RABBITMQ_URL))
        channel = connection.channel()
        channel.queue_declare(queue="secret_events", durable=True)
        channel.basic_publish(
            exchange="", routing_key="secret_events",
            body=json.dumps(event),
            properties=pika.BasicProperties(delivery_mode=2)
        )
        connection.close()
    except Exception:
        pass


def _user_can_access(secret: Secret, current_user: User, db: Session) -> bool:
    if current_user.role == UserRole.admin:
        return True
    if str(secret.owner_id) == str(current_user.id):
        return True
    access = db.query(SecretAccess).filter(
        SecretAccess.secret_id == secret.id,
        SecretAccess.granted_to_user_id == current_user.id
    ).first()
    return access is not None


@router.post("/", status_code=201)
def create_secret(req: SecretCreate, request: Request, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role == UserRole.viewer:
        raise HTTPException(status_code=403, detail="Viewers cannot create secrets")
    secret = Secret(
        name=req.name,
        description=req.description,
        encrypted_value=encrypt_value(req.value),
        category=req.category,
        owner_id=current_user.id,
    )
    db.add(secret)
    db.commit()
    db.refresh(secret)

    if current_user.role == UserRole.admin and req.assign_to_user_ids:
        for uid in req.assign_to_user_ids:
            target = db.query(User).filter(User.id == uid).first()
            if target and str(target.id) != str(current_user.id):
                existing = db.query(SecretAccess).filter(
                    SecretAccess.secret_id == secret.id,
                    SecretAccess.granted_to_user_id == uid
                ).first()
                if not existing:
                    db.add(SecretAccess(
                        secret_id=secret.id,
                        granted_to_user_id=uid,
                        granted_by_user_id=current_user.id
                    ))
        db.commit()

    log_action(db, current_user.id, "CREATE_SECRET", "secret", secret.id, request.client.host if request.client else None, f"name={secret.name}")
    publish_event({"event": "secret_created", "secret_id": str(secret.id), "owner": current_user.username})
    return {"id": str(secret.id), "name": secret.name, "category": secret.category, "status": secret.status, "created_at": secret.created_at}


@router.get("/")
def list_secrets(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role == UserRole.admin:
        secrets = db.query(Secret).all()
    else:
        owned = db.query(Secret).filter(Secret.owner_id == current_user.id).all()
        shared_ids = db.query(SecretAccess.secret_id).filter(
            SecretAccess.granted_to_user_id == current_user.id
        ).all()
        shared_ids = [s[0] for s in shared_ids]
        shared = db.query(Secret).filter(Secret.id.in_(shared_ids)).all() if shared_ids else []
        owned_ids = {s.id for s in owned}
        secrets = owned + [s for s in shared if s.id not in owned_ids]

    result = []
    for s in secrets:
        is_shared = str(s.owner_id) != str(current_user.id) and current_user.role != UserRole.admin
        result.append({
            "id": str(s.id),
            "name": s.name,
            "description": s.description,
            "category": s.category,
            "status": s.status,
            "created_at": s.created_at,
            "last_rotated_at": s.last_rotated_at,
            "owner_id": str(s.owner_id),
            "is_shared": is_shared,
        })
    return result


@router.get("/{secret_id}/reveal")
def reveal_secret(secret_id: str, request: Request, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    secret = db.query(Secret).filter(Secret.id == secret_id).first()
    if not secret:
        raise HTTPException(status_code=404, detail="Secret not found")
    if not _user_can_access(secret, current_user, db):
        raise HTTPException(status_code=403, detail="Access denied")
    log_action(db, current_user.id, "REVEAL_SECRET", "secret", secret.id, request.client.host if request.client else None, f"name={secret.name}")
    return {"id": str(secret.id), "name": secret.name, "value": decrypt_value(secret.encrypted_value)}


@router.put("/{secret_id}/rotate")
def rotate_secret(secret_id: str, req: SecretUpdate, request: Request, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    secret = db.query(Secret).filter(Secret.id == secret_id).first()
    if not secret:
        raise HTTPException(status_code=404, detail="Secret not found")
    if current_user.role == UserRole.viewer:
        raise HTTPException(status_code=403, detail="Viewers cannot rotate secrets")
    if not _user_can_access(secret, current_user, db):
        raise HTTPException(status_code=403, detail="Access denied")
    if req.value:
        secret.encrypted_value = encrypt_value(req.value)
        secret.last_rotated_at = datetime.now(timezone.utc)
        secret.status = SecretStatus.active
    if req.name:
        secret.name = req.name
    if req.description:
        secret.description = req.description
    secret.updated_at = datetime.now(timezone.utc)
    db.commit()
    log_action(db, current_user.id, "ROTATE_SECRET", "secret", secret.id, request.client.host if request.client else None)
    publish_event({"event": "secret_rotated", "secret_id": str(secret.id), "owner": current_user.username})
    return {"message": "Secret rotated", "id": str(secret.id), "last_rotated_at": secret.last_rotated_at}


@router.put("/{secret_id}")
def update_secret(secret_id: str, req: SecretUpdate, request: Request, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    secret = db.query(Secret).filter(Secret.id == secret_id).first()
    if not secret:
        raise HTTPException(status_code=404, detail="Secret not found")
    if current_user.role == UserRole.viewer:
        raise HTTPException(status_code=403, detail="Viewers cannot edit secrets")
    if not _user_can_access(secret, current_user, db):
        raise HTTPException(status_code=403, detail="Access denied")
    if req.name:
        secret.name = req.name
    if req.description is not None:
        secret.description = req.description
    if req.category:
        secret.category = req.category
    secret.updated_at = datetime.now(timezone.utc)
    db.commit()
    log_action(db, current_user.id, "UPDATE_SECRET", "secret", secret.id, request.client.host if request.client else None, f"name={secret.name}")
    return {"message": "Secret updated", "id": str(secret.id)}


@router.delete("/{secret_id}", status_code=204)
def delete_secret(secret_id: str, request: Request, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    secret = db.query(Secret).filter(Secret.id == secret_id).first()
    if not secret:
        raise HTTPException(status_code=404, detail="Secret not found")
    if current_user.role == UserRole.viewer:
        raise HTTPException(status_code=403, detail="Viewers cannot delete secrets")
    if not _user_can_access(secret, current_user, db):
        raise HTTPException(status_code=403, detail="Access denied")
    log_action(db, current_user.id, "DELETE_SECRET", "secret", secret_id, request.client.host if request.client else None, f"name={secret.name}")
    db.delete(secret)
    db.commit()


# ─── Gestión de accesos ───────────────────────────────────────────────────────

@router.get("/{secret_id}/access")
def get_secret_access(secret_id: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    secret = db.query(Secret).filter(Secret.id == secret_id).first()
    if not secret:
        raise HTTPException(status_code=404, detail="Secret not found")
    if current_user.role == UserRole.viewer:
        raise HTTPException(status_code=403, detail="Access denied")
    if not _user_can_access(secret, current_user, db):
        raise HTTPException(status_code=403, detail="Access denied")
    accesses = db.query(SecretAccess).filter(SecretAccess.secret_id == secret_id).all()
    return [
        {
            "id": str(a.id),
            "granted_to_user_id": str(a.granted_to_user_id),
            "granted_to_username": a.granted_to.username if a.granted_to else None,
            "granted_to_role": str(a.granted_to.role) if a.granted_to else None,
            "granted_by_username": a.granted_by.username if a.granted_by else None,
            "created_at": a.created_at,
        }
        for a in accesses
    ]


@router.post("/{secret_id}/access")
def grant_secret_access(secret_id: str, req: SecretAccessGrant, request: Request, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    secret = db.query(Secret).filter(Secret.id == secret_id).first()
    if not secret:
        raise HTTPException(status_code=404, detail="Secret not found")
    if current_user.role == UserRole.viewer:
        raise HTTPException(status_code=403, detail="Viewers cannot grant access")
    if current_user.role == UserRole.editor and str(secret.owner_id) != str(current_user.id):
        raise HTTPException(status_code=403, detail="Only the owner editor can grant access to this secret")

    granted = []
    for uid in req.user_ids:
        target = db.query(User).filter(User.id == uid).first()
        if not target:
            continue
        if str(target.id) == str(current_user.id):
            continue
        if current_user.role == UserRole.editor and target.role != UserRole.viewer:
            raise HTTPException(status_code=403, detail=f"Editors can only assign secrets to viewers. User '{target.username}' has role '{target.role}'")
        existing = db.query(SecretAccess).filter(
            SecretAccess.secret_id == secret_id,
            SecretAccess.granted_to_user_id == uid
        ).first()
        if not existing:
            db.add(SecretAccess(
                secret_id=secret_id,
                granted_to_user_id=uid,
                granted_by_user_id=current_user.id
            ))
            granted.append(target.username)

    db.commit()
    log_action(db, current_user.id, "GRANT_ACCESS", "secret", secret_id, request.client.host if request.client else None, f"granted_to={granted}")
    return {"message": "Access granted", "granted_to": granted}


@router.delete("/{secret_id}/access/{target_user_id}", status_code=204)
def revoke_secret_access(secret_id: str, target_user_id: str, request: Request, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    secret = db.query(Secret).filter(Secret.id == secret_id).first()
    if not secret:
        raise HTTPException(status_code=404, detail="Secret not found")
    if current_user.role == UserRole.viewer:
        raise HTTPException(status_code=403, detail="Access denied")
    if current_user.role == UserRole.editor and str(secret.owner_id) != str(current_user.id):
        raise HTTPException(status_code=403, detail="Only the owner editor can revoke access")
    access = db.query(SecretAccess).filter(
        SecretAccess.secret_id == secret_id,
        SecretAccess.granted_to_user_id == target_user_id
    ).first()
    if not access:
        raise HTTPException(status_code=404, detail="Access record not found")
    db.delete(access)
    db.commit()
    log_action(db, current_user.id, "REVOKE_ACCESS", "secret", secret_id, request.client.host if request.client else None, f"revoked_from={target_user_id}")

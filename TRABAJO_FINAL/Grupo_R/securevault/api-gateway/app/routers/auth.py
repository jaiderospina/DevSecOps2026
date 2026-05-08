from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Request, status
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session

from app.auth.jwt import (
    create_access_token,
    create_refresh_token,
    decode_token,
    get_current_user,
    hash_password,
    verify_password,
)
from app.core.config import settings
from app.core.database import get_db
from app.models.models import AuditLog, User, UserRole

router = APIRouter()


class RegisterRequest(BaseModel):
    username: str
    email: EmailStr
    password: str
    role: UserRole = UserRole.viewer


class LoginRequest(BaseModel):
    username: str
    password: str


class RefreshRequest(BaseModel):
    refresh_token: str


def log_action(db: Session, user_id, action: str, resource: str, ip: str = None, details: str = None):
    log = AuditLog(
        user_id=user_id,
        action=action,
        resource=resource,
        ip_address=ip,
        details=details,
        timestamp=datetime.now(timezone.utc),
    )
    db.add(log)
    db.commit()


@router.post("/register", status_code=201)
def register(req: RegisterRequest, request: Request, db: Session = Depends(get_db)):
    if db.query(User).filter(User.username == req.username).first():
        raise HTTPException(status_code=400, detail="Username already taken")
    if db.query(User).filter(User.email == req.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    if req.role == UserRole.admin and not settings.ALLOW_SELF_REGISTER_ADMIN:
        raise HTTPException(status_code=403, detail="Self-registration with admin role is disabled")

    user = User(
        username=req.username,
        email=req.email,
        hashed_password=hash_password(req.password),
        role=req.role,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    log_action(db, user.id, "REGISTER", "user", request.client.host if request.client else None)
    return {"message": "User created", "username": user.username, "role": user.role}


@router.post("/login")
def login(req: LoginRequest, request: Request, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == req.username, User.is_active.is_(True)).first()
    if not user or not verify_password(req.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    access_token = create_access_token({"sub": user.username, "role": user.role})
    refresh_token = create_refresh_token({"sub": user.username})
    log_action(db, user.id, "LOGIN", "auth", request.client.host if request.client else None)
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "role": user.role,
        "username": user.username,
    }


@router.post("/refresh")
def refresh(req: RefreshRequest, db: Session = Depends(get_db)):
    payload = decode_token(req.refresh_token)
    if payload.get("type") != "refresh":
        raise HTTPException(status_code=400, detail="Invalid refresh token")
    username = payload.get("sub")
    user = db.query(User).filter(User.username == username, User.is_active.is_(True)).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    access_token = create_access_token({"sub": user.username, "role": user.role})
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me")
def me(current_user: User = Depends(get_current_user)):
    return {
        "id": str(current_user.id),
        "username": current_user.username,
        "email": current_user.email,
        "role": current_user.role,
        "created_at": current_user.created_at,
    }


class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str


@router.post("/change-password")
def change_password(req: ChangePasswordRequest, request: Request, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """Permite a cualquier usuario cambiar su propia contraseña verificando la actual."""
    if not verify_password(req.current_password, current_user.hashed_password):
        raise HTTPException(status_code=400, detail="Current password is incorrect")
    if len(req.new_password) < 8:
        raise HTTPException(status_code=400, detail="New password must be at least 8 characters")
    current_user.hashed_password = hash_password(req.new_password)
    db.commit()
    log_action(db, current_user.id, "CHANGE_PASSWORD", "user", request.client.host if request.client else None)
    return {"message": "Password updated successfully"}


@router.get("/users")
def list_users(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    """Listar usuarios activos. Admin ve todos; editor ve solo viewers."""
    if current_user.role == UserRole.admin:
        users = db.query(User).filter(User.is_active.is_(True)).all()
    elif current_user.role == UserRole.editor:
        users = db.query(User).filter(User.is_active.is_(True), User.role == UserRole.viewer).all()
    else:
        raise HTTPException(status_code=403, detail="Access denied")
    return [
        {"id": str(u.id), "username": u.username, "email": u.email, "role": u.role}
        for u in users
    ]

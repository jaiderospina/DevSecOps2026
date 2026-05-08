from sqlalchemy import Column, String, Boolean, DateTime, Text, ForeignKey, Enum
from sqlalchemy.orm import relationship
from app.core.database import Base
from datetime import datetime, timezone
import uuid
import enum


class UserRole(str, enum.Enum):
    admin = "admin"
    viewer = "viewer"
    editor = "editor"


class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    username = Column(String(50), unique=True, nullable=False, index=True)
    email = Column(String(100), unique=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(Enum(UserRole), default=UserRole.viewer, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    secrets = relationship("Secret", back_populates="owner", cascade="all, delete-orphan")
    audit_logs = relationship("AuditLog", back_populates="user")


class SecretCategory(str, enum.Enum):
    api_key = "api_key"
    password = "password"
    token = "token"
    certificate = "certificate"
    other = "other"


class SecretStatus(str, enum.Enum):
    active = "active"
    expired = "expired"
    rotated = "rotated"


class Secret(Base):
    __tablename__ = "secrets"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    encrypted_value = Column(Text, nullable=False)
    category = Column(Enum(SecretCategory), default=SecretCategory.other)
    status = Column(Enum(SecretStatus), default=SecretStatus.active)
    owner_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    last_rotated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    owner = relationship("User", back_populates="secrets")


class SecretAccess(Base):
    """Tabla de control de acceso: permite que admin/editor compartan secretos con otros usuarios."""
    __tablename__ = "secret_access"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    secret_id = Column(String(36), ForeignKey("secrets.id", ondelete="CASCADE"), nullable=False)
    granted_to_user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    granted_by_user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    secret = relationship("Secret", foreign_keys=[secret_id])
    granted_to = relationship("User", foreign_keys=[granted_to_user_id])
    granted_by = relationship("User", foreign_keys=[granted_by_user_id])


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=True)
    action = Column(String(50), nullable=False)
    resource = Column(String(100), nullable=False)
    resource_id = Column(String(100), nullable=True)
    details = Column(Text, nullable=True)
    ip_address = Column(String(45), nullable=True)
    timestamp = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="audit_logs")

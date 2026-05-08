from typing import List

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://securevault:securevault@postgres:5432/securevault"
    SECRET_KEY: str = "change-this-in-production-very-long-secret-key-here"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    FERNET_KEY: str = "TlgmqrgYgDKS7jKdLdZEJn-4RzLMKqy0LqJKJLWqoaA="
    RABBITMQ_URL: str = "amqp://guest:guest@rabbitmq:5672/"
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://frontend:3000"]
    DEBUG: bool = True
    SECRET_ROTATION_DAYS: int = 90
    ALLOW_SELF_REGISTER_ADMIN: bool = False
    ADMIN_USERNAME: str = "admin"
    ADMIN_EMAIL: str = "admin@securevault.local"
    ADMIN_PASSWORD: str = "Admin123!ChangeMe"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()

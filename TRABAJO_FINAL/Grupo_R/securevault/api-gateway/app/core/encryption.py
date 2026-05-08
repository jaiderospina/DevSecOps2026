from cryptography.fernet import Fernet
from app.core.config import settings


def get_fernet() -> Fernet:
    return Fernet(settings.FERNET_KEY.encode())


def encrypt_value(value: str) -> str:
    f = get_fernet()
    return f.encrypt(value.encode()).decode()


def decrypt_value(encrypted: str) -> str:
    f = get_fernet()
    return f.decrypt(encrypted.encode()).decode()

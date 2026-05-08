from contextlib import asynccontextmanager
import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.database import init_db
from app.routers import auth, secrets, audit

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Initializing database and seed data...")
    init_db()
    yield


app = FastAPI(
    title="SecureVault API",
    description="Secure credential management platform",
    version="1.0.0",
    docs_url="/docs" if settings.DEBUG else None,
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(secrets.router, prefix="/api/v1/secrets", tags=["Secrets"])
app.include_router(audit.router, prefix="/api/v1/audit", tags=["Audit Log"])


@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "api-gateway"}


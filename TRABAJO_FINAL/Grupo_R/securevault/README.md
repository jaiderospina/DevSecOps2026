# ⬡ SecureVault

![License](https://img.shields.io/badge/license-MIT-green)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![DevSecOps](https://img.shields.io/badge/devsecops-enabled-0ea5e9)

**SecureVault** es una plataforma de código abierto para la gestión segura de credenciales y secretos para equipos de desarrollo. Permite almacenar, consultar, rotar y auditar secretos cifrados (API keys, contraseñas, tokens) con control de acceso basado en roles y registro de auditoría.

Opera de forma local sin depender de APIs externas, lo que la hace adecuada para una demostración académica de **microservicios + contenerización + seguridad integrada + automatización DevSecOps**.

---

## 🏗️ Arquitectura

```
┌─────────────────┐
│  Frontend SPA   │  React + Vite + Tailwind  :3000
└────────┬────────┘
         │ HTTP
┌────────▼────────┐
│   API Gateway   │  FastAPI + JWT            :8000
└────────┬────────┘
         │ AMQP
┌────────▼────────┐
│    RabbitMQ     │  Message Broker           :5672
└────────┬────────┘
         │
┌────────▼────────┐   ┌──────────────────┐
│  Worker Audit   │   │    PostgreSQL     │
│  (async Python) │   │    datos         │
└─────────────────┘   └──────────────────┘
```

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18 + Vite + Tailwind CSS |
| API Gateway | FastAPI (Python 3.11) |
| Worker | Python + Pika (RabbitMQ) |
| Broker | RabbitMQ 3.13 |
| Base de datos | PostgreSQL 16 + SQLAlchemy |
| Cifrado | Cryptography (Fernet) |
| Auth | JWT + passlib (PBKDF2-SHA256) |
| Contenedores | Docker + Docker Compose |
| CI/CD | GitHub Actions |
| SAST | Bandit + Semgrep |
| Escaneo imágenes | Trivy |
| DAST | OWASP ZAP |
| Secretos en código | Gitleaks |
| IaC scan | Checkov |
| IaC | Terraform |
| Despliegue | Ansible |
| Métricas / Logs | Prometheus + Grafana + Loki |

## 🚀 Quick Start

### Prerrequisitos
- Docker >= 24
- Docker Compose >= 2.20

### 1. Descomprimir el proyecto y entrar al directorio
```bash
cd securevault
```

### 2. Levantar todos los servicios
```bash
docker compose up -d --build
```

### 3. Verificar que todo está corriendo
```bash
docker compose ps
curl http://localhost:8000/health
```

### 4. Abrir la aplicación
- **Frontend:** http://localhost:3000
- **API Docs:** http://localhost:8000/docs
- **RabbitMQ UI:** http://localhost:15672

### 5. Credenciales iniciales del administrador sembrado automáticamente
- **Usuario:** `admin`
- **Correo:** `admin@securevault.local`
- **Contraseña:** `Admin123!ChangeMe`

> Cambia estas credenciales en producción usando variables de entorno o un archivo `.env` basado en `.env.example`.

## 📁 Estructura del Repositorio

```
securevault/
├── LICENSE
├── README.md
├── docker-compose.yml
├── docker-compose.monitoring.yml
├── .github/
│   └── workflows/
├── .zap/
├── frontend/
├── api-gateway/
├── worker-audit/
├── infrastructure/
│   ├── terraform/
│   └── ansible/
├── orquestacion/
├── monitoring/
└── docs/
```

## ✅ Cambios importantes aplicados

- Se corrigió el backend para que inicialice la base de datos al arrancar y siembre un usuario administrador por defecto.
- Se hizo portable el modelo de datos para pruebas con SQLite y ejecución normal con PostgreSQL.
- Se bloqueó el auto-registro como administrador desde la API y el frontend.
- Se ajustaron tests backend para que pasen de forma consistente.
- Se corrigieron el `docker-compose.yml`, el Dockerfile del frontend y las referencias de imágenes en IaC.
- Se añadió configuración `pre-commit` para Gitleaks y un archivo base del threat model.

## 📚 Documentación

| Manual | Descripción |
|--------|-------------|
| [Arquitectura](docs/architecture/README.md) | Diagramas UML y decisiones de diseño |
| [Desarrollo](docs/development-manual.md) | Setup local, tests y contribución |
| [Despliegue](docs/deployment-manual.md) | Despliegue desde cero |
| [Seguridad](docs/security-manual.md) | Modelo de amenazas y herramientas |
| [Usuario](docs/user-manual.md) | Guía de uso de la aplicación |

## 🔒 Licencia

MIT — ver [LICENSE](LICENSE)

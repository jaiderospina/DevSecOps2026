# ⬡ SecureVault

> Plataforma de gestión segura de credenciales y secretos para equipos de desarrollo, con control de acceso por roles, cifrado en reposo y auditoría completa.

---

## ¿Qué es SecureVault?

**SecureVault** es una aplicación de código abierto que permite a los equipos de desarrollo almacenar, consultar, rotar y auditar secretos cifrados (API keys, contraseñas, tokens, certificados) en un entorno local y controlado, sin depender de servicios externos en la nube.

Cada secreto se cifra con **Fernet (AES + HMAC)** antes de persistirse. Todas las operaciones quedan registradas en un log de auditoría inmutable. El acceso está controlado por **JWT** con tres niveles de rol: Admin, Editor y Viewer.

El proyecto demuestra una arquitectura completa con enfoque académico en **seguridad integrada desde el desarrollo (DevSecOps)**: análisis estático, escaneo de imágenes, pruebas dinámicas y despliegue automatizado.

---

## Tecnologías

| Capa | Tecnología |
|---|---|
| Frontend | React 18 · Vite · Tailwind CSS · Nginx |
| Backend API | FastAPI · Python 3.11 · uvicorn |
| Autenticación | JWT (access 30 min · refresh 7 días) · passlib PBKDF2-SHA256 |
| Cifrado | Cryptography — Fernet (AES-128-CBC + HMAC-SHA256) |
| Base de datos | PostgreSQL 16 · SQLAlchemy ORM |
| Broker de mensajes | RabbitMQ 3.13 · AMQP · Pika |
| Worker asíncrono | Python · cron cada 30 s · expiración de secretos |
| Contenedores | Docker · Docker Compose |
| Monitoreo | Prometheus · Grafana · Loki |
| CI/CD | GitHub Actions |
| SAST | Bandit · Semgrep (OWASP Top 10 · JWT · secrets) |
| Escaneo de dependencias | Trivy SCA |
| Escaneo de imágenes | Trivy CVE (bloquea en CRITICAL) |
| DAST | OWASP ZAP Baseline |
| Detección de secretos | Gitleaks |
| Escaneo IaC | Checkov (Terraform · Docker Compose) |
| Infraestructura como código | Terraform |
| Despliegue automatizado | Ansible |

---

## Licencia

Este proyecto está licenciado bajo los términos de la **MIT License** — ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 🚀 Quick Start

Despliega SecureVault completo en menos de 5 minutos. Solo necesitas tener **Docker Desktop** instalado y corriendo.

### Prerrequisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) >= 24
- Docker Compose >= 2.20
- Conexión a internet (para descargar las imágenes la primera vez)
- Puertos que deben estar libre:
   3000, 8000, 15672

---

### Paso 1 — Abre PowerShell

Presiona `Win + X` → selecciona **Terminal** o **PowerShell**.

---

### Paso 2 — Crea una carpeta para el proyecto

```powershell
mkdir securevault
cd securevault
```

---

### Paso 3 — Descarga el archivo de orquestación

```powershell
curl -o docker-compose.yml https://raw.githubusercontent.com/Angels1104/securevault/main/docker-compose.yml
```

---

### Paso 4 — Levanta todos los servicios

```powershell
docker compose up -d
```

> La primera vez tarda unos minutos porque descarga las imágenes desde Docker Hub. Verás los contenedores iniciándose uno a uno.

Para verificar que todo está corriendo:

```powershell
docker compose ps
```

Deberías ver 5 contenedores en estado `healthy` o `running`:

```
NAME            STATUS
sv_frontend     running
sv_api          healthy
sv_worker       running
sv_rabbitmq     healthy
sv_postgres     healthy
```

---

### Paso 5 — Abre la aplicación en el navegador

| Servicio | URL |
|---|---|
| 🌐 Aplicación web | http://localhost:3000 |
| 📄 API interactiva (Swagger) | http://localhost:8000/docs |
| 🐇 RabbitMQ Management | http://localhost:15672 |

**Credenciales iniciales del administrador:**

```
Usuario:    admin
Contraseña: Admin123!ChangeMe
```

> ⚠️ Cambia esta contraseña inmediatamente desde **Perfil → Cambiar contraseña** antes de usar el sistema con datos reales.

---

### Paso 6 — Para detener la aplicación

```powershell
docker compose down
```
```
#Restaurar Datos 
docker compose up -d postgres
docker exec -i sv_postgres psql -U securevault securevault
```
Si también quieres eliminar los datos almacenados:

```powershell
docker compose down -v
```

---

## Estructura del proyecto

```
securevault/
├── api-gateway/          # Backend API — FastAPI + JWT + Fernet
│   ├── app/
│   │   ├── auth/         # JWT: generación y validación de tokens
│   │   ├── core/         # Config, base de datos, cifrado
│   │   ├── models/       # Modelos SQLAlchemy (users, secrets, audit_logs)
│   │   └── routers/      # Endpoints: /auth  /secrets  /audit
│   └── tests/
├── worker-audit/         # Worker asíncrono — Python + Pika
│   └── worker.py         # Consume eventos RabbitMQ · marca secretos expirados
├── frontend/             # UI — React 18 + Vite + Tailwind CSS
│   └── src/
│       ├── pages/        # Login · Register · Dashboard · Secrets · AuditLog
│       ├── components/   # Layout compartido
│       ├── context/      # AuthContext (JWT en memoria)
│       └── utils/        # Cliente HTTP (api.js)
├── monitoring/           # Prometheus · Loki
├── infrastructure/       # Terraform (IaC) · Ansible (deploy)
├── orquestacion/         # Manifiestos Kubernetes
├── docs/                 # Manuales técnicos
├── .github/workflows/    # ci.yml · deploy.yml
├── .zap/                 # Reglas OWASP ZAP
├── docker-compose.yml
└── docker-compose.monitoring.yml
```

---

## Pipeline CI/CD DevSecOps

El pipeline se ejecuta automáticamente en cada `push` a `main` / `develop` y en Pull Requests a `main`.

```
FASE 1 — CODE      Gitleaks · Bandit · Semgrep · Trivy SCA       (paralelo)
FASE 2 — BUILD     Docker Buildx · Trivy image scan               (matrix: 3 servicios)
FASE 3 — TEST      Pytest · Jest · OWASP ZAP Baseline
FASE 4 — RELEASE   Checkov · Docker Hub push · GitHub Release     (solo main)
FASE 5 — DEPLOY    Ansible playbook                               (workflow_run)
```

> El pipeline bloquea el merge si Trivy detecta vulnerabilidades **CRITICAL** en alguna imagen Docker.

---

## Documentación

| Manual | Contenido |
|---|---|
| [Arquitectura](https://github.com/jaiderospina/DevSecOps2026/blob/main/TRABAJO_FINAL/Grupo_R/Manuales/Arquitectura.md) | Diagramas de componentes, secuencia, datos y casos de uso |
| [Desarrollo](https://github.com/jaiderospina/DevSecOps2026/blob/main/TRABAJO_FINAL/Grupo_R/Manuales/development-manual.md) | Setup local, tests, variables de entorno |
| [Despliegue](https://github.com/jaiderospina/DevSecOps2026/blob/main/TRABAJO_FINAL/Grupo_R/Manuales/deployment-manual.md) | Despliegue desde cero con Docker y Ansible |
| [Seguridad](https://github.com/jaiderospina/DevSecOps2026/blob/main/TRABAJO_FINAL/Grupo_R/Manuales/security-manual.md) | Modelo de amenazas, controles implementados |
| [Usuario](https://github.com/jaiderospina/DevSecOps2026/blob/main/TRABAJO_FINAL/Grupo_R/Manuales/user-manual.md) | Guía de uso de la aplicación |





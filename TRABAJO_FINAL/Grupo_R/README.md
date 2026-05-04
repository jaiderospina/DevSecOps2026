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
| [Arquitectura](docs/architecture/README.md) | Diagramas de componentes, secuencia, datos y casos de uso |
| [Desarrollo](docs/development-manual.md) | Setup local, tests, variables de entorno |
| [Despliegue](docs/deployment-manual.md) | Despliegue desde cero con Docker y Ansible |
| [Seguridad](docs/security-manual.md) | Modelo de amenazas, controles implementados |
| [Usuario](docs/user-manual.md) | Guía de uso de la aplicación |




# Manual de Seguridad — SecureVault

## 1. Modelo de Amenazas (STRIDE)

El modelado de amenazas se realizó con **OWASP Threat Dragon** sobre los flujos críticos de la aplicación.

### 1.1 Categorías STRIDE Analizadas

| Categoría | Amenaza Identificada | Componente Afectado | Severidad | Contramedida Implementada | Estado |
|-----------|---------------------|-------------------|-----------|--------------------------|--------|
| **S**poofing | Suplantación de identidad de usuario mediante credenciales robadas | API Gateway / Auth | Alta | JWT con expiración corta (30min) + Refresh Token rotado (7d) + bcrypt con salt | ✅ Mitigado |
| **S**poofing | Uso de token JWT vencido o manipulado | API Gateway | Alta | Verificación de firma y expiración en cada request; clave secreta nunca expuesta | ✅ Mitigado |
| **T**ampering | Modificación del valor de un secreto en tránsito | Red interna | Media | HTTPS en producción; cifrado Fernet antes de escribir en DB | ✅ Mitigado |
| **T**ampering | Modificación directa de la base de datos | PostgreSQL | Alta | Credenciales DB solo accesibles vía variables de entorno; usuario DB sin acceso externo | ✅ Mitigado |
| **R**epudiation | Negar haber revelado o eliminado un secreto | Todos | Media | Audit log inmutable (INSERT only, sin UPDATE/DELETE en audit_logs) | ✅ Mitigado |
| **I**nformation Disclosure | Filtración de secretos en texto plano en logs | API Gateway | Crítica | Los valores cifrados nunca se loguean; Gitleaks en pre-commit detecta secretos en código | ✅ Mitigado |
| **I**nformation Disclosure | Secretos expuestos en variables de entorno del repositorio | CI/CD | Crítica | GitHub Secrets para todas las variables sensibles; `.env` en `.gitignore` | ✅ Mitigado |
| **I**nformation Disclosure | Usuario visualiza secretos de otro usuario | API Gateway | Alta | Validación de `owner_id` en cada operación; solo admin puede ver todos | ✅ Mitigado |
| **D**enial of Service | Flood de requests al endpoint de login | API Gateway | Media | Recomendado: rate limiting con `slowapi` (pendiente en v1.1) | ⚠️ Aceptado |
| **D**enial of Service | Creación masiva de secretos por un usuario | API Gateway | Baja | Paginación en listados; sin límite implementado en v1.0 | ⚠️ Aceptado |
| **E**levation of Privilege | Viewer intenta crear o rotar secretos | API Gateway | Alta | Validación explícita de rol en cada endpoint sensible; 403 Forbidden | ✅ Mitigado |
| **E**levation of Privilege | Escalada horizontal: editor accede a secretos de otro usuario | API Gateway | Alta | Filtro por `owner_id` en todas las queries; admin es el único con vista global | ✅ Mitigado |

### 1.2 Riesgos Residuales Aceptados

- **Rate limiting**: No implementado en v1.0. Riesgo aceptado dado que la aplicación es para equipos internos pequeños. Se planifica `slowapi` en v1.1.
- **MFA (Multi-Factor Authentication)**: No implementado. Fuera del alcance de v1.0.
- **Rotación automática de Fernet key**: Manual en v1.0. Re-cifrado de secretos ante rotación de clave es trabajo futuro.

---

## 2. Herramientas de Seguridad Integradas

### 2.1 Gitleaks — Detección de Secretos en Código

**¿Qué hace?** Escanea el historial completo de git en busca de secretos (API keys, contraseñas, tokens) expuestos en el código fuente.

**Configuración en el pipeline:**
```yaml
- uses: gitleaks/gitleaks-action@v2
  with:
    fetch-depth: 0   # Escanea TODO el historial
```

**Interpretar el reporte:**
- Si Gitleaks encuentra un secreto, el pipeline falla con código de salida 1.
- El reporte indica el archivo, línea y tipo de secreto encontrado.
- **Acción requerida**: rotar el secreto inmediatamente, removerlo del código y del historial git (`git filter-branch` o `git-filter-repo`).

---

### 2.2 Bandit — SAST Python

**¿Qué hace?** Analiza el código Python en busca de patrones de seguridad problemáticos (inyección SQL, uso inseguro de `eval`, algoritmos criptográficos débiles, etc.).

**Ejecutar localmente:**
```bash
pip install bandit
bandit -r api-gateway/app/ -ll -f json -o bandit-report.json
```

**Interpretar niveles de severidad:**
| Nivel | Acción |
|-------|--------|
| LOW | Revisar; probablemente aceptable |
| MEDIUM | Evaluar y documentar si se acepta |
| HIGH | Corregir antes de merge a main |

**Falsos positivos comunes en este proyecto:**
- `B105` (hardcoded password): Los valores en `config.py` son defaults de desarrollo, no credenciales reales. Se justifican con comentario `# nosec B105`.

---

### 2.3 Trivy — Escaneo de Imágenes Docker y Dependencias

**¿Qué hace?** Detecta CVEs (vulnerabilidades conocidas) en:
- Dependencias de Python (`requirements.txt`)
- Paquetes npm (`package.json`)
- Imágenes Docker (OS base + paquetes instalados)

**El pipeline falla automáticamente si hay CVEs CRÍTICOS** sin excepción documentada.

**Ejecutar localmente:**
```bash
# Escanear imagen
trivy image securevault/api-gateway:latest

# Escanear dependencias
trivy fs api-gateway/requirements.txt --severity HIGH,CRITICAL
```

**Interpretar el reporte:**
```
┌────────────┬───────────────┬──────────┬──────────────────┐
│  Library   │ Vulnerability │ Severity │    Fix Version   │
├────────────┼───────────────┼──────────┼──────────────────┤
│ cryptography│ CVE-XXXX-YYYY│ CRITICAL │     42.0.8       │
└────────────┴───────────────┴──────────┴──────────────────┘
```

**Proceso de gestión**: actualizar la dependencia a la versión corregida, re-ejecutar el pipeline.

---

### 2.4 OWASP ZAP — DAST

**¿Qué hace?** Realiza un escaneo dinámico de la aplicación en ejecución, simulando ataques reales (XSS, SQL injection, CSRF, headers inseguros, etc.).

**Modo usado:** Baseline Scan (pasivo + activo básico) contra `http://localhost:8000`.

**Interpretar alertas:**
| Riesgo | Acción |
|--------|--------|
| High | Corregir antes de release |
| Medium | Evaluar e incluir en backlog priorizado |
| Low / Informational | Documentar; corregir si es bajo costo |

**Alertas esperadas en este proyecto (informacionales):**
- Missing `Content-Security-Policy` header → agregar en nginx en producción.
- `X-Frame-Options` → ya configurado en nginx.conf.

---

### 2.5 Checkov — Escaneo de IaC

**¿Qué hace?** Analiza archivos Terraform y Docker Compose en busca de malas configuraciones de seguridad (contenedores con privilegios, secrets en texto plano, redes inseguras, etc.).

**Ejecutar localmente:**
```bash
pip install checkov
checkov -d infrastructure/terraform --framework terraform
checkov -f docker-compose.yml --framework dockerfile
```

---

## 3. Política de Divulgación Responsable

Si encuentras una vulnerabilidad de seguridad en SecureVault:

1. **No la publiques públicamente** hasta que sea corregida.
2. Envía un reporte detallado a: `security@securevault.local` (o abre un GitHub Issue privado).
3. Incluye: descripción, pasos para reproducir, impacto estimado y posible solución.
4. El equipo responderá en máximo **72 horas** con un plan de acción.
5. Una vez corregida, se publicará un `SECURITY.md` con el CVE asignado y crédito al reportante.

---

## 4. Gestión de Vulnerabilidades — Tabla de Hallazgos

| Herramienta | Hallazgo | Severidad | Estado | Justificación |
|-------------|---------|-----------|--------|---------------|
| Bandit | B104: Binding to all interfaces (0.0.0.0) | Low | Aceptado | Necesario para Docker; no expuesto directamente a internet |
| Trivy (imagen) | python:3.11-slim CVEs de SO | Medium | Monitorizado | Imagen base actualizada en cada build; sin CVEs críticos |
| ZAP | Missing CSP header | Medium | Aceptado v1.0 | Se añadirá en nginx de producción en v1.1 |
| Checkov | CKV_DOCKER_2: sin HEALTHCHECK en algunos Dockerfiles | Low | Corregido | HEALTHCHECK añadido via docker-compose |
| Gitleaks | Ninguno detectado | — | ✅ Limpio | — |

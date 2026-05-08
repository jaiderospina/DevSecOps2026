## 1. Propósito y Justificación

El objetivo de este trabajo no es únicamente construir una aplicación funcional. El verdadero desafío consiste en diseñar, implementar, asegurar y automatizar el ciclo de vida completo de esa aplicación, integrando la seguridad como práctica continua en cada etapa del desarrollo y la operación. Esta es la esencia del enfoque DevSecOps: no añadir seguridad al final del proceso, sino incorporarla desde el primer `commit` hasta la producción en tiempo real.

El equipo propondrá libremente la aplicación que construirá, siempre que cumpla los criterios de complejidad técnica descritos en este documento. **La aplicación es el vehículo; el pipeline DevSecOps es el producto evaluado.**

## 3. Requisitos Técnicos Obligatorios

### 3.1 Arquitectura de la Aplicación

La aplicación debe implementarse con **arquitectura de microservicios** y contener como mínimo los siguientes componentes:

| Componente | Descripción mínima |
|---|---|
| **Frontend** | SPA (Single Page Application) en React o Vue.js |
| **Backend / API Gateway** | Python (FastAPI o Flask) o Node.js (Express o Fastify) |
| **Al menos un worker** | Proceso asíncrono independiente con función específica (análisis, scraping, notificaciones, etc.) |
| **Base de datos** | PostgreSQL, MongoDB o equivalente de código abierto |
| **Broker de mensajes** | RabbitMQ o Redis para comunicación asíncrona entre servicios |
| **Autenticación** | Implementación de JWT u OAuth2 con control básico de roles |

### 3.2 Contenerización Completa

Todos los componentes deben estar contenerizados siguiendo buenas prácticas:

- `Dockerfile` individual por servicio (imagen base mínima, usuario no root, capas optimizadas)
- `docker-compose.yml` para entorno de desarrollo local
- Las imágenes deben publicarse en **Docker Hub** bajo una cuenta del equipo, correctamente etiquetadas con versión semántica (ej. `v1.0.0`, `latest`)

### 3.3 Repositorio GitHub

El código fuente completo debe residir en un repositorio **público** en GitHub que incluya:

```
repositorio/
├── LICENSE
├── README.md
├── docker-compose.yml
├── .github/
│   └── workflows/          # Pipelines CI/CD
├── infraestructura/        # IaC: Terraform o Ansible
├── orquestacion/           # K3s / Kubernetes / Swarm
├── servicios/              # Código fuente por microservicio
└── docs/                   # Documentación completa
```

### 3.4 Pipeline CI/CD con Seguridad Integrada (DevSecOps)

Este es el **núcleo evaluativo** del trabajo. El pipeline debe automatizar las fases descritas a continuación e integrar herramientas de seguridad FOSS en cada una de ellas.

#### Fase 1 — Plan

- Modelado de amenazas documentado con **OWASP Threat Dragon**
- Diagramas de Flujo de Datos (DFD) nivel 0 y nivel 1
- Identificación de amenazas mediante el modelo **STRIDE**

#### Fase 2 — Code

- Hooks pre-commit con **Gitleaks** o **TruffleHog** para detectar secretos expuestos
- Análisis estático (SAST) con **Semgrep** y **Bandit** (Python) o ESLint con reglas de seguridad (Node.js)
- Análisis de dependencias (SCA) con **OWASP Dependency-Check** o **Trivy** sobre archivos de dependencias (`requirements.txt`, `package.json`)

#### Fase 3 — Build

- Construcción automática de imágenes Docker en el pipeline
- Escaneo de vulnerabilidades en imágenes con **Trivy** o **Grype**
- El pipeline debe **fallar automáticamente** si se detectan CVEs de severidad crítica sin excepción documentada y justificada

#### Fase 4 — Test

- Pruebas unitarias con **Pytest** (Python) o **Jest** (Node.js / React)
- Pruebas de seguridad dinámicas (DAST) con **OWASP ZAP** en modo automatizado contra el entorno de staging

#### Fase 5 — Release / Deploy

- Despliegue automatizado usando IaC con **Terraform** o **Ansible**
- Escaneo de configuración de infraestructura con **Checkov** o **tfsec**
- Orquestación con **K3s**, **Docker Swarm** o **Docker Compose** en entorno de producción simulado

#### Fase 6 — Operate / Monitor *(opcional — bonificación)*

- Stack de observabilidad con **Prometheus** y **Grafana** para métricas
- Centralización de logs con **Loki + Promtail** o stack **ELK**
- Detección de comportamiento anómalo en tiempo de ejecución con **Falco**

### 3.5 Restricciones de Herramientas

Toda la cadena de herramientas debe ser de código abierto o de libre uso. GitHub Actions es aceptado como servidor de CI/CD o GitLab CI/CD.
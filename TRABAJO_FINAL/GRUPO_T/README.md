# Descripción del proyecto y propósito

## 1. Descripción del Proyecto
El proyecto consiste en el diseño e implementación de una infraestructura de red híbrida y segura, centrada en la protección de accesos administrativos y la centralización de eventos de seguridad (logs).

La arquitectura integra un cortafuegos perimetral (FortiGate) con un sistema de autenticación multifactor (MFA) basado en Cisco Duo, desplegado mediante contenedores Docker. Paralelamente, se establece un Stack de Monitoreo (Grafana, Loki, Promtail) para la visualización y análisis en tiempo real de los flujos de tráfico y posibles amenazas detectadas por el firewall.

## 2. Propósito del Proyecto
El objetivo primordial de esta implementación es establecer un sistema de observabilidad granular sobre la actividad de red en la LAN, centrándose específicamente en el monitoreo, registro y visualización de todas las consultas de dominios (DNS) realizadas por los usuarios.

<p align="center">
<img src="img/diagrama_de_flujo.png" width="900"/>
</p>
<p align="center">
<b>Figura 2.</b> diagrama_de_flujo.png. <code></code>.
</p>

#  Funcionalidades Principales

## Gestión y Control de Tráfico Perimetral

Esta funcionalidad reside en el FortiGate y es la fuente primaria de datos para todo el proyecto.
 - Inspección de Tráfico LAN-to-WAN: Análisis en tiempo real de los paquetes que salen de la red local hacia internet.
 - Filtrado de Dominios (DNS Filter): Capacidad de interceptar y registrar cada solicitud DNS, permitiendo o bloqueando el acceso según categorías de seguridad o listas negras.
 - Generación de Logs: Traducción de la actividad de red en registros de eventos compatibles con el estándar Syslog para su posterior análisis.
 
## Centralización y Procesamiento de Logs (Syslog + Loki + Promtail)
Es el motor que transforma los datos crudos en información útil.

- Ingesta de Datos Multifuente: Recolección centralizada mediante rsyslog de los eventos provenientes del firewall.
- Indexación y Etiquetado Eficiente: Uso de Promtail para leer, etiquetar (por IP de origen, tipo de evento o severidad) y enviar los logs hacia Loki.
- Persistencia de Datos: Almacenamiento de los registros de navegación para permitir consultas históricas y análisis forense ante posibles incidentes.

## Visualización y Análisis de Dominios en Tiempo Real (Grafana)
Es la interfaz donde se cumple el propósito principal de monitoreo.
- Dashboards de Tráfico DNS: Representación visual de las consultas de dominio realizadas en la LAN, permitiendo ver qué sitios son los más visitados.
- Monitoreo de Anomalías: Gráficos de series temporales que muestran picos inusuales de tráfico, lo que podría indicar la presencia de malware o exfiltración de datos.


## Arquitectura de Microservicios

                         ┌──────────────────────────────┐
                         │       USUARIOS / ADMIN       │
                         │   Navegador / Duo Mobile     │
                         └──────────────┬───────────────┘
                                        │ HTTPS (443)
                                        ▼
                         ┌──────────────────────────────┐
                         │        FORTIGATE FW          │
                         │   / Firewall / RADIUS        │
                         │      192.168.249.120         │
                         └──────────────┬───────────────┘
                                        │ RADIUS (UDP 1812)
                                        ▼
                ┌────────────────────────────────────────────┐
                │         DUO AUTH PROXY (Docker)            │
                │         RADIUS Listener (1812)             │
                │         Validación MFA (Duo Cloud)         │
                └──────────────┬─────────────────────────────┘
                               │ HTTPS (443 API)
                               ▼
                      ┌──────────────────────┐
                      │     DUO CLOUD        │
                      │ api-xxxx.duo.com     │
                      └──────────────────────┘

==================== STACK DE LOGS Y MONITOREO ====================

        ┌────────────────────┐
        │     FORTIGATE      │
        │     DOCKER LOGS    │
        └─────────┬──────────┘
                  │ Syslog (UDP 514)
                  ▼
        ┌────────────────────┐
        │      RSYSLOG       │
        │   Centralizador    │
        └─────────┬──────────┘
                  │
                  ▼
        ┌────────────────────┐
        │      PROMTAIL      │
        │ Recolección Logs   │
        └─────────┬──────────┘
                  │
                  ▼
        ┌────────────────────┐
        │        LOKI        │
        │ Almacenamiento     │
        └─────────┬──────────┘
                  │
                  ▼
        ┌────────────────────┐
        │      GRAFANA       │
        │ Dashboards / Query │
        │     :3000          │
        └────────────────────┘

## Stack Tecnológico
----------------------------------------------------------------------------------------------
| Capa                | Tecnología                                   | Licencia               |
|---------------------|---------------------------------------------|-------------------------|
| Firewall / Perímetro| FortiGate                                   | Propietaria             |
| MFA                 | Duo Security (Duo Cloud + Auth Proxy)       | Propietaria             |
| Sistema Operativo   | Ubuntu Server (Linux)                       | GPL                     |
| Contenerización     | Docker + Docker Compose                     | Apache 2.0              |
| Proxy MFA           | Duo Authentication Proxy (RADIUS)           | Propietaria             |
| Logging (ingesta)   | rsyslog                                     | GPL                     |
| Recolección Logs    | Promtail                                    | Apache 2.0              |
| Almacenamiento Logs | Loki                                        | AGPL 3.0                |
| Visualización       | Grafana                                     | AGPL 3.0                |
| Logs de red         | Syslog (UDP 514)                            | Estándar (RFC)          |
| Monitoreo           | Grafana Dashboards                          | AGPL 3.0                |
| CI/CD               | GitHub Actions                              | Gratis (FOSS projects)  |
-----------------------------------------------------------------------------------------------


## Flujo del Pipeline CI/CD

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    PLAN      │────▶│     CODE     │────▶│    BUILD    │────▶│     TEST     │
│--------------│     │--------------│     │--------------│     │--------------│
│ Definir flujo│     │ Configuración│     │ Docker Build │     │ Validación   │
│ de logs      │     │ rsyslog      │     │ Contenedores │     │ de logs      │
│ Arquitectura │     │ promtail     │     │ (loki,graf)  │     │ parsing OK   │
│ Loki/Grafana │     │ loki         │     │              │     │ promtail OK  │
│              │     │ grafana      │     │              │     │              │
└──────┬───────┘     └──────┬───────┘     └──────┬───────┘     └──────┬───────┘
       │                    │                    │                    │
       │                    │                    ▼                    ▼
       │                    │           ┌────────────────┐   ┌────────────────┐
       │                    │           │ ¿Build OK?     │   │ ¿Logs OK?      │
       │                    │           └──────┬─────────┘   └──────┬─────────┘
       │                    │                  │ No                 │ No
       │                    │                  ▼                    ▼
       │                    │           ❌ FALLA BUILD        ❌ FALLA TEST
       │                    │           (error imagen)       (logs fallan)
       │                    │                  │ Sí                 │ Sí
       └────────────────────┴──────────────────┴──────────────┬─────┘
                                                              ▼

               ┌──────────────────────────────────────────────┐
               │                 RELEASE                      │
               │----------------------------------------------│
               │ Versionado (tags Docker)                     │
               │ Publicación imágenes                         │
               │ Validación configs finales                   │
               └──────────────────────┬───────────────────────┘
                                      ▼

               ┌──────────────────────────────────────────────┐
               │                  DEPLOY                      │
               │----------------------------------------------│
               │ Docker Compose                               │
               │ Servicios:                                   │
               │  - rsyslog                                   │
               │  - promtail                                  │
               │  - loki                                      │
               │  - grafana                                   │
               │ Configuración de puertos                     │
               └──────────────────────┬───────────────────────┘
                                      ▼

               ┌──────────────────────────────────────────────┐
               │               MONITOREO                      │
               │----------------------------------------------│
               │ Ingesta de logs en tiempo real               │
               │ Validación en Loki                           │
               │ Dashboards en Grafana                        │
               │ Alertas (errores / tráfico)                  │
               └──────────────────────────────────────────────┘
```
---
## Tecnologías empleadas

El proyecto de monitoreo y centralización de logs está basado en un stack orientado a observabilidad, contenedorización y seguridad.

🔹 Recolección de logs
rsyslog
Actúa como servidor Syslog central. Recibe logs desde dispositivos como el firewall FortiGate mediante protocolo UDP 514.
Promtail
Agente de recolección de logs de Grafana Loki. Se encarga de leer logs desde archivos del sistema (como /var/log/syslog o logs de contenedores Docker) y enviarlos a Loki.
🔹 Almacenamiento y procesamiento
Grafana Loki
Sistema de almacenamiento de logs optimizado para indexar metadata en lugar del contenido completo. Permite consultas eficientes y escalables. Expone servicio en TCP 3100.
🔹 Visualización y monitoreo
Grafana
Plataforma de visualización que permite crear dashboards en tiempo real para analizar logs. Se conecta a Loki como datasource. Disponible en TCP 3000.
🔹 Contenerización
Docker
Todos los componentes (Promtail, Loki, Grafana, rsyslog) se ejecutan como contenedores, facilitando despliegue, aislamiento y portabilidad.
🔹 Seguridad / Autenticación (integración adicional)
Duo Authentication Proxy (RADIUS)
Implementado en contenedor Docker. Permite autenticación multifactor (MFA) integrándose con:
FortiGate (Firewall) mediante RADIUS (UDP 1812)
Duo Security Cloud mediante API HTTPS (TCP 443)
🔹 Infraestructura de red
FortiGate Firewall
Controla acceso administrativo (HTTPS 443)
Envía solicitudes de autenticación al proxy Duo (RADIUS)
Genera logs que son enviados al sistema de monitoreo
🔹 Servicios externos
Duo Security Cloud
Servicio en la nube que valida la autenticación MFA mediante API segura (HTTPS 443).

## Insignias (badges) del pipeline: build status, cobertura de pruebas, versión


## Instrucciones de inicio rápido (quick start)

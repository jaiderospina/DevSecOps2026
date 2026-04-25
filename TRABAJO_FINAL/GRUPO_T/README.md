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

graph TD
    subgraph LAN_Network [Red Local LAN]
        Users[Usuarios/Clientes]
    end

    subgraph External_Cloud [Servicios en la Nube]
        DuoCloud((Cisco Duo Cloud))
    end

    subgraph Docker_Host [Servidor Docker - 192.168.249.121]
        
        subgraph Auth_Microservice [Microservicio de Seguridad]
            DuoProxy[Duo Auth Proxy Container]
        end

        subgraph Logging_Pipeline [Pipeline de Observabilidad]
            Rsyslog[Rsyslog Container]
            Promtail[Promtail Container]
            Loki[Grafana Loki Container]
        end

        subgraph Visualization_Service [Microservicio de Inteligencia]
            Grafana[Grafana Dashboard]
        end
    end

    %% Flujo de Autenticación
    FortiGate[FortiGate Firewall] -- 1. RADIUS UDP 1812 --> DuoProxy
    DuoProxy -- 2. HTTPS/API 443 --> DuoCloud
    DuoCloud -. 3. Push MFA .-> Admin((Administrador))

    %% Flujo de Logs de Dominios
    FortiGate -- 4. Syslog UDP 514 --> Rsyslog
    Rsyslog -- 5. Lectura de Archivos --> Promtail
    Promtail -- 6. Push Logs HTTP 3100 --> Loki
    Loki -- 7. Query LogQL --> Grafana

    %% Estilos
    style FortiGate fill:#f96,stroke:#333,stroke-width:2px
    style DuoProxy fill:#9f9,stroke:#333
    style Grafana fill:#f9f,stroke:#333
    style Loki fill:#69f,stroke:#333
	



## Tecnologías empleadas


## Licencia seleccionada


## Insignias (badges) del pipeline: build status, cobertura de pruebas, versión


## Instrucciones de inicio rápido (quick start)

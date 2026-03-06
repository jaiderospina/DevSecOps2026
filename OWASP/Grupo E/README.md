# 🔐 Taller: Análisis de Vulnerabilidades en el OWASP Top 10 

<h3 align="center">Métodos de Explotación y Prevención</h3>

![Principal](images/encabezado.jpg)

---

## 👥 Integrantes

- Ing. Argel Ochoa Ronald David  
- <a href="https://www.linkedin.com/in/mauricio-baquero-soto-449624133" target="_blank">Ing. Baquero Soto Mauricio</a>
- Ing. Buitrago Guiot Oscar Javier  
- Ing. Estefanía Naranjo Novoa  

---

## 📌 Introducción

La seguridad en aplicaciones web se ha convertido en un componente crítico para las organizaciones debido al incremento constante de ataques dirigidos a sistemas expuestos en Internet.

El proyecto **OWASP Top 10** constituye una referencia mundial que identifica las vulnerabilidades más críticas en aplicaciones web, proporcionando una guía para desarrolladores, arquitectos de software y equipos de seguridad.

Este trabajo tiene como propósito analizar cada vulnerabilidad incluida en el OWASP Top 10, identificar los métodos de explotación utilizados por los atacantes y proponer estrategias de prevención alineadas con buenas prácticas de seguridad y enfoques DevSecOps.

---

## 🎯 Objetivo General

Analizar las vulnerabilidades incluidas en el OWASP Top 10, identificando sus mecanismos de explotación, impactos en aplicaciones web y estrategias de prevención, con el fin de fortalecer el conocimiento en seguridad de software y promover el desarrollo de aplicaciones seguras.

---

## 🎯 Objetivos Específicos

- Identificar y describir las vulnerabilidades presentes en el OWASP Top 10.
- Analizar causas, características y riesgos asociados.
- Investigar métodos y técnicas de explotación utilizadas por atacantes.
- Proponer medidas de prevención y mitigación basadas en principios DevSecOps.

---

## 🌍 ¿Qué es OWASP?

OWASP (Open Web Application Security Project) es una organización sin fines de lucro cuyo objetivo principal es mejorar la seguridad del software mediante proyectos de código abierto, documentación técnica, estándares y educación en seguridad informática.

OWASP ofrece una amplia gama de recursos, herramientas y pautas para ayudar a las organizaciones a proteger sus aplicaciones web de amenazas y vulnerabilidades.

Más información:  
https://owasp.org/www-project-top-ten
https://www.arsys.es/blog/owasp

[Ver historia de OWASP](historia_owasp.md)

---

# 🛡 OWASP Top 10 (Edición 2021)

A continuación, se describen las principales vulnerabilidades identificadas en la edición 2021:

La edición 2021 introduce cambios importantes respecto a versiones anteriores, incorporando nuevas categorías como **Insecure Design y Software and Data Integrity Failures**, además de reorganizar vulnerabilidades existentes para reflejar mejor el panorama actual de amenazas. Lo cual nos muestra la evolución constante de los riesgos en aplicaciones web y la necesidad en la s compañias de adoptar enfoques de seguridad más integrales dentro del ciclo de vida del desarrollo de software.

---

![Diagrama OWASP](images/owasp-10.png)

*Fuente: OWASP Foundation (2021)*

## 1️⃣ Control de Acceso Roto (Broken Access Control)

**Descripción:**  
Ocurre cuando los usuarios pueden actuar fuera de los permisos asignados.

**Métodos de explotación:**
- Manipulación de URLs
- Fuerza bruta sobre identificadores
- Modificación de tokens o cookies

**Prevención:**
- Validación de permisos en el servidor
- Principio de mínimo privilegio
- Control de roles adecuado

---

## 2️⃣ Fallos Criptográficos (Cryptographic Failures)

**Descripción:**  
Protección inadecuada de datos sensibles.

**Métodos de explotación:**
- Interceptación de tráfico sin HTTPS
- Contraseñas almacenadas en texto plano
- Uso de hashes débiles

**Prevención:**
- Uso obligatorio de HTTPS/TLS
- Hashing seguro (bcrypt, Argon2)
- Gestión adecuada de claves

---

## 3️⃣ Inyección (Injection)

**Descripción:**  
Entrada maliciosa interpretada como comandos o consultas.

**Ejemplos:**
- SQL Injection  
- Command Injection  
- LDAP Injection  

**Prevención:**
- Consultas parametrizadas
- Validación estricta de entradas
- Uso de ORM seguros

---

## 4️⃣ Diseño Inseguro (Insecure Design)

**Descripción:**  
Falta de controles de seguridad desde la arquitectura inicial.

**Prevención:**
- Modelado de amenazas
- Arquitectura segura por diseño
- Pruebas de seguridad tempranas

---

## 5️⃣ Configuración de Seguridad Incorrecta (Security Misconfiguration)
**Descripción:**  
Errores en configuración de servidores o frameworks.

**Prevención:**
- Hardening del servidor
- Eliminación de configuraciones por defecto
- Automatización de despliegues seguros

---

## 6️⃣ Componentes Vulnerables y Desactualizados

**Descripción:**  
Uso de librerías con vulnerabilidades conocidas.

**Prevención:**
- Inventario de dependencias
- Actualizaciones periódicas
- Uso de herramientas SCA

---

## 7️⃣ Fallos de Identificación y Autenticación

**Descripción:**  
Problemas en gestión de credenciales y sesiones.

**Prevención:**
- Autenticación multifactor
- Políticas de contraseñas robustas
- Expiración segura de sesiones

---

## 8️⃣ Fallos en Integridad de Software y Datos

**Descripción:**  
Manipulación de dependencias o pipelines.

**Prevención:**
- Firmas digitales
- Verificación de integridad
- Seguridad en la cadena de suministro

---

## 9️⃣ Registro y Monitoreo Insuficiente

**Descripción:**  
Falta de logs adecuados para detectar incidentes.

**Prevención:**
- Registro centralizado
- Alertas automáticas
- Integración con SIEM

## 🔟 Falsificación de Solicitudes del Lado del Servidor (SSRF)

**Descripción:**  
El servidor realiza peticiones a destinos no autorizados.

**Prevención:**
- Listas blancas de URLs
- Segmentación de red
- Validación de destinos externos

---

## 🧩 Enfoque DevSecOps

La integración de seguridad dentro del ciclo de vida del desarrollo permite:

- Reducir la superficie de ataque
- Detectar vulnerabilidades tempranamente
- Automatizar pruebas de seguridad
- Mejorar la resiliencia de aplicaciones

---

## ✅ Conclusiones

■ El OWASP Top 10 constituye una guía esencial para comprender los riesgos más relevantes en aplicaciones web. La mayoría de estas vulnerabilidades no dependen únicamente de fallas técnicas, sino de malas prácticas en diseño, configuración y gestión del software.

■ La integración de controles de seguridad en el ciclo DevSecOps permite reducir significativamente la superficie de ataque y mejorar la resiliencia de las aplicaciones.

■ El análisis de las vulnerabilidades del OWASP Top 10 demuestra la necesidad de integrar la seguridad como un componente estratégico dentro de la gobernanza de tecnologías de la información. Las organizaciones deben adoptar marcos de gestión de riesgos y políticas de seguridad que permitan identificar, evaluar y mitigar amenazas de forma continua, asegurando que los controles de seguridad estén alineados con los objetivos del negocio y las regulaciones vigentes.

■ La evolución constante de las amenazas en aplicaciones web requiere que las organizaciones implementen procesos de mejora continua en sus prácticas de seguridad. La adopción de estándares, auditorías periódicas y herramientas de monitoreo permite fortalecer la postura de seguridad, reducir vulnerabilidades y garantizar la confianza de los usuarios en los sistemas y servicios digitales.

■ Una de las principales categorias mas criticas del OWASP se presenta al momento de realizar la implementación de principios como el mínimo privilegio, la autenticación multifactor y la correcta validación de permisos con el fin de reducir significativamente el riesgo de accesos no autorizados y la exposición de información sensible.

■ La protección de los datos y la correcta configuración de los sistemas son elementos clave para evitar posibles fallos.
Esto se peude evitar implementando buenas prácticas de cifrado, gestión segura de claves, actualizaciones constantes y configuraciones de buenas practicas para garantizar que la infraestructura y las aplicaciones mantengan niveles adecuados de protección frente a posibles ataques.


![Diagrama OWASP](images/process.png)

*Fuente: OWASP Foundation (2021)*


# 📚 Referencias

- https://owasp.org/Top10/es/
- https://owasp.org/www-project-top-ten/
- https://www.checkpoint.com/es/cyber-hub/cloud-security/what-is-application-security-appsec/owasp-top-10-vulnerabilities/
- https://certera.com/blog/mitigating-the-owasp-top-10-vulnerabilities/
- https://www.akamai.com/es/blog/security/owasp-top-10-api-security-risks-2023-edition
- https://cloudkul.com/blog/owasp-top-10-2021/


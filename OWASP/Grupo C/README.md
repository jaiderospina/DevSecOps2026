# Integrantes

Leidy Dayana Avendaño Moreno

Jeisson Andres Hernandez Martinez

Michael Giovanny Sierra Leon
<p align="center">
  <img src="Images/Intro OSWASP Top 10.png" width="600">
</p>

# A01:2025 Broken Access Control.

<p align="center">
  <img src="Images/Broken Access Control.png" width="600">
</p>

Fallas que permiten a usuarios acceder a datos o funciones fuera de sus permisos. Permitiendo a los atacantes o usuarios saltarse la autorización y realizar tareas con privilegiados como los de un administrador. 

### Métodos de explotación: 
     - IDOR (Insecure Direct Object Reference): Cambiar un ID en la URL o parámetro 
       (ej. ?user_id=100 a ?user_id=101) para ver los datos de otro usuario. 
       
     - Manipulación de URL/Endpoint: Acceder directamente a páginas administrativas 
       (ej. /admin.php) sin autenticarse como administrador. 
     
     - Escalada de Privilegios Vertical: Un usuario con bajo nivel de acceso logra realizar acciones de administrador. 
     
     - Escalada de Privilegios Horizontal: Un usuario accede a datos de otro usuario con el mismo nivel de permisos.
     
     - Manipulación de Parámetros/CORS: Modificar solicitudes para eludir controles de seguridad basados 
       en el cliente o mal configurados. 
       
     - Falta de Validación en el Servidor: Modificar datos enviados al servidor (API) esperando que este 
       no verifique si el usuario tiene permiso para modificar dicho recurso. 

## Prevención y mitigación: 
     - Los controles de acceso pueden asegurar que una aplicación web utilice tokens de autorización y establezca controles estrictos 
       sobre los mismos. Esta es una forma de garantizar que el usuario es quien dice ser, sin tener que introducir constantemente 
       sus credenciales de acceso.
       
     - Implementar el concepto de acceso menos privilegiado, auditando regularmente servidores y sitios web, aplicando MFA y eliminando 
       usuarios inactivos y servicios innecesarios de los servidores. 

---

# A02:2025 Security Misconfiguration. 

<p align="center">
  <img src="Images/Security Misconfiguration.png" width="600">
</p>

Ajustes por defecto inseguros, servicios innecesarios abiertos o falta de endurecimiento (hardening), las configuraciones usadas como predeterminadas en algunos sitios sitio web o del sistema de administración de contenido (CMS), pueden revelar inadvertidamente vulnerabilidades de aplicaciones. 

### Métodos de explotación: 
     - Escaneo de directorios y archivos: Uso de herramientas como Gobuster o Dirb para encontrar archivos sensibles expuestos 
       (archivos de configuración, copias de seguridad) que no deberían ser públicos. 

     - Credenciales predeterminadas: Intento de acceso a paneles de administración utilizando nombres de usuario y contraseñas 
       estándar (ej. admin/admin) que no fueron cambiados tras la instalación. 

     - Enumeración de servicios (Banner Grabbing): Identificar versiones de software obsoletas o servicios innecesarios 
       habilitados (ej. SSH, FTP, SMB) mediante escaneo de puertos. 

     - Explotación de permisos en la nube: Acceder a buckets de almacenamiento (como AWS S3) mal configurados que permiten 
       la lectura o escritura pública de datos. 

     - Análisis de mensajes de error: Provocar errores para obtener información detallada del servidor (Stack Traces), lo que 
       revela rutas de archivos, versiones de framework o estructura de base de datos. 

     - Explotación de configuraciones HTTP: Aprovechar la falta de cabeceras de seguridad (como HSTS, CSP) o versiones de TLS obsoletas. 

### Prevención y mitigación: 

     - Cambiar la configuración predeterminada del webmaster o CMS, elimina las características de código no utilizadas y controlar
       los comentarios del usuario y la visibilidad de la   información de este. Los desarrolladores también deben eliminar la 
       documentación, las características, los marcos y las muestras innecesarias, segmentar la arquitectura de la aplicación 
       y automatizar la efectividad de las configuraciones y los ajustes del entorno web. 

---

3

4

5

6

7



# A08:2025 - Software or Data Integrity Failures 

   # Naturaleza
   
      * Actualizaciones de software 
      * Datos críticos y de CI/CD (Continuos Integration and Continuos Delivery) sin verificación.
  
  #### Causas
  
  #### Impacto Social


![SoftwareorDataIntegrityFailures](https://github.com/user-attachments/assets/f4174a42-566c-4fa5-bcd7-654a0779e5f0)

# A09:2025 - Security Logging and Alerting Failures


# A10:2025 - Mishandling of Exceptional Conditions

# Referencias:  

- https://www.cloudflare.com/es-es/learning/security/threats/owasp-top-10/  
- https://www.fortinet.com/lat/resources/cyberglossary/owasp 
- https://sucuri.net/guides/what-is-broken-access-control/
- https://www.geeksforgeeks.org/ethical-hacking/owasp-top-10-vulnerabilities-and-preventions/


# Integrantes

Leidy Dayana Avendaño Moreno

Jeisson Andres Hernandez Martinez

Michael Giovanny Sierra Leon
<p align="center">
  <img src="Images/Intro OSWASP Top 10.png" width="600">
</p>

# A01:2025 Broken Access Control.

<p align="center">
  <img src="Images/Broken Access Control..png" width="400">
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

2

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


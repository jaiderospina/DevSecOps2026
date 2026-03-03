**INTEGRANTES**

**ROBERTO CARLOS MUÑOZ

CARLOS ALBERTO GONZALEZ

DIEGO ARMANDO HERNANDEZ

DANIEL MAURICIO DAZA BORJA**

# Análisis de Vulnerabilidades en el OWASP Top 10: Métodos de Explotación y Prevención

# Introducción

El **OWASP Top 10** es un documento de referencia publicado por la organización internacional **OWASP (Open Web Application Security Project)**, que identifica las **10 vulnerabilidades más críticas en aplicaciones web** a nivel mundial.

La edición 2025 representa una actualización basada en:

* Datos reales recopilados de miles de aplicaciones
* Análisis de expertos en ciberseguridad
* Tendencias actuales de ataques
* Cambios en arquitecturas modernas (APIs, microservicios, cloud, DevSecOps)

---

## 🎯 ¿Por qué es importante?

El OWASP Top 10:

* Sirve como estándar global de referencia en seguridad web
* Es utilizado en auditorías, pentesting y cumplimiento normativo
* Orienta a desarrolladores sobre los riesgos más críticos
* Ayuda a priorizar controles de seguridad

---

## 🌍 Enfoque de la edición 2025

La versión 2025 enfatiza especialmente:

* Fallas en control de acceso
* Problemas en mecanismos de autenticación
* Seguridad en APIs
* Gestión de identidades y tokens
* Riesgos en entornos cloud y DevSecOps

---

## 🚀 Objetivo principal

El propósito del OWASP Top 10 no es solo listar vulnerabilidades, sino **crear conciencia y promover mejores prácticas de seguridad desde el diseño hasta la implementación y operación de las aplicaciones.**

---

# 1. A01: Broken Access Control

El **A01: Broken Access Control** del OWASP Top 10 se refiere a las fallas en los mecanismos de autorización que permiten que un usuario realice acciones o acceda a recursos para los que no tiene permisos.

El control de acceso es el sistema que define qué puede hacer cada usuario dentro de una aplicación, según su rol y privilegios, aplicando principios como el **mínimo privilegio** (solo permitir lo estrictamente necesario). Cuando este mecanismo está mal diseñado, mal configurado o no se valida correctamente en el servidor, se produce una vulnerabilidad de autorización rota. 

![enter image description here](https://miro.medium.com/v2/resize:fit:1400/0*nDZEqAb5PlFW4Nx5.png)

En la práctica, esto puede permitir que un atacante:

-   Acceda a información confidencial de otros usuarios.
    
-   Modifique o elimine datos sin autorización.
    
-   Ejecute funciones administrativas sin tener privilegios.
    
-   Manipule identificadores, parámetros, tokens (como JWT) o URLs para evadir controles.
    
-   Aproveche configuraciones incorrectas como CORS mal configurado o APIs sin validación adecuada.
    

Este tipo de vulnerabilidad incluye problemas como IDOR, escalación de privilegios y configuraciones inseguras relacionadas con autorización. Está clasificada en la CWE como CWE-284 (Improper Access Control).

En resumen, **Broken Access Control ocurre cuando una aplicación no restringe correctamente lo que cada usuario puede hacer o ver**, lo que puede comprometer la confidencialidad, integridad y disponibilidad del sistema, siendo una de las vulnerabilidades más críticas y frecuentes en aplicaciones modernas, provocando filtraciones de datos, escalada de privilegios y severos daños reputacionales.

# Diagrama de Flujo

```mermaid  
flowchart TD  
  
A["A01: Broken Access Control"] --> B["Control de Acceso Deficiente<br/>Fallas en la autorización"]  
  
B --> C{"¿Acceso<br/>Restringido<br/>Correctamente?"}  
  
C -- Sí --> D["Acceso Seguro y Restringido<br/>Función Correcta"]  
  
C -- No --> E["Acciones de un Atacante<br/><br/>- Acceso a Datos Sensibles<br/>- Modificación/Eliminación de Datos<br/>- Escalada de Privilegios<br/>- Evasión de Controles"]

```
----------

## ⚔️ Métodos de Explotación

Los atacantes aprovechan estas fallas mediante distintas técnicas:

### 1️⃣ Manipulación de URL y Parámetros (IDOR)

Consiste en modificar identificadores en la URL o en los parámetros de una petición para acceder a recursos de otros usuarios.

**Ejemplo cambio ID en la URL:**

Solicitud legítima:

```
GET https://app.com/profile?userId=1001

```

El atacante modifica el ID:

```
GET https://app.com/profile?userId=1002

```

Si el backend no valida la propiedad del recurso, devolverá datos del usuario 1002.

----------

## 📊 Diagrama Vulnerable

```mermaid
flowchart LR
A[Usuario 1001 autenticado] --> B[Modifica URL userId=1002]
B --> C[Servidor recibe petición]
C --> D[Devuelve datos del usuario 1002]
D --> E[Exposición de información sensible]

```

**Ejemplo descarga de archivos:**

Solicitud original:

```
GET /download?file=invoice_1001.pdf

```

Ataque:

```
GET /download?file=invoice_1002.pdf

```

Si no hay validación → descarga de factura de otro usuario.

----------

## 📊 Diagrama Secuencia

```mermaid
sequenceDiagram
participant U as Usuario
participant S as Servidor

U->>S: Solicita invoice_1001.pdf
S-->>U: Archivo correcto

U->>S: Solicita invoice_1002.pdf
S-->>U: Archivo entregado sin validación

```

----------

### 2️⃣ Force Browsing (Navegación Forzada)

## 📌 Escenario

Un atacante intenta acceder directamente a rutas administrativas:

```
/admin/listar_mails
/admin/dashboard
/app/admin_getappInfo
```

Aunque el frontend o la interfaz gráfica no muestre estos enlaces, el atacante puede acceder manualmente usando navegador, herramientas o línea de comandos:

```bash
curl https://example.com/app/admin_getappInfo
```

---

# 🔴 Diagrama de Flujo – Escenario Vulnerable

```mermaid
flowchart TD
A[Usuario sin privilegios] --> B[Intenta acceder a /admin/dashboard]
B --> C[Servidor recibe solicitud]
C --> D{¿Valida rol en backend?}
D -- No --> E[Permite acceso ❌]
E --> F[Exposición de información administrativa]
D -- Sí --> G[Devuelve 403 Forbidden]
```

---

# 🟠 Flujo Detallado del Ataque

```mermaid
flowchart LR
A[Atacante] --> B[Descubre ruta admin]
B --> C[Usa navegador o curl]
C --> D[Envía petición directa]
D --> E[Servidor sin validación]
E --> F[Acceso concedido]
```

---

# 🟢 Flujo Seguro (Control Correcto)

```mermaid
flowchart TD
A[Usuario sin rol admin] --> B[Solicita /admin/dashboard]
B --> C[Servidor verifica autenticación]
C --> D{¿Tiene rol ADMIN?}
D -- Sí --> E[Acceso permitido]
D -- No --> F[403 Forbidden]
F --> G[Registro en logs de intento no autorizado]
```

----------

### 3️⃣ Manipulación de Tokens y Cookies

## 📌 Escenario

Un atacante intenta:

* Alterar un **JWT**
* Modificar cookies
* Cambiar valores ocultos (`isAdmin=false → true`)
* Reutilizar una sesión activa (Session Hijacking)

Si el servidor **no valida la firma del token ni los privilegios reales en backend**, se produce **escalación de privilegios**.

---

# 🔴 Flujo Vulnerable – Escalación de Privilegios


```mermaid
flowchart TD
A[Usuario autenticado normal] --> B[Intercepta token o cookie]
B --> C[Modifica valor isAdmin=false a true]
C --> D[Envía petición al servidor]
D --> E{Servidor valida firma y rol en backend?}
E -- No --> F[Acceso administrativo concedido]
F --> G[Escalación de privilegios]
E -- Sí --> H[403 Forbidden]
```

---

# 🟠 Flujo Específico – Manipulación de JWT

```mermaid
sequenceDiagram
participant U as Usuario
participant A as Atacante
participant S as Servidor

U->>S: Login correcto
S-->>U: Devuelve JWT

A->>A: Decodifica JWT
A->>A: Modifica role:user a role:admin
A->>S: Envía JWT manipulado
S-->>A: Acceso concedido (si no valida firma)
```

---

# 🟢 Flujo Seguro – Validación Correcta

```mermaid
flowchart TD
A[Petición con token] --> B[Servidor verifica firma]
B --> C{Firma válida?}
C -- No --> D[401 Unauthorized]
C -- Sí --> E[Consulta rol real en base de datos]
E --> F{Tiene privilegios admin?}
F -- No --> G[403 Forbidden]
F -- Sí --> H[Acceso permitido]
```

----------

## 🛠️ Herramientas Comunes Utilizadas

-   **[Burp Suite Professional](https://www.google.com/search?q=Burp+Suite+Professional&oq=Herramientas+Comunes+Utilizadas+para+A01%3A+Broken+Access+Control&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCTc2OTIxajBqN6gCALACAA&sourceid=chrome&ie=UTF-8&mstk=AUtExfATjnT5AHVjJJoehzKWOmL67AiPCf4MNQ3krtoVDaW07zGrlV03ZJhpdQVk4_TTTreg5Ln8P5gr51X6D5Af3AMt-4kTxbqgKXVIC6ksbQnXE60QOJdr-i1lMDdupnHFNZ8kfssE0t3u23M0vURgvYnsjIzeekLNRpAbj0O6kWTniws&csui=3&ved=2ahUKEwjP6v2XzoKTAxWUezABHWxbPQQQgK4QegQIAhAB)/Community**: La herramienta principal para interceptar, analizar y modificar peticiones HTTP/HTTPS (manipulación de parámetros, cookies, JWT) para probar IDOR (Insecure Direct Object Reference) y elevación de privilegios.
-   **[OWASP ZAP](https://www.google.com/search?q=OWASP+ZAP&oq=Herramientas+Comunes+Utilizadas+para+A01%3A+Broken+Access+Control&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCTc2OTIxajBqN6gCALACAA&sourceid=chrome&ie=UTF-8&mstk=AUtExfATjnT5AHVjJJoehzKWOmL67AiPCf4MNQ3krtoVDaW07zGrlV03ZJhpdQVk4_TTTreg5Ln8P5gr51X6D5Af3AMt-4kTxbqgKXVIC6ksbQnXE60QOJdr-i1lMDdupnHFNZ8kfssE0t3u23M0vURgvYnsjIzeekLNRpAbj0O6kWTniws&csui=3&ved=2ahUKEwjP6v2XzoKTAxWUezABHWxbPQQQgK4QegQIAhAD)  (Zed Attack Proxy)**: Escáner de seguridad web de código abierto, ideal para encontrar accesos no protegidos y fallos de autorización automatizados.
-   **[FFUF](https://www.google.com/search?q=FFUF&oq=Herramientas+Comunes+Utilizadas+para+A01%3A+Broken+Access+Control&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCTc2OTIxajBqN6gCALACAA&sourceid=chrome&ie=UTF-8&mstk=AUtExfATjnT5AHVjJJoehzKWOmL67AiPCf4MNQ3krtoVDaW07zGrlV03ZJhpdQVk4_TTTreg5Ln8P5gr51X6D5Af3AMt-4kTxbqgKXVIC6ksbQnXE60QOJdr-i1lMDdupnHFNZ8kfssE0t3u23M0vURgvYnsjIzeekLNRpAbj0O6kWTniws&csui=3&ved=2ahUKEwjP6v2XzoKTAxWUezABHWxbPQQQgK4QegQIAhAF)  (Fuzz Faster U Fool)**: Herramienta de  _fuzzing_  web de alto rendimiento utilizada para descubrir directorios ocultos, URLs no autorizadas y endpoints de API.
-   **[Gobuster](https://www.google.com/search?q=Gobuster&oq=Herramientas+Comunes+Utilizadas+para+A01%3A+Broken+Access+Control&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCTc2OTIxajBqN6gCALACAA&sourceid=chrome&ie=UTF-8&mstk=AUtExfATjnT5AHVjJJoehzKWOmL67AiPCf4MNQ3krtoVDaW07zGrlV03ZJhpdQVk4_TTTreg5Ln8P5gr51X6D5Af3AMt-4kTxbqgKXVIC6ksbQnXE60QOJdr-i1lMDdupnHFNZ8kfssE0t3u23M0vURgvYnsjIzeekLNRpAbj0O6kWTniws&csui=3&ved=2ahUKEwjP6v2XzoKTAxWUezABHWxbPQQQgK4QegQIAhAH)**: Utilizada para la fuerza bruta de URIs (directorios y archivos) y subdominios, lo que permite identificar páginas ocultas accesibles sin autenticación.
-   **[JWT Editor (Extensión de Burp)](https://www.google.com/search?q=JWT+Editor+%28Extensi%C3%B3n+de+Burp%29&oq=Herramientas+Comunes+Utilizadas+para+A01%3A+Broken+Access+Control&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCTc2OTIxajBqN6gCALACAA&sourceid=chrome&ie=UTF-8&mstk=AUtExfATjnT5AHVjJJoehzKWOmL67AiPCf4MNQ3krtoVDaW07zGrlV03ZJhpdQVk4_TTTreg5Ln8P5gr51X6D5Af3AMt-4kTxbqgKXVIC6ksbQnXE60QOJdr-i1lMDdupnHFNZ8kfssE0t3u23M0vURgvYnsjIzeekLNRpAbj0O6kWTniws&csui=3&ved=2ahUKEwjP6v2XzoKTAxWUezABHWxbPQQQgK4QegQIAhAJ)**: Fundamental para decodificar, modificar y firmar de nuevo los tokens JWT para probar la manipulación de metadatos.
-   **[Postman](https://www.google.com/search?q=Postman&oq=Herramientas+Comunes+Utilizadas+para+A01%3A+Broken+Access+Control&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCTc2OTIxajBqN6gCALACAA&sourceid=chrome&ie=UTF-8&mstk=AUtExfATjnT5AHVjJJoehzKWOmL67AiPCf4MNQ3krtoVDaW07zGrlV03ZJhpdQVk4_TTTreg5Ln8P5gr51X6D5Af3AMt-4kTxbqgKXVIC6ksbQnXE60QOJdr-i1lMDdupnHFNZ8kfssE0t3u23M0vURgvYnsjIzeekLNRpAbj0O6kWTniws&csui=3&ved=2ahUKEwjP6v2XzoKTAxWUezABHWxbPQQQgK4QegQIAhAL)**: Muy utilizada para probar API endpoints, permitiendo enviar peticiones con diferentes roles de usuario para verificar si un usuario sin privilegios puede ejecutar POST, PUT o DELETE.
-   **[SQLMap](https://www.google.com/search?q=SQLMap&oq=Herramientas+Comunes+Utilizadas+para+A01%3A+Broken+Access+Control&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCTc2OTIxajBqN6gCALACAA&sourceid=chrome&ie=UTF-8&mstk=AUtExfATjnT5AHVjJJoehzKWOmL67AiPCf4MNQ3krtoVDaW07zGrlV03ZJhpdQVk4_TTTreg5Ln8P5gr51X6D5Af3AMt-4kTxbqgKXVIC6ksbQnXE60QOJdr-i1lMDdupnHFNZ8kfssE0t3u23M0vURgvYnsjIzeekLNRpAbj0O6kWTniws&csui=3&ved=2ahUKEwjP6v2XzoKTAxWUezABHWxbPQQQgK4QegQIAhAN)**: Aunque es para SQL Injection, a menudo revela accesos de administrador o fugas de datos que ocurren por controles de acceso defectuosos.
----------
## 🚨 Ejemplos Reales

⚡ **Facebook “View As”:** Un fallo permitió a atacantes acceder a tokens de acceso de otros usuarios por una falla de control de acceso. Esto expuso millones de cuentas.

⚡ **Snapchat (2014):**  Hackers explotaron una vulnerabilidad de control de acceso para recopilar una lista de 4.6 millones de nombres de usuario y números de teléfono.

---

## 🏗 1️⃣ Medidas de Prevención en Diseño y Desarrollo

### 🔒 Denegar por defecto

El acceso debe estar **bloqueado por defecto**. Solo debe concederse explícitamente cuando exista una regla clara que lo permita.

### 🖥 Validación del lado del servidor

* Todo control de acceso debe implementarse en el **backend (server-side)**.
* Nunca confiar en validaciones del lado del cliente.
* Aplicable también a APIs y arquitecturas serverless.

### 👤 Principio de Mínimo Privilegio (PoLP)

* Cada usuario o servicio debe tener **únicamente los permisos necesarios**.
* Eliminar cuentas inactivas o innecesarias.
* Deshabilitar puntos de acceso que no se utilicen.

### 🎭 Control de Acceso Basado en Roles (RBAC)

* Centralizar la gestión de permisos.
* Asignar roles con privilegios bien definidos.
* Reutilizar mecanismos de control en toda la aplicación.

### 📂 Protección de recursos sensibles

* Deshabilitar el listado de directorios del servidor web.
* Proteger archivos sensibles como:

  * `.git`
  * Archivos de respaldo
  * Metadatos expuestos en la raíz del sitio

### 🆔 Validación de acceso a recursos

* Verificar que el usuario tenga permiso sobre el recurso solicitado (ejemplo: validar propiedad al acceder a `?id=123`).
* Aplicar controles a nivel de dato (no solo a nivel de interfaz).

---

## 🔑 2️⃣ Gestión Segura de Sesiones y Autenticación

### 🪪 Tokens y sesiones

* Invalidar sesiones en el servidor al cerrar sesión.
* Utilizar JWT de corta duración.
* Implementar mecanismos de revocación (ej. estándares OAuth).

### 🔐 Autenticación fuerte

* Implementar autenticación multifactor (MFA).
* Usar métodos confiables como:

  * OTP
  * Biométrica
  * Tokens físicos o virtuales

---

## 🛡 3️⃣ Protección Técnica Adicional

### 🚦 Rate Limiting

* Limitar la cantidad de solicitudes a APIs.
* Reducir impacto de herramientas automatizadas.

### 🔐 Cifrado

* Cifrar datos:

  * En tránsito (TLS/HTTPS)
  * En reposo (base de datos, backups)

---

## 📊 4️⃣ Mitigación Operativa y Monitoreo Continuo

### 📝 Logging y alertas

* Registrar intentos fallidos de acceso.
* Alertar ante patrones sospechosos (ej. múltiples fallos repetidos).

### 🔍 Auditorías periódicas

* Revisar roles y permisos regularmente.
* Evaluar cumplimiento del principio de mínimo privilegio.

### 🧪 Pruebas de seguridad

* Incluir pruebas de control de acceso:

  * Unitarias
  * Integración
  * Pruebas de penetración

### 🔄 Mejora continua

* Actualizar políticas y procedimientos de acceso.
* Adaptarse a nuevas amenazas.

---

# 🎯 Conclusión General

La mitigación de **Broken Access Control** no depende de una sola técnica, sino de una combinación de:

* Diseño seguro (deny by default + RBAC + PoLP)
* Validación estricta en servidor
* Gestión segura de sesiones
* Protección de recursos sensibles
* Monitoreo y auditoría continua

La clave está en aplicar controles centralizados, verificables y auditables, asegurando que cada usuario solo pueda acceder exactamente a lo que le corresponde — ni más, ni menos.

---

# 7. A07: Fallos de Autenticación 

---

![enter image description here](https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/file-uploads/blogs/2147492532/images/5a0c670-e521-5cad-4fcf-c51f0203b430_ChatGPT_Image_1_feb_2026_03_04_47_a.m..png)

## 📌 1. Descripción de la Vulnerabilidad

Según OWASP, **A07:2025 – Fallos de Autenticación** ocurre cuando un sistema no verifica correctamente la identidad de un usuario, dispositivo o aplicación.

La autenticación es la **puerta de entrada** a cualquier sistema.
Si falla, todo el entorno queda expuesto.

### 🔎 Naturaleza del Problema

Un fallo de autenticación ocurre cuando:

* Se permiten contraseñas débiles o predeterminadas
* No existe autenticación multifactor (MFA)
* Se permite fuerza bruta sin limitación
* Se reutilizan tokens de sesión
* Las sesiones no se invalidan correctamente
* Se almacenan contraseñas en texto plano o con hash débil
* Existen credenciales hardcodeadas (CWE-259 / CWE-798)
* Validación incorrecta de certificados (CWE-297)

---

### ⚠ Causas Principales

* Políticas de contraseña inadecuadas
* Ausencia de rate limiting
* Gestión insegura de sesiones
* Procesos débiles de recuperación de contraseña
* Uso de autenticación basada solo en contraseña
* Implementación incorrecta de SSO
* Falta de validación de JWT (aud, iss, scope)

---

### 🎯 Impacto Potencial

* Acceso no autorizado
* Secuestro de sesiones
* Escalada de privilegios
* Exfiltración de datos
* Ransomware
* Fraude financiero
* Incumplimiento normativo
* Pérdida de reputación

---

## 🧨 2. Métodos de Explotación

### 🔹 2.1 Fuerza Bruta

El atacante prueba múltiples combinaciones hasta acertar.

```mermaid
flowchart TD
A[Inicio ataque] --> B[Intento login]
B --> C{Credenciales válidas?}
C -- No --> B
C -- Sí --> D[Acceso no autorizado]
```

Herramientas comunes:

* Hydra
* Burp Suite Intruder
* Scripts automatizados

---

### 🔹 2.2 Credential Stuffing

Uso de listas filtradas de credenciales robadas.

```mermaid
flowchart TD
A[Base de datos filtrada] --> B[Bot automatizado]
B --> C[Prueba credenciales en múltiples sitios]
C --> D{Reutilización exitosa?}
D -- Sí --> E[Acceso a cuenta]
```

Ejemplo real:

* Exposición de contraseñas en Facebook (2019) – almacenamiento en texto plano.

---

### 🔹 2.3 Password Spraying

Probar una contraseña común contra muchos usuarios.

Ejemplo:

```
Usuario1 → Password1!
Usuario2 → Password1!
Usuario3 → Password1!
```

Muy efectivo cuando no hay bloqueo de cuentas.

---

### 🔹 2.4 Fijación de Sesión

El atacante fuerza un ID de sesión conocido antes del login.

```mermaid
flowchart TD
A[Atacante genera ID sesión] --> B[Envía ID a víctima]
B --> C[Víctima inicia sesión]
C --> D[Sesión autenticada con ID conocido]
D --> E[Atacante reutiliza sesión]
```

---

### 🔹 2.5 Omitir Autenticación

Errores lógicos que permiten:

* Saltar validaciones
* Manipular parámetros
* Modificar JWT sin validación adecuada

---

### 🔹 2.6 Caso Real – Colonial Pipeline (2021)

Ataque relacionado con credenciales comprometidas en:

Colonial Pipeline

Impacto:

* Ransomware
* Interrupción del suministro de combustible en EE.UU.
* Millonarias pérdidas económicas

---

## 📉 3. Mejores Prácticas de Prevención y Mitigación

### 🔐 3.1 Implementar Autenticación Multifactor (MFA)

* OTP
* Aplicaciones autenticadoras
* Biométricos
* Hardware tokens

Reduce significativamente:

* Credential stuffing
* Fuerza bruta
* Reutilización de contraseñas

---

### 🔑 3.2 Políticas Modernas de Contraseñas

Alineadas con:

NIST SP 800-63B

Recomendaciones:

* Mínimo 8-12 caracteres
* No forzar rotación periódica innecesaria
* Validar contra listas de contraseñas comprometidas
* Permitir uso de password managers

---

### 🚫 3.3 Protección contra Ataques Automatizados

* Rate limiting
* Backoff progresivo
* Bloqueo temporal de cuenta
* CAPTCHA
* Monitoreo de IP sospechosas

---

### 🔒 3.4 Protección Segura de Contraseñas

* Hash con bcrypt o Argon2
* Salt único por usuario
* Nunca almacenar en texto plano

---

### 🔁 3.5 Gestión Segura de Sesiones

```mermaid
flowchart TD
A[Login exitoso] --> B[Generar nuevo ID sesión]
B --> C[Cookie HttpOnly + Secure]
C --> D[Timeout inactividad]
D --> E[Invalidar sesión]
```

Buenas prácticas:

* No incluir ID en URL
* Invalidar sesiones en logout
* Regenerar sesión tras login
* Configurar tiempos de expiración

---

### 🌐 3.6 Comunicación Segura

* TLS obligatorio
* Protección contra MITM
* Validación correcta de certificados

---

### 🧪 3.7 Pruebas de Seguridad

* Pentesting periódico
* Revisión de código
* Simulación de ataques automatizados
* Escaneo de dependencias

---

### 📚 3.8 Educación y Concientización

* Capacitación contra phishing
* Uso de gestores de contraseñas
* Buenas prácticas de higiene digital

---

## 🚫 ¿Qué NO es un fallo de autenticación?

| Caso                              | Clasificación Correcta |
| --------------------------------- | ---------------------- |
| Usuario ve datos que no debería   | Fallo de autorización  |
| Phishing externo                  | Robo de credenciales   |
| Servidor caído                    | Fallo operativo        |
| Usuario escribe mal la contraseña | Error humano           |

---

# 🏁 Conclusión

Los **Fallos de Autenticación (A07)** siguen siendo una de las vulnerabilidades más críticas del Top 10 de OWASP.

En un mundo donde:

* Las aplicaciones usan APIs
* Existe SSO
* Se manejan tokens JWT
* Los servicios están en la nube

La complejidad aumenta y también el riesgo.

Una autenticación débil puede permitir:

* Secuestro de cuentas
* Ransomware
* Exfiltración de datos
* Daño reputacional severo

🔐 La autenticación no es solo un login.
Es la base de toda la seguridad del sistema.

---

































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

![enter image description here](https://miro.medium.com/v2/resize:fit:1400/0*nDZEqAb5PlFW4Nx5.png)

El control de acceso define:

* ✅ Quién puede acceder
* ✅ A qué recursos puede acceder
* ✅ Qué acciones puede realizar

Cuando estas reglas no se aplican correctamente en el **lado del servidor**, se produce un **Broken Access Control**.

## 🚨 Naturaleza del Problema

Ocurre cuando:

* No se aplica el principio de mínimo privilegio
* No existe “deny by default”
* Se confía en validaciones del frontend
* No se valida la propiedad del recurso
* Se exponen identificadores directos (IDOR)
* Hay mala configuración CORS
* Se manipulan tokens JWT
* No se protegen endpoints POST/PUT/DELETE
* Se permite navegación forzada

---

## 🎯 Impacto Potencial

* Exposición de datos sensibles
* Modificación o eliminación de datos
* Escalada de privilegios (horizontal o vertical)
* Compromiso total del sistema
* Violaciones regulatorias (RGPD, etc.)
* Pérdida financiera
* Daño reputacional
* Interrupción operativa

📊 OWASP indica que el 100% de las aplicaciones analizadas presentaban algún tipo de fallo de control de acceso.

---

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

# 📉 3. Mejores Prácticas de Prevención y Mitigación

---

## 🔐 3.1 Denegar por Defecto (Deny by Default)

Todo recurso debe estar protegido a menos que sea explícitamente público.

---

## 🏗 3.2 Centralizar la Lógica de Autorización

* No dispersar validaciones
* Usar RBAC o ABAC
* Reutilizar módulos de autorización

---

## 👤 3.3 Validar Propiedad del Recurso

No basta validar rol:

```pseudo
if user.id == recurso.owner_id
```

Siempre validar que el usuario sea dueño del objeto.

---

## 🔒 3.4 Aplicar Control en el Servidor

Nunca confiar en:

* HTML
* JavaScript
* Campos ocultos

---

## 🔄 3.5 Gestión Segura de Tokens y Sesiones

* Invalidar sesiones al logout
* JWT de corta duración
* Validar claims (aud, iss, role)
* Implementar refresh tokens seguros

---

## 🌐 3.6 Configuración Segura de CORS

* Definir orígenes específicos
* No usar wildcard en APIs sensibles

---

## 🚦 3.7 Implementar Rate Limiting

Reduce:

* Enumeración de IDs
* Automatización de ataques

---

## 📊 3.8 Logging y Monitoreo

Registrar:

* Intentos fallidos
* Accesos denegados
* Escaladas sospechosas

---

## 🧪 3.9 Pruebas de Seguridad

* Pentesting
* Pruebas de navegación forzada
* Pruebas IDOR
* SAST y DAST
* Tests unitarios de autorización

---

## 📋 3.10 Aplicar Principio de Mínimo Privilegio

Cada usuario debe tener:

> Solo los permisos estrictamente necesarios

---

# 🔎 Ejemplo Seguro vs Vulnerable

### ❌ Código Vulnerable

```php
if(isset($_SESSION['loggedin'])) {
   cargar_emails();
}
```

No valida rol.

---

### ✅ Código Seguro

```php
if(isset($_SESSION['loggedin']) && $_SESSION['isadmin'] == true) {
   cargar_emails();
}
```

Valida autenticación y autorización.

---

# 🏁 Conclusión

**A01:2025 – Broken Access Control** es la vulnerabilidad más crítica del Top 10 de OWASP.

No es un problema superficial.
Es un problema **arquitectónico**.

Requiere:

* Diseño seguro desde el inicio
* Mentalidad “deny by default”
* Validaciones del lado del servidor
* Centralización de la lógica
* Pruebas rigurosas
* Monitoreo continuo

Un control de acceso deficiente puede permitir:

* Robo de información
* Escalada de privilegios
* Manipulación del negocio
* Compromiso total del sistema

🔐 La autenticación abre la puerta.
🛑 El control de acceso decide hasta dónde puedes llegar.

---

































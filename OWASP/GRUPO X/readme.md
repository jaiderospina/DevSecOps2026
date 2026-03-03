**INTEGRANTES**

**ROBERTO CARLOS MUÑOZ

CARLOS ALBERTO GONZALEZ

DIEGO ARMANDO HERNANDEZ

DANIEL MAURICIO DAZA BORJA**

# Análisis de Vulnerabilidades en el OWASP Top 10: Métodos de Explotación y Prevención

El **A01: Broken Access Control** del OWASP Top 10 se refiere a las fallas en los mecanismos de autorización que permiten que un usuario realice acciones o acceda a recursos para los que no tiene permisos.

El control de acceso es el sistema que define qué puede hacer cada usuario dentro de una aplicación, según su rol y privilegios, aplicando principios como el **mínimo privilegio** (solo permitir lo estrictamente necesario). Cuando este mecanismo está mal diseñado, mal configurado o no se valida correctamente en el servidor, se produce una vulnerabilidad de autorización rota. 

En la práctica, esto puede permitir que un atacante:

-   Acceda a información confidencial de otros usuarios.
    
-   Modifique o elimine datos sin autorización.
    
-   Ejecute funciones administrativas sin tener privilegios.
    
-   Manipule identificadores, parámetros, tokens (como JWT) o URLs para evadir controles.
    
-   Aproveche configuraciones incorrectas como CORS mal configurado o APIs sin validación adecuada.
    

Este tipo de vulnerabilidad incluye problemas como IDOR, escalación de privilegios y configuraciones inseguras relacionadas con autorización. Está clasificada en la CWE como CWE-284 (Improper Access Control).

En resumen, **Broken Access Control ocurre cuando una aplicación no restringe correctamente lo que cada usuario puede hacer o ver**, lo que puede comprometer la confidencialidad, integridad y disponibilidad del sistema, siendo una de las vulnerabilidades más críticas y frecuentes en aplicaciones modernas, provocando filtraciones de datos, escalada de privilegios y severos daños reputacionales.

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

-   Alterar JWT
    
-   Modificar cookies
    
-   Cambiar valores ocultos (ej. `isAdmin=false` → `true`)
    
-   Reutilizar sesiones activas (Session Hijacking)
    

Si el servidor no valida correctamente la integridad del token o los privilegios reales del usuario, se produce escalación de privilegios.

----------

### 4️⃣ Ataques contra mecanismos de autenticación mal protegidos

Cuando la autorización depende de autenticación débil:

-   **Credential stuffing**
    
-   **Password spraying**
    
-   **Fuerza bruta distribuida**
    
-   Reutilización de tokens
    
-   Sesiones no invalidadas
    

Los atacantes suelen:

-   Usar botnets para distribuir intentos.
    
-   Explotar APIs sin rate limiting.
    
-   Aprovechar sistemas que solo limitan intentos por IP.
    

----------

## 🛠️ Herramientas Comunes Utilizadas

-   **Burp Suite**
    
-   **OWASP ZAP**
    
-   Extensión **Autorize (Burp)** para detectar fallos de autorización automáticamente.
    
-   `curl` para pruebas manuales de endpoints.
----------
## 🚨 Ejemplos Reales

-   Ataques masivos de **credential stuffing** utilizando millones de credenciales filtradas.
    
-   Aplicaciones móviles con APIs sin validación de autenticación adecuada.
    
-   Plataformas en la nube que permitían múltiples intentos de login sin considerar ataques distribuidos.
    
-   Endpoints administrativos expuestos sin validación de rol.















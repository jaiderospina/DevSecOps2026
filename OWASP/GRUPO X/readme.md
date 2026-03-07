## Integrantes

| # | Nombre |
|---|--------|
| 1 | Roberto Carlos Muñoz |
| 2 | Carlos Alberto Gonzalez |
| 3 | Diego Armando Hernandez |
| 4 | Daniel Mauricio Daza Borja |



# Análisis de Vulnerabilidades en el OWASP Top 10: Métodos de Explotación y Prevención

## Introducción

El **OWASP Top 10** es un documento de referencia publicado por la organización internacional **OWASP (Open Web Application Security Project)**, que identifica las **10 vulnerabilidades más críticas en aplicaciones web** a nivel mundial.

La edición 2025 representa una actualización basada en:

* Datos reales recopilados de miles de aplicaciones
* Análisis de expertos en ciberseguridad
* Tendencias actuales de ataques
* Cambios en arquitecturas modernas (APIs, microservicios, cloud, DevSecOps)

---

## ¿Por qué es importante?

El OWASP Top 10:

* Sirve como estándar global de referencia en seguridad web
* Es utilizado en auditorías, pentesting y cumplimiento normativo
* Orienta a desarrolladores sobre los riesgos más críticos
* Ayuda a priorizar controles de seguridad

---

## Enfoque de la edición 2025

La versión 2025 enfatiza especialmente:

* Fallas en control de acceso
* Problemas en mecanismos de autenticación
* Seguridad en APIs
* Gestión de identidades y tokens
* Riesgos en entornos cloud y DevSecOps

---

## Objetivo principal

El propósito del OWASP Top 10 no es solo listar vulnerabilidades, sino **crear conciencia y promover mejores prácticas de seguridad desde el diseño hasta la implementación y operación de las aplicaciones.**

## Lista del TOP 10 - 2025

1. [A01 - Broken Access Control](https://github.com/jaiderospina/DevSecOps2026/blob/main/OWASP/GRUPO%20X/readme.md#a01-broken-access-control-control-de-acceso-roto)
2. [A02 - Security Misconfiguration](https://github.com/jaiderospina/DevSecOps2026/blob/main/OWASP/GRUPO%20X/readme.md#a02--security-misconfiguration-mala-configuraci%C3%B3n-de-seguridad)
3. [A03 - Software Supply Chain Failures](https://github.com/jaiderospina/DevSecOps2026/blob/main/OWASP/GRUPO%20X/readme.md#a03-software-supply-chain-failures)
4. [A04 - Cryptographic Failures](https://github.com/jaiderospina/DevSecOps2026/blob/main/OWASP/GRUPO%20X/readme.md#a04-cryptographic-failures)
5. [A05 - Injection](https://github.com/jaiderospina/DevSecOps2026/blob/main/OWASP/GRUPO%20X/readme.md#a05-injection-inyecci%C3%B3n)
6. [A06 - Insecure Design](https://github.com/jaiderospina/DevSecOps2026/blob/main/OWASP/GRUPO%20X/readme.md#a06-insecure-design-dise%C3%B1o-inseguro)
7. [A07 - Authentication Failures](https://github.com/jaiderospina/DevSecOps2026/blob/main/OWASP/GRUPO%20X/readme.md#a07-authentication-failures-fallos-de-autenticaci%C3%B3n)
8. [A08 - Software or Data Integrity Failures](https://github.com/jaiderospina/DevSecOps2026/blob/main/OWASP/GRUPO%20X/readme.md#a08--software-or-data-integrity-failures-fallos-de-integridad-de-software-o-datos)
9. [A09 - Security Logging and Alerting Failures](https://github.com/jaiderospina/DevSecOps2026/blob/main/OWASP/GRUPO%20X/readme.md#a09-security-logging--alerting-failures-fallos-en-el-registro-y-las-alertas-de-seguridad)
10. [A10 - Mishandling of Exceptional Conditions](https://github.com/jaiderospina/DevSecOps2026/blob/main/OWASP/GRUPO%20X/readme.md#a10-mishandling-of-exceptional-conditions)
    
---

# A01: Broken Access Control (Control de Acceso Roto)

## 1. Descripción de la Vulnerabilidad

El **A01: Broken Access Control** del OWASP Top 10 se refiere a las fallas en los mecanismos de autorización que permiten que un usuario realice acciones o acceda a recursos para los que no tiene permisos. 

<img src="https://github.com/jaiderospina/DevSecOps2026/blob/main/OWASP/GRUPO%20X/Imagenes/A01.1BAC.png"/>

El control de acceso define:

* Quién puede acceder
* A qué recursos puede acceder
* Qué acciones puede realizar

Cuando estas reglas no se aplican correctamente en el **lado del servidor**, se produce un **Broken Access Control**.

### Naturaleza del Problema

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

### Impacto Potencial

* Exposición de datos sensibles
* Modificación o eliminación de datos
* Escalada de privilegios (horizontal o vertical)
* Compromiso total del sistema
* Violaciones regulatorias (RGPD, etc.)
* Pérdida financiera
* Daño reputacional
* Interrupción operativa

OWASP indica que el 100% de las aplicaciones analizadas presentaban algún tipo de fallo de control de acceso.

---

### Diagrama de Flujo

```mermaid  
flowchart TD  
  
A["A01: Broken Access Control"] --> B["Control de Acceso Deficiente<br/>Fallas en la autorización"]  
  
B --> C{"¿Acceso<br/>Restringido<br/>Correctamente?"}  
  
C -- Sí --> D["Acceso Seguro y Restringido<br/>Función Correcta"]  
  
C -- No --> E["Acciones de un Atacante<br/><br/>- Acceso a Datos Sensibles<br/>- Modificación/Eliminación de Datos<br/>- Escalada de Privilegios<br/>- Evasión de Controles"]

```
----------

## 2. Métodos de Explotación

Los atacantes aprovechan estas fallas mediante distintas técnicas:

### Manipulación de URL y Parámetros (IDOR)

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

### Diagrama Vulnerable

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

### Diagrama Secuencia

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

### Force Browsing (Navegación Forzada)

### Escenario

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

### Diagrama de Flujo – Escenario Vulnerable

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

### Flujo Detallado del Ataque

```mermaid
flowchart LR
A[Atacante] --> B[Descubre ruta admin]
B --> C[Usa navegador o curl]
C --> D[Envía petición directa]
D --> E[Servidor sin validación]
E --> F[Acceso concedido]
```

---

### Flujo Seguro (Control Correcto)

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

### Manipulación de Tokens y Cookies

### Escenario

Un atacante intenta:

* Alterar un **JWT**
* Modificar cookies
* Cambiar valores ocultos (`isAdmin=false → true`)
* Reutilizar una sesión activa (Session Hijacking)

Si el servidor **no valida la firma del token ni los privilegios reales en backend**, se produce **escalación de privilegios**.

---

### Flujo Vulnerable – Escalación de Privilegios


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

### Flujo Específico – Manipulación de JWT

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

### Flujo Seguro – Validación Correcta

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

## Herramientas Comunes Utilizadas

-   **[Burp Suite Professional](https://www.google.com/search?q=Burp+Suite+Professional&oq=Herramientas+Comunes+Utilizadas+para+A01%3A+Broken+Access+Control&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCTc2OTIxajBqN6gCALACAA&sourceid=chrome&ie=UTF-8&mstk=AUtExfATjnT5AHVjJJoehzKWOmL67AiPCf4MNQ3krtoVDaW07zGrlV03ZJhpdQVk4_TTTreg5Ln8P5gr51X6D5Af3AMt-4kTxbqgKXVIC6ksbQnXE60QOJdr-i1lMDdupnHFNZ8kfssE0t3u23M0vURgvYnsjIzeekLNRpAbj0O6kWTniws&csui=3&ved=2ahUKEwjP6v2XzoKTAxWUezABHWxbPQQQgK4QegQIAhAB)/Community**: La herramienta principal para interceptar, analizar y modificar peticiones HTTP/HTTPS (manipulación de parámetros, cookies, JWT) para probar IDOR (Insecure Direct Object Reference) y elevación de privilegios.
-   **[OWASP ZAP](https://www.google.com/search?q=OWASP+ZAP&oq=Herramientas+Comunes+Utilizadas+para+A01%3A+Broken+Access+Control&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCTc2OTIxajBqN6gCALACAA&sourceid=chrome&ie=UTF-8&mstk=AUtExfATjnT5AHVjJJoehzKWOmL67AiPCf4MNQ3krtoVDaW07zGrlV03ZJhpdQVk4_TTTreg5Ln8P5gr51X6D5Af3AMt-4kTxbqgKXVIC6ksbQnXE60QOJdr-i1lMDdupnHFNZ8kfssE0t3u23M0vURgvYnsjIzeekLNRpAbj0O6kWTniws&csui=3&ved=2ahUKEwjP6v2XzoKTAxWUezABHWxbPQQQgK4QegQIAhAD)
----------
## Ejemplos Reales

**Facebook “View As”:** Un fallo permitió a atacantes acceder a tokens de acceso de otros usuarios por una falla de control de acceso. Esto expuso millones de cuentas.

**Snapchat (2014):**  Hackers explotaron una vulnerabilidad de control de acceso para recopilar una lista de 4.6 millones de nombres de usuario y números de teléfono.

---

## 3. Mejores Prácticas de Prevención y Mitigación

### 3.1 Denegar por Defecto (Deny by Default)

Todo recurso debe estar protegido a menos que sea explícitamente público.

---

### 3.2 Centralizar la Lógica de Autorización

* No dispersar validaciones
* Usar RBAC o ABAC
* Reutilizar módulos de autorización

---

### 3.3 Validar Propiedad del Recurso

No basta validar rol:

```pseudo
if user.id == recurso.owner_id
```

Siempre validar que el usuario sea dueño del objeto.

---

### 3.4 Aplicar Control en el Servidor

Nunca confiar en:

* HTML
* JavaScript
* Campos ocultos

---

### 3.5 Gestión Segura de Tokens y Sesiones

* Invalidar sesiones al logout
* JWT de corta duración
* Validar claims (aud, iss, role)
* Implementar refresh tokens seguros

---

### 3.6 Configuración Segura de CORS

* Definir orígenes específicos
* No usar wildcard en APIs sensibles

---

### 3.7 Implementar Rate Limiting

Reduce:

* Enumeración de IDs
* Automatización de ataques

---

### 3.8 Logging y Monitoreo

Registrar:

* Intentos fallidos
* Accesos denegados
* Escaladas sospechosas

---

### 3.9 Pruebas de Seguridad

* Pentesting
* Pruebas de navegación forzada
* Pruebas IDOR
* SAST y DAST
* Tests unitarios de autorización

---

### 3.10 Aplicar Principio de Mínimo Privilegio

Cada usuario debe tener:

> Solo los permisos estrictamente necesarios

---

## Ejemplo Seguro vs Vulnerable

### Código Vulnerable

```php
if(isset($_SESSION['loggedin'])) {
   cargar_emails();
}
```

No valida rol.

---

### Código Seguro

```php
if(isset($_SESSION['loggedin']) && $_SESSION['isadmin'] == true) {
   cargar_emails();
}
```

Valida autenticación y autorización.

---

## 🏁 Conclusión

**A01 – Broken Access Control** es la vulnerabilidad más crítica del Top 10 de OWASP.

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

La autenticación abre la puerta.
El control de acceso decide hasta dónde puedes llegar.

---

# A02 – Security Misconfiguration (Mala configuración de seguridad)

<img src="https://github.com/jaiderospina/DevSecOps2026/blob/main/OWASP/GRUPO%20X/Imagenes/A02.1SMis.png"/>

### ¿Qué es?
Ocurre cuando una aplicación, servidor o servicio está configurado de forma insegura (por ejemplo: credenciales por defecto, permisos abiertos, errores mostrando demasiada información, CORS mal configurado, paneles/admin expuestos, etc.).  
El problema no es “el código” solamente, sino **cómo se desplegó o configuró** el sistema.

### ¿Cómo se ve en un proyecto real? (Ejemplos comunes)
- `DEBUG=True` o modo desarrollo activo en producción.
- Mensajes de error que muestran rutas, versiones o detalles internos (stack trace).
- CORS abierto: permitir `*` sin necesidad.
- Archivos sensibles públicos: `.env`, backups, logs, `/admin` sin controles.
- Permisos muy amplios en roles/usuarios, buckets o carpetas.
- Configuración TLS/HTTPS débil o inexistente.

### Impacto
- Filtración de información sensible (rutas, llaves, versiones, estructura interna).
- Acceso no autorizado a paneles o recursos internos.
- Aumento de superficie de ataque y explotación de fallas encadenadas.

### Buenas prácticas / mitigación
- Desactivar debug en producción (ej: `DEBUG=False`).
- Manejo de errores con páginas genéricas (sin detalles internos).
- Revisar CORS (permitir solo dominios necesarios).
- No exponer `.env` ni secretos; usar variables de entorno y secret managers.
- Aplicar “hardening” del servidor (headers, TLS, permisos, firewall).
- Revisiones por checklist antes de desplegar (pre-deploy).

### Evidencia en este trabajo
- Se revisó configuración de entorno (dev vs prod).
- Se verificó que no se expongan errores con detalles sensibles.
- Se limitó el acceso a recursos sensibles y se controlaron permisos.

---

# A03 Software Supply Chain Failures

<img src="https://github.com/jaiderospina/DevSecOps2026/blob/main/OWASP/GRUPO%20X/Imagenes/A03.1SSCF.jpg"/>

## Introducción

La vulnerabilidad **A03:2025 – Software Supply Chain Failures** del **OWASP** describe los riesgos de seguridad que ocurren cuando una aplicación depende de **componentes externos inseguros o comprometidos** dentro de su cadena de suministro de software.

El software moderno rara vez se desarrolla completamente desde cero. En cambio, depende de:

* Bibliotecas de código abierto
* Frameworks de terceros
* Gestores de paquetes
* Servicios en la nube
* Pipelines de CI/CD
* Contenedores e imágenes base

Si **cualquiera de estos elementos es comprometido**, toda la aplicación puede verse afectada.

Este tipo de ataques se ha vuelto crítico debido a su **alto impacto**, ya que una única dependencia vulnerable puede afectar **miles de organizaciones simultáneamente**.

---

# 1. Descripción de la Vulnerabilidad

### ¿Qué es una falla en la cadena de suministro de software?

Una **falla en la cadena de suministro** ocurre cuando una vulnerabilidad o código malicioso entra al sistema **a través de componentes externos**, en lugar del código propio de la aplicación.

En términos simples:

```
Confías en un componente externo
        ↓
El componente es comprometido
        ↓
Tu aplicación también queda comprometida
```

---

### Causas comunes

Las fallas en la cadena de suministro suelen ocurrir cuando:

* No se controlan las versiones de dependencias
* Se usan bibliotecas obsoletas o sin mantenimiento
* No se monitorean vulnerabilidades en dependencias
* Se descargan componentes de fuentes no confiables
* La seguridad del pipeline CI/CD es débil
* No se implementa control de cambios
* No existe un inventario de dependencias

---

### Componentes de la cadena de suministro

```
Desarrollador
     │
     ▼
Repositorio de código
     │
     ▼
Dependencias externas
     │
     ▼
Pipeline CI/CD
     │
     ▼
Compilación y artefactos
     │
     ▼
Aplicación desplegada
```

Cualquier punto del proceso puede ser comprometido.

---

### Impacto potencial

Las consecuencias pueden ser críticas:

* Ejecución remota de código
* Robo de credenciales
* Instalación de malware
* Ransomware
* Puertas traseras persistentes
* Compromiso masivo de organizaciones

Un solo componente comprometido puede afectar **miles de aplicaciones simultáneamente**.

---

# 2. Métodos de Explotación

Los atacantes generalmente **no atacan directamente la aplicación**, sino los **componentes de los que depende**.

---

### Flujo general de un ataque de cadena de suministro

```mermaid
flowchart TD

A[Atacante] --> B[Compromete dependencia]
B --> C[Dependencia se publica en repositorio]
C --> D[Desarrollador instala o actualiza dependencia]
D --> E[Pipeline CI/CD compila la aplicación]
E --> F[Software infectado se despliega]
F --> G[Usuarios o sistemas comprometidos]
```

---

## Técnicas comunes de ataque

### 1. Dependencias comprometidas

Los atacantes insertan código malicioso en bibliotecas populares.

Ejemplo real:

* Vulnerabilidad **CVE-2021-44228** conocida como **Log4Shell**

Impacto:

* Ejecución remota de código
* Compromiso masivo de servidores

---

### 2. Dependency Confusion

El atacante publica un paquete con el mismo nombre que una biblioteca interna.

### Flujo de ataque

```mermaid
flowchart TD

A[Empresa usa librería interna company-auth]
B[Atacante publica paquete público company-auth]
C[Sistema de build busca dependencias]
D[Descarga paquete malicioso]
E[Malware entra en la aplicación]

A --> C
B --> C
C --> D
D --> E
```

---

### 3. Typosquatting

El atacante crea paquetes con nombres similares.

Ejemplo:

```
requests  ← paquete legítimo
reqeusts  ← paquete malicioso
```

Cuando el desarrollador comete un error tipográfico, instala malware.

---

### 4. Pipeline CI/CD comprometido

Si el atacante obtiene acceso al servidor de compilación:

```
Atacante accede al CI/CD
        ↓
Modifica el proceso de build
        ↓
Inserta código malicioso
        ↓
El software final se distribuye infectado
```

---

### 5. Extensiones o herramientas maliciosas

Ejemplos:

* extensiones de IDE
* plugins
* imágenes de contenedor

Estas herramientas pueden robar:

* tokens
* claves API
* credenciales

---

## Ejemplos de ataques reales

### Ataque SolarWinds

Uno de los ataques más graves de la historia.

* los atacantes comprometieron el sistema de compilación
* insertaron malware en actualizaciones firmadas

Resultado:

* más de **18.000 organizaciones comprometidas**

---

### Vulnerabilidad Log4Shell

Una vulnerabilidad crítica en la biblioteca **Log4j**.

Impacto:

* ejecución remota de código
* ataques de ransomware
* criptominería

Muchas organizaciones **ni siquiera sabían que usaban Log4j** debido a dependencias transitivas.

---

### Gusano npm Shai-Hulud (2025)

Ataque autopropagable que:

* infectaba paquetes npm
* robaba tokens
* publicaba nuevas versiones maliciosas automáticamente

---

## 3. Mejores Prácticas de Prevención y Mitigación

La seguridad de la cadena de suministro requiere **múltiples capas de protección**.

---

### Flujo de seguridad recomendado

```mermaid
flowchart TD

A[Inventario de dependencias] --> B[SBOM]
B --> C[Escaneo de vulnerabilidades]
C --> D[Verificación de firmas]
D --> E[Pipeline CI/CD seguro]
E --> F[Monitoreo continuo]
F --> G[Actualización y parches]
```

---

### 1. Mantener una SBOM (Software Bill of Materials)

Una **SBOM** es una lista completa de todos los componentes del software.

Debe incluir:

* dependencias directas
* dependencias transitivas
* versiones
* fuentes

Herramientas:

* CycloneDX
* SPDX

---

### 2. Escaneo continuo de dependencias

Automatizar la detección de vulnerabilidades.

Herramientas recomendadas:

* OWASP Dependency-Check
* Snyk
* Dependabot
* Trivy

---

### 3. Usar fuentes confiables

Buenas prácticas:

* descargar solo de repositorios oficiales
* verificar firmas digitales
* verificar hashes

---

### 4. Seguridad en CI/CD

Medidas importantes:

* habilitar MFA
* restringir accesos
* separar roles de desarrollo y despliegue
* firmar artefactos de compilación
* registrar logs inmutables

---

### 5. Aplicar principio de mínimo privilegio

Ningún sistema o usuario debe tener más permisos de los necesarios.

Esto aplica a:

* desarrolladores
* pipelines
* repositorios
* servidores

---

### 6. Gestión de parches

Las organizaciones deben:

* monitorear CVE
* actualizar dependencias regularmente
* eliminar bibliotecas sin mantenimiento

---

### 7. Implementaciones seguras

Evitar desplegar actualizaciones en todos los sistemas al mismo tiempo.

Utilizar:

* despliegues canarios
* despliegues por etapas

Esto limita el impacto si un componente está comprometido.

---

## Conclusión

Las **Software Supply Chain Failures** representan uno de los riesgos más críticos en la seguridad moderna.

El software actual depende fuertemente de:

* código abierto
* servicios externos
* automatización
* herramientas de desarrollo

Esto amplía significativamente la superficie de ataque.

Por ello, proteger la cadena de suministro requiere:

* inventario completo de dependencias
* verificación de integridad
* seguridad en CI/CD
* monitoreo continuo
* adopción de principios de **Zero Trust**

Las organizaciones que implementan estas prácticas reducen significativamente la probabilidad de sufrir **ataques a gran escala**.

---

# A04: Cryptographic Failures

<img src="https://github.com/jaiderospina/DevSecOps2026/blob/main/OWASP/GRUPO%20X/Imagenes/A04.1CF.jpg"/>

## 1. Descripción

Las **Cryptographic Failures** ocurren cuando una aplicación **no protege correctamente la información sensible mediante criptografía**.

Esto puede exponer datos como:

- contraseñas
- datos personales
- tarjetas de crédito
- tokens de autenticación

### Causas comunes

- Uso de **HTTP en lugar de HTTPS**
- Contraseñas guardadas **en texto plano**
- Algoritmos débiles (**MD5, SHA1, DES**)
- Mala gestión de **claves criptográficas**
- Datos sensibles sin cifrar en bases de datos

---

## 2. Flujo de la vulnerabilidad

```mermaid
flowchart TD
A[Usuario envía datos] --> B{¿Datos cifrados?}
B -->|No| C[Datos en texto plano]
C --> D[Atacante intercepta]
D --> E[Exposición de datos]
B -->|Sí| F[Datos protegidos]
````
---

# 3. Métodos de explotación

### 1. Man-in-the-Middle (MITM)

El atacante intercepta la comunicación si se usa **HTTP**.

```mermaid
flowchart LR
U[Usuario] --> A[Atacante]
A --> S[Servidor]
A --> D[Roba credenciales]
```

Herramientas usadas:

* Wireshark
* Burp Suite
* MITMProxy

---

### 2. Cracking de hashes débiles

Si se usan hashes como **MD5**, pueden romperse fácilmente.

Herramientas:

* Hashcat
* John the Ripper

Ejemplo:

```
MD5("password") = 5f4dcc3b5aa765d61d8327deb882cf99
```
---

### 3. Robo de base de datos

Si la base de datos guarda datos sin cifrar, un atacante puede robar:

* contraseñas
* información personal
* tarjetas de crédito

---

# 4. Prevención y mitigación

### 1. Usar HTTPS

Implementar:

```
TLS 1.2 o TLS 1.3
HSTS
```
---

### 2. Usar criptografía fuerte

Recomendado:

```
AES-256
SHA-256
RSA-2048
```

Evitar:

```
MD5
SHA1
DES
```
---

### 3. Hash seguro de contraseñas

Usar:

```
bcrypt
Argon2
PBKDF2
```
Nunca guardar contraseñas en texto plano.

---

### 4. Gestión segura de claves

No guardar claves en:

* código fuente
* repositorios públicos

Usar gestores de secretos como:

* Vault
* AWS Secrets Manager

---

# 5. Conclusión

Las **Cryptographic Failures** permiten que atacantes accedan a información sensible.
El uso correcto de **HTTPS, cifrado fuerte y gestión segura de claves** reduce significativamente este riesgo.

---

# A05: Injection (Inyección)
Ejecución de comandos maliciosos por datos no validados → ⚠ CRÍTICO


## Descripción de la Vulnerabilidad

### ¿Qué es?

Ocurre cuando datos no confiables son enviados a un intérprete como parte de un comando o consulta. El atacante puede engañar al interprete para que ejecute comandos no intencionados o acceda a datos sin autorización.

<img src="https://github.com/jaiderospina/DevSecOps2026/blob/main/OWASP/GRUPO%20X/Imagenes/A05.1Injection.png" width=500/>

### ¿Cómo funciona?

El input del usuario se concatena directamente en queries SQL, comandos OS, LDAP o expresiones XPath sin sanitización. El payload malicioso manipula la lógica del interprete para ejecutar acciones no autorizadas.

### Causas

- Falta de validación y sanitización de entradas de usuario

- Uso de consultas dinámicas concatenadas sin parametrización

- Dependencias desactualizadas con vulnerabilidades conocidas

- Ausencia del principio de mínimo privilegio en cuentas de BD

### Impacto

- Robo masivo y exfiltración de datos confidenciales

- Bypass de autenticación y autorización

- Remote Code Execution (RCE) → control total del servidor

- Escalamiento de privilegios y destrucción de información

### Tipos de Inyección

> *SQL Injection · NoSQL Injection (MongoDB \$where) · OS Command Injection · LDAP Injection · Server-Side Template Injection (SSTI) · Log4Shell (JNDI via strings de log)*

 <img src="https://github.com/jaiderospina/DevSecOps2026/blob/main/OWASP/GRUPO%20X/Imagenes/A05.2Injection.png"/>

## Métodos de Explotación

### ¿Cómo la explotan los atacantes?

- Manipulación de parámetros HTTP, cabeceras y cookies

- Inputs en formularios de login, búsqueda o registro

- Inyección en APIs REST/GraphQL sin validación de entrada

- Variables de entorno en contenedores y scripts de IaC

### Ejemplos Reales

<table style="width:67%;">
<colgroup>
<col style="width: 29%" />
<col style="width: 56%" />
</colgroup>
<thead>
<tr>
<th><h3 id="caso-año">Caso / Año</h3></th>
<th><h3 id="impacto-1">Impacto</h3></th>
</tr>
</thead>
<tbody>
<tr>
<td><h4 id="equifax-2017">Equifax (2017)</h3></td>
<td><h4 id="sqli-147m-registros-robados">SQLi → 147M registros robados</h3></td>
</tr>
<tr>
<td><h4 id="log4shell-2021">Log4Shell (2021)</h3></td>
<td><h4 id="jndi-injection-rce-masivo-en-infraestructura-cloud-global">JNDI injection → RCE masivo en infraestructura Cloud global</h3></td>
</tr>
<tr>
<td><h4 id="capital-one-2019">Capital One (2019)</h3></td>
<td><h4 id="ssrf-os-command-injection-en-aws-100m-clientes-expuestos">SSRF + OS Command Injection en AWS → 100M+ clientes expuestos</h3></td>
</tr>
<tr>
<td><h4 id="heartland-2008">Heartland (2008)</h3></td>
<td><h4 id="sql-injection-en-producción-130-millones-de-tarjetas-robadas">SQL Injection en producción → 130 millones de tarjetas robadas</h3></td>
</tr>
</tbody>
</table>

### 

### Herramientas Comunes del Atacante

|  SQLMap   | Burp Suite | Metasploit | Havij  |
|:---------:|:----------:|:----------:|:------:|
| OWASP ZAP |  NoSQLMap  |   commix   | nuclei |

### Código Vulnerable vs. Seguro

> ' -- VULNERABLE: SQL Injection clásico query = "SELECT \* FROM users WHERE name='" + userInput + "'" -- Payload: ' OR '1'='1' -- -- Resultado: acceso a TODA la tabla //
>
>  VULNERABLE: OS Command Injection exec("git clone " + repoUrl) // repoUrl = "repo; rm -rf /"

## Prevención y Mitigación

- Usar consultas parametrizadas / prepared statements en TODAS las operaciones de BD

- Implementar ORMs seguros (Hibernate, SQLAlchemy) que abstraigan la construcción de queries

- Validar y sanitizar todo input con allowlists estrictas (NUNCA blacklists)

- Aplicar principio de mínimo privilegio en cuentas de base de datos

- Integrar SAST/DAST en pipelines CI/CD (Semgrep, Checkmarx, SonarQube)

- Usar WAF con reglas anti-inyección en Cloud (AWS WAF, Cloudflare, ModSecurity)

## Buenas Prácticas DevSecOps

- Shift-Left Security: integrar pruebas de seguridad desde el primer commit

- Separar datos de comandos: nunca concatenar input del usuario en consultas

- Revisiones de código automáticas (SAST): bloquear Código vulnerable antes del merge

- Análisis de composición de software (SCA): detectar librerías con CVEs conocidas

- Escaneo de IaC: validar Terraform/CloudFormation con Checkov/tfsec

  <img src="https://github.com/jaiderospina/DevSecOps2026/blob/main/OWASP/GRUPO%20X/Imagenes/A05.3Injection.png"/>
  
## Configuraciones Recomendadas

<table style="width:67%;">
<colgroup>
<col style="width: 29%" />
<col style="width: 56%" />
</colgroup>
<thead>
<tr>
<th><h3 id="área">Área</h2></th>
<th><h3 id="configuración">Configuración</h2></th>
</tr>
</thead>
<tbody>
<tr>
<td><h4 id="cicd-pipeline">CI/CD Pipeline</h2></td>
<td><h4 id="semgrep-con-ruleset-powasp-top-ten.-bloqueo-automático-ante-hallazgos-críticos">Semgrep con ruleset p/owasp-top-ten. Bloqueo automático ante hallazgos críticos</h2></td>
</tr>
<tr>
<td><h4 id="waf-cloud">WAF Cloud</h2></td>
<td><h4 id="aws-waf-con-awsmanagedrulescommonruleset-en-modo-prevention-activo">AWS WAF con AWSManagedRulesCommonRuleSet en modo Prevention activo</h2></td>
</tr>
<tr>
<td><h4 id="base-de-datos">Base de Datos</h2></td>
<td><h4 id="usuarios-con-permisos-mínimos.-disable-xp_cmdshell-en-mssql.-timeouts-de-consulta">Usuarios con permisos mínimos. Disable xp_cmdshell en MSSQL. Timeouts de consulta</h2></td>
</tr>
<tr>
<td><h4 id="secrets-manager">Secrets Manager</h2></td>
<td><h4 id="variables-sensibles-en-aws-secrets-manager-hashicorp-vault-nunca-hardcodeadas">Variables sensibles en AWS Secrets Manager / HashiCorp Vault, nunca hardcodeadas</h2></td>
</tr>
</tbody>
</table>

## 

## Controles de Seguridad

<table style="width:67%;">
<colgroup>
<col style="width: 29%" />
<col style="width: 15%" />
<col style="width: 27%" />
<col style="width: 14%" />
</colgroup>
<thead>
<tr>
<th><h3 id="control">Control</h2></th>
<th><h3 id="tipo">Tipo</h2></th>
<th><h3 id="herramienta">Herramienta</h2></th>
<th><h3 id="prioridad">Prioridad</h2></th>
</tr>
</thead>
<tbody>
<tr>
<td><h4 id="prepared-statements-orm">Prepared Statements / ORM</h2></td>
<td><h4 id="preventivo">Preventivo</h2></td>
<td><h4 id="hibernate-sqlalchemy">Hibernate, SQLAlchemy</h2></td>
<td><h4 id="crítico">CRÍTICO</h2></td>
</tr>
<tr>
<td><h4 id="sast-en-pipeline-cicd">SAST en pipeline CI/CD</h2></td>
<td><h4 id="detectivo">Detectivo</h2></td>
<td><h4 id="semgrep-sonarqube">Semgrep, SonarQube</h2></td>
<td><h4 id="crítico-1">CRÍTICO</h2></td>
</tr>
<tr>
<td><h4 id="waf-con-reglas-owasp">WAF con reglas OWASP</h2></td>
<td><h4 id="preventivo-1">Preventivo</h2></td>
<td><h4 id="aws-waf-modsecurity">AWS WAF, ModSecurity</h2></td>
<td><h4 id="alto">ALTO</h2></td>
</tr>
<tr>
<td><h4 id="dast-en-staging">DAST en staging</h2></td>
<td><h4 id="detectivo-1">Detectivo</h2></td>
<td><h4 id="owasp-zap-burp-suite">OWASP ZAP, Burp Suite</h2></td>
<td><h4 id="alto-1">ALTO</h2></td>
</tr>
<tr>
<td><h4 id="input-validation-library">Input Validation Library</h2></td>
<td><h4 id="preventivo-2">Preventivo</h2></td>
<td><h4 id="esapi-validator.js">ESAPI, Validator.js</h2></td>
<td><h4 id="alto-2">ALTO</h2></td>
</tr>
<tr>
<td><h4 id="mínimo-privilegio-en-bd">Mínimo privilegio en BD</h2></td>
<td><h4 id="preventivo-3">Preventivo</h2></td>
<td><h4 id="iam-roles-db-users">IAM Roles, DB Users</h2></td>
<td><h4 id="medio">MEDIO</h2></td>
</tr>
</tbody>
</table>

## 

---

# A06 Insecure Design (Diseño Inseguro)
Fallas estructurales de arquitectura desde el origen → ⚠ ALTO


## Descripción de la Vulnerabilidad

### ¿Qué es?

Falla estructural: la arquitectura del sistema no contempla amenazas ni requisitos de seguridad desde el inicio. A diferencia de otras vulnerabilidades, NO puede corregirse con una buena implementación: si el diseño es defectuoso, el sistema es inseguro por naturaleza.

<img src="https://github.com/jaiderospina/DevSecOps2026/blob/main/OWASP/GRUPO X/Imagenes/A06.1InsDesign.png" width=500/>

### ¿Cómo funciona?

El atacante aprovecha flujos lógicos incorrectos, ausencia de controles de negocio o arquitecturas sin defensa en profundidad para ejecutar acciones no autorizadas SIN vulnerar técnicamente el sistema.

### Causas

- Ausencia de Threat Modeling en la fase de diseño del producto

- Sin Security by Design ni Security by Default como principios base

- Requisitos de seguridad no definidos desde el inicio del proyecto

- Deuda técnica acumulada y falta de revisiones de arquitectura

### Impacto

- Vulnerabilidades sistémicas difíciles de corregir

- Bypass de lógica de negocio a gran escala

- Exposición masiva de datos

- Fraudes en plataformas Cloud con impacto financiero severo

<img src="https://github.com/jaiderospina/DevSecOps2026/blob/main/OWASP/GRUPO%20X/Imagenes/A06.2InsDesign.png"/>

## Métodos de Explotación

### Vectores de Ataque

- Business Logic Bypass: saltar pasos de un flujo de pago o aprobación

- Mass Assignment: modificar campos protegidos en APIs REST sin controles de atributo

- IDOR: acceder a recursos de otros usuarios manipulando IDs secuenciales

- Account Enumeration: fuerza bruta sin rate limiting ni bloqueo de cuenta

- Privilege Escalation: arquitectura sin separación efectiva de roles de usuario

### Ejemplos Reales

<table style="width:79%;">
<colgroup>
<col style="width: 15%" />
<col style="width: 63%" />
</colgroup>
<thead>
<tr>
<th><h3 id="caso-año-1">Caso / Año</h3></th>
<th><h3 id="falla-de-diseño-e-impacto">Falla de diseño e Impacto</h3></th>
</tr>
</thead>
<tbody>
<tr>
<td><h4 id="twitter-2020">Twitter (2020)</h3></td>
<td><h4 id="herramienta-interna-sin-controles-de-acceso-130-cuentas-vip-comprometidas">Herramienta interna sin controles de acceso → 130 cuentas VIP comprometidas</h3></td>
</tr>
<tr>
<td><h4 id="peloton-2021">Peloton (2021)</h3></td>
<td><h4 id="api-sin-autenticación-requerida-datos-de-millones-de-usuarios-expuestos">API sin autenticación requerida → datos de millones de usuarios expuestos</h3></td>
</tr>
<tr>
<td><h4 id="parler-2021">Parler (2021)</h3></td>
<td><h4 id="api-sin-rate-limit-ni-orden-de-recursos-scraping-de-70tb-de-datos">API sin rate limit ni orden de recursos → scraping de 70TB de datos</h3></td>
</tr>
<tr>
<td><h4 id="facebook-2018">Facebook (2018)</h3></td>
<td><h4 id="oauth-mal-diseñado-sin-validación-de-estado-50-millones-de-tokens-robados">OAuth mal diseñado sin validación de estado → 50 millones de tokens robados</h3></td>
</tr>
</tbody>
</table>

### 

## Prevención y Mitigación

- Integrar Threat Modeling (STRIDE, PASTA) en fases de diseño de cada sprint

- Definir Secure Design Patterns y arquitecturas de referencia documentadas

- Aplicar Defense in Depth: múltiples capas de controles independientes

- Implementar Zero Trust Architecture: nunca confiar, siempre verificar

- Realizar Design Review con checklist de seguridad antes de cada implementación

- Configurar rate limiting y cuotas en todas las APIs públicas e internas

## Buenas Prácticas DevSecOps

<img src="https://github.com/jaiderospina/DevSecOps2026/blob/main/OWASP/GRUPO%20X/Imagenes/A06.3InsDesign.png"/>

- Security by Design / Security by Default en todas las decisiones arquitectónicas

- Security Champions por equipo como responsables de revisiones de seguridad

- Threat Modeling obligatorio en cada sprint antes de comenzar la implementación

- ADRs (Architecture Decision Records) que incluyan consideraciones de seguridad

- Pruebas de abuso (misuse cases) definidas junto a los casos de uso funcionales

> ** Checklist Threat Modeling en Definition of Ready (DoR):**\
> · ¿Se identificaron activos y flujos de datos?
>
> · ¿Se aplicó STRIDE a cada componente?
>
> · ¿Existe autenticación inter-servicio (mTLS/JWT)?
>
> · ¿Rate limiting definido en APIs?
>
> · ¿Principio de mínimo privilegio en IAM roles?
>
> · ¿Segmentación de red (VPC/subnets) documentada?

## Configuraciones Recomendadas

<table style="width:96%;">
<colgroup>
<col style="width: 15%" />
<col style="width: 80%" />
</colgroup>
<thead>
<tr>
<th><h3 id="área-1">Área</h2></th>
<th><h3 id="configuración-1">Configuración</h2></th>
</tr>
</thead>
<tbody>
<tr>
<td><h4 id="api-gateway">API Gateway</h2></td>
<td><h4 id="rate-limiting-por-usuarioip.-cuotas-de-uso.-throttling-diferenciado.-aws-api-gw-kong">Rate limiting por usuario/IP. Cuotas de uso. Throttling diferenciado. AWS API GW / Kong</h2></td>
</tr>
<tr>
<td><h4 id="identity-access">Identity &amp; Access</h2></td>
<td><h4 id="mfa-obligatorio.-iam-granular-por-recurso.-roles-específicos-por-microservicio.-spiffespire">MFA obligatorio. IAM granular por recurso. Roles específicos por microservicio. SPIFFE/SPIRE</h2></td>
</tr>
<tr>
<td><h4 id="iac-seguro">IaC Seguro</h2></td>
<td><h4 id="checkovtfsec-en-cicd.-políticas-iam-con-acceso-mínimo.-feature-flags-con-controles-de-negocio">Checkov/tfsec en CI/CD. Políticas IAM con acceso mínimo. Feature flags con controles de negocio</h2></td>
</tr>
<tr>
<td><h4 id="zero-trust">Zero Trust</h2></td>
<td><h4 id="mtls-entre-microservicios.-jwt-con-expiración-corta.-verificación-continua-de-identidad-istio-envoy">mTLS entre microservicios. JWT con expiración corta. Verificación continua de identidad (Istio, Envoy)</h3></td>
</tr>
</tbody>
</table>

<img src="./imagenes/image009.png"/>

## Controles de Seguridad

<table style="width:68%;">
<colgroup>
<col style="width: 22%" />
<col style="width: 13%" />
<col style="width: 23%" />
<col style="width: 8%" />
</colgroup>
<thead>
<tr>
<th><h3 id="control-1">Control</h2></th>
<th><h3 id="tipo-1">Tipo</h2></th>
<th><h3 id="herramienta-1">Herramienta</h2></th>
<th><h3 id="prioridad-1">Prioridad</h2></th>
</tr>
</thead>
<tbody>
<tr>
<td><h4 id="threat-modeling-en-sprint">Threat Modeling en sprint</h2></td>
<td><h4 id="diseño">Diseño</h2></td>
<td><h4 id="owasp-threat-dragon-stride">OWASP Threat Dragon, STRIDE</h2></td>
<td><h4 id="crítico-2">CRÍTICO</h2></td>
</tr>
<tr>
<td><h4 id="security-architecture-review">Security Architecture Review</h2></td>
<td><h4 id="diseño-1">Diseño</h2></td>
<td><h4 id="checklist-interno-adrs">Checklist interno, ADRs</h2></td>
<td><h4 id="crítico-3">CRÍTICO</h2></td>
</tr>
<tr>
<td><h4 id="zero-trust-mtls">Zero Trust + mTLS</h2></td>
<td><h4 id="implementación">Implementación</h2></td>
<td><h4 id="istio-envoy-spiffe">Istio, Envoy, SPIFFE</h2></td>
<td><h4 id="alto-3">ALTO</h2></td>
</tr>
<tr>
<td><h4 id="iac-security-scan">IaC Security Scan</h2></td>
<td><h4 id="cicd">CI/CD</h2></td>
<td><h4 id="checkov-tfsec-terrascan">Checkov, tfsec, terrascan</h2></td>
<td><h4 id="alto-4">ALTO</h2></td>
</tr>
<tr>
<td><h4 id="api-rate-limiting">API Rate Limiting</h2></td>
<td><h4 id="runtime">Runtime</h2></td>
<td><h4 id="aws-api-gw-kong-nginx">AWS API GW, Kong, Nginx</h2></td>
<td><h4 id="alto-5">ALTO</h2></td>
</tr>
<tr>
<td><h4 id="penetration-testing">Penetration Testing</h2></td>
<td><h4 id="pre-producción">Pre-producción</h2></td>
<td><h4 id="manual-dast-automatizado">Manual + DAST automatizado</h2></td>
<td><h4 id="medio-1">MEDIO</h2></td>
</tr>
</tbody>
</table>

## 

---

# A07: Authentication Failures (Fallos de Autenticación)

##  1. Descripción de la Vulnerabilidad

Según OWASP, **A07 – Fallos de Autenticación** ocurre cuando un sistema no verifica correctamente la identidad de un usuario, dispositivo o aplicación

<img src="https://github.com/jaiderospina/DevSecOps2026/blob/main/OWASP/GRUPO%20X/Imagenes/A07.1AuthFail.png"/>

La autenticación es la **puerta de entrada** a cualquier sistema.
Si falla, todo el entorno queda expuesto.

### Naturaleza del Problema

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

### Causas Principales

* Políticas de contraseña inadecuadas
* Ausencia de rate limiting
* Gestión insegura de sesiones
* Procesos débiles de recuperación de contraseña
* Uso de autenticación basada solo en contraseña
* Implementación incorrecta de SSO
* Falta de validación de JWT (aud, iss, scope)

---

### Impacto Potencial

* Acceso no autorizado
* Secuestro de sesiones
* Escalada de privilegios
* Exfiltración de datos
* Ransomware
* Fraude financiero
* Incumplimiento normativo
* Pérdida de reputación

---

## 2. Métodos de Explotación

### 2.1 Fuerza Bruta

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

### 2.2 Credential Stuffing

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

### 2.3 Password Spraying

Probar una contraseña común contra muchos usuarios.

Ejemplo:

```
Usuario1 → Password1!
Usuario2 → Password1!
Usuario3 → Password1!
```

Muy efectivo cuando no hay bloqueo de cuentas.

---

### 2.4 Fijación de Sesión

El atacante fuerza un ID de sesión conocido antes del login.

```mermaid
flowchart TD
A[Atacante genera ID sesión] --> B[Envía ID a víctima]
B --> C[Víctima inicia sesión]
C --> D[Sesión autenticada con ID conocido]
D --> E[Atacante reutiliza sesión]
```

---

### 2.5 Omitir Autenticación

Errores lógicos que permiten:

* Saltar validaciones
* Manipular parámetros
* Modificar JWT sin validación adecuada

---

### 2.6 Caso Real – Colonial Pipeline (2021)

Ataque relacionado con credenciales comprometidas en:

Colonial Pipeline

Impacto:

* Ransomware
* Interrupción del suministro de combustible en EE.UU.
* Millonarias pérdidas económicas

---

## 3. Mejores Prácticas de Prevención y Mitigación

### 3.1 Implementar Autenticación Multifactor (MFA)

* OTP
* Aplicaciones autenticadoras
* Biométricos
* Hardware tokens

Reduce significativamente:

* Credential stuffing
* Fuerza bruta
* Reutilización de contraseñas

---

### 3.2 Políticas Modernas de Contraseñas

Alineadas con:

NIST SP 800-63B

Recomendaciones:

* Mínimo 8-12 caracteres
* No forzar rotación periódica innecesaria
* Validar contra listas de contraseñas comprometidas
* Permitir uso de password managers

---

### 3.3 Protección contra Ataques Automatizados

* Rate limiting
* Backoff progresivo
* Bloqueo temporal de cuenta
* CAPTCHA
* Monitoreo de IP sospechosas

---

### 3.4 Protección Segura de Contraseñas

* Hash con bcrypt o Argon2
* Salt único por usuario
* Nunca almacenar en texto plano

---

### 3.5 Gestión Segura de Sesiones

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

### 3.6 Comunicación Segura

* TLS obligatorio
* Protección contra MITM
* Validación correcta de certificados

---

### 3.7 Pruebas de Seguridad

* Pentesting periódico
* Revisión de código
* Simulación de ataques automatizados
* Escaneo de dependencias

---

### 3.8 Educación y Concientización

* Capacitación contra phishing
* Uso de gestores de contraseñas
* Buenas prácticas de higiene digital

---

## ¿Qué NO es un fallo de autenticación?

| Caso                              | Clasificación Correcta |
| --------------------------------- | ---------------------- |
| Usuario ve datos que no debería   | Fallo de autorización  |
| Phishing externo                  | Robo de credenciales   |
| Servidor caído                    | Fallo operativo        |
| Usuario escribe mal la contraseña | Error humano           |

---

## Conclusión

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

 La autenticación no es solo un login.
Es la base de toda la seguridad del sistema.

---

#  A08 – Software or Data Integrity Failures (Fallos de integridad de software o datos)

<img src="https://github.com/jaiderospina/DevSecOps2026/blob/main/OWASP/GRUPO%20X/Imagenes/A08.1SoftDataIntFail.png"/>

### ¿Qué es?
Ocurre cuando el sistema **confía en software, actualizaciones, dependencias, datos o pipelines** sin verificar su integridad.  
Ejemplo: instalar paquetes sin verificación, actualizaciones no firmadas, CI/CD sin controles, o cargar datos/artefactos manipulados.

### ¿Cómo se ve en un proyecto real? (Ejemplos comunes)
- Dependencias descargadas sin control (sin lockfile, sin hash, sin firma).
- Actualizaciones automáticas desde fuentes no confiables.
- Artefactos de CI/CD sin validación o sin control de quién los publica.
- Scripts que descargan ejecutables “de internet” sin verificación.
- Modelos, archivos o data importada que puede ser alterada (supply chain).

### Impacto
- Supply chain attacks: una dependencia comprometida puede ejecutar código malicioso.
- Alteración de artefactos (builds) o datos críticos sin detección.
- Pérdida de confianza del sistema y posible control total por atacante.

### Buenas prácticas / mitigación
- Usar **lockfiles** (ej: `package-lock.json`, `poetry.lock`, `Pipfile.lock`).
- Verificar integridad (hashes / firmas) en dependencias o artefactos.
- Repositorios privados / proxies confiables para paquetes si aplica.
- CI/CD con permisos mínimos, revisiones obligatorias y firmas de artefactos.
- Auditoría de dependencias (SCA) y actualizaciones controladas.
- Controlar quién puede publicar releases y configurar “branch protection”.

### Evidencia en este trabajo
- Se mantuvieron dependencias fijadas con lockfile.
- Se revisaron vulnerabilidades de dependencias (SCA).
- Se propusieron controles en pipeline (revisión, permisos, validación).

---

# A09 Security Logging & Alerting Failures (Fallos en el registro y las alertas de seguridad)
El silencio es la peor respuesta ante un ataque → ⚠ MEDIO-ALTO


## Descripción de la Vulnerabilidad

### ¿Qué es?

Ausencia o insuficiencia de logs de seguridad, monitoreo de eventos críticos y alertas ante comportamientos anómalos. Sin visibilidad, los atacantes pueden operar durante meses sin ser detectados.

<img src="https://github.com/jaiderospina/DevSecOps2026/blob/main/OWASP/GRUPO%20X/Imagenes/A09.1SeLog_Alert.png" width=400/>

### ¿Cómo funciona?

El atacante explota el sistema sin que se generen registros auditables ni alertas. Logs incompletos, no centralizados o sin monitoreo crean zonas ciegas que permiten la persistencia extendida en el entorno comprometido.

### Causas

- Logs deshabilitados, incompletos o con granularidad insuficiente

- Sin integración con SIEM centralizado para correlación de eventos

- Alertas mal configuradas o ausentes ante eventos críticos

- Exceso de ruido vs señal: falsos positivos que enmascaran amenazas reales

- Ausencia de retención adecuada y protegida de logs (sin WORM)

### Impacto

> DATO CRÍTICO: El tiempo de permanencia promedio de un atacante no detectado es de 207 días (IBM Security Report). En SolarWinds fueron 9 meses de actividad invisible comprometiendo 18,000 organizaciones.

- MTTR (Mean Time To Respond) extremadamente elevado

- Brechas activas no detectadas durante semanas o meses

- Incumplimiento normativo: GDPR, PCI-DSS, ISO 27001, SOC 2

- Mayor daño financiero y reputacional acumulado por detección tardía

  <img src="https://github.com/jaiderospina/DevSecOps2026/blob/main/OWASP/GRUPO%20X/Imagenes/A09.2SeLog_Alert.png"/>

## Métodos de Explotación

### Técnicas de Evasión

- Log Tampering: eliminar o modificar logs post-intrusión para borrar rastros

- Log Flooding: generar ruido masivo para ocultar eventos reales entre miles de entradas falsas

- Slow & Low Attack: ataques lentos bajo el umbral de alertas configuradas

- Living off the Land: usar herramientas legítimas del sistema que no generan alertas

- Time-based Evasion: atacar en horarios de baja vigilancia (noches, feriados)

### Ejemplos Reales

<table style="width:79%;">
<colgroup>
<col style="width: 16%" />
<col style="width: 61%" />
</colgroup>
<thead>
<tr>
<th><h4 id="caso-año-2">Caso / Año</h3></th>
<th><h4 id="tiempo-sin-detección-e-impacto">Tiempo sin Detección e Impacto</h3></th>
</tr>
</thead>
<tbody>
<tr>
<td><h4 id="solarwinds-2020">SolarWinds (2020)</h3></td>
<td><h4 id="meses-sin-detección-18000-organizaciones-comprometidas-globalmente">9 meses sin detección → 18,000 organizaciones comprometidas globalmente</h3></td>
</tr>
<tr>
<td><h4 id="marriott-2018">Marriott (2018)</h3></td>
<td><h4 id="brecha-activa-4-años-500-millones-de-registros-de-huéspedes-expuestos">Brecha activa 4 años → 500 millones de registros de huéspedes expuestos</h3></td>
</tr>
<tr>
<td><h4 id="yahoo-2013-2016">Yahoo (2013-2016)</h3></td>
<td><h4 id="detectado-3-años-después-3000-millones-de-cuentas-afectadas">Detectado 3 años después → 3,000 millones de cuentas afectadas</h3></td>
</tr>
<tr>
<td><h4 id="uber-2016">Uber (2016)</h3></td>
<td><h4 id="brecha-oculta-1-año-sin-alertas-activas-datos-de-57m-usuarios">Brecha oculta 1 año sin alertas activas → datos de 57M usuarios</h3></td>
</tr>
</tbody>
</table>

### 

### Herramientas de Análisis Forense

| Splunk | ELK Stack | AWS CloudTrail |  Datadog  |
|:------:|:---------:|:--------------:|:---------:|
| Wazuh  |  Graylog  |    Grafana     | PagerDuty |

## Prevención y Mitigación

- Implementar logging centralizado con ELK Stack, Splunk o SIEM cloud-native

- Usar structured logging en JSON con niveles de severidad estándar

- Activar AWS CloudTrail, CloudWatch, GuardDuty en TODOS los entornos sin excepciones

- Definir alertas automáticas para: auth failures, privilege escalation, accesos anómalos

- Implementar retención de logs inmutable (S3 Object Lock WORM)

- Integrar SIEM con SOAR para respuesta automatizada a incidentes de seguridad

### CÓdigo â€” Structured Logging (Python)

> \# Structured Logging (Python) – Buena práctica import structlog log = structlog.get_logger() log.info("auth.login_attempt", user_id=user.id, ip_address=request.remote_addr, success=False, reason="invalid_password", timestamp=datetime.utcnow().isoformat() ) \# NUNCA loguear: passwords, tokens, PII en claro log.info("login", password=user_password) \# NUNCA hacer esto

## Buenas Prácticas DevSecOps

- Registrar eventos críticos: autenticaciones, errores de autorización, cambios de configuración

- Logs en formato JSON estructurado con campos estandarizados (timestamp, user_id, ip, action)

- Pruebas periódicas de alertas: simular incidentes para validar el pipeline de detección

- Integración con SOAR para playbooks de respuesta automatizada ante incidentes

- Sincronización NTP en todos los sistemas para correlación correcta de eventos

  <img src="https://github.com/jaiderospina/DevSecOps2026/blob/main/OWASP/GRUPO%20X/Imagenes/A09.3SeLog_Alert.png"/>

## Configuraciones Recomendadas

<table style="width:72%;">
<colgroup>
<col style="width: 18%" />
<col style="width: 73%" />
</colgroup>
<thead>
<tr>
<th><h3 id="servicio">Servicio</h2></th>
<th><h3 id="configuración-2">Configuración</h2></th>
</tr>
</thead>
<tbody>
<tr>
<td><h4 id="aws-cloudtrail">AWS CloudTrail</h2></td>
<td><h4 id="activar-en-todas-las-regiones.-logs-a-s3-con-object-lock-worm.-integrar-con-cloudwatch">Activar en todas las regiones. Logs a S3 con Object Lock (WORM). Integrar con CloudWatch</h2></td>
</tr>
<tr>
<td><h4 id="aws-guardduty">AWS GuardDuty</h2></td>
<td><h4 id="habilitar-threat-detection.-integrar-con-security-hub-para-correlación-centralizada">Habilitar threat detection. Integrar con Security Hub para correlación centralizada</h2></td>
</tr>
<tr>
<td><h4 id="alarmas-cloudwatch">Alarmas CloudWatch</h2></td>
<td><h4 id="alerta-inmediata-ante-uso-de-cuenta-root-threshold1-period300s-vía-sns">Alerta inmediata ante uso de cuenta root (threshold=1, period=300s) vÍa SNS</h2></td>
</tr>
<tr>
<td><h4 id="siem-soar">SIEM / SOAR</h2></td>
<td><h4 id="splunkelk-con-connectors-cloud.-playbooks-automáticos-ante-incidentes-críticos-detectados">Splunk/ELK con connectors cloud. Playbooks automáticos ante incidentes críticos detectados</h2></td>
</tr>
</tbody>
</table>

## 

## Controles de Seguridad

<table style="width:62%;">
<colgroup>
<col style="width: 20%" />
<col style="width: 9%" />
<col style="width: 23%" />
<col style="width: 8%" />
</colgroup>
<thead>
<tr>
<th><h3 id="control-2">Control</h2></th>
<th><h3 id="tipo-2">Tipo</h2></th>
<th><h3 id="herramienta-2">Herramienta</h2></th>
<th><h3 id="prioridad-2">Prioridad</h2></th>
</tr>
</thead>
<tbody>
<tr>
<td><h4 id="siem-centralizado">SIEM centralizado</h2></td>
<td><h4 id="detectivo-2">Detectivo</h2></td>
<td><h4 id="splunk-elk-azure-sentinel">Splunk, ELK, Azure Sentinel</h2></td>
<td><h4 id="crítico-4">CRÍTICO</h2></td>
</tr>
<tr>
<td><h4 id="cloudtrail-guardduty">CloudTrail + GuardDuty</h2></td>
<td><h4 id="detectivo-3">Detectivo</h2></td>
<td><h4 id="aws-nativo-azure-defender">AWS nativo, Azure Defender</h2></td>
<td><h4 id="crítico-5">CRÍTICO</h2></td>
</tr>
<tr>
<td><h4 id="alertas-en-tiempo-real">Alertas en tiempo real</h2></td>
<td><h4 id="reactivo">Reactivo</h2></td>
<td><h4 id="pagerduty-opsgenie-sns">PagerDuty, OpsGenie, SNS</h2></td>
<td><h4 id="crítico-6">CRÍTICO</h2></td>
</tr>
<tr>
<td><h4 id="logs-inmutables-worm">Logs inmutables (WORM)</h2></td>
<td><h4 id="preventivo-4">Preventivo</h2></td>
<td><h4 id="s3-object-lock-azure-blob">S3 Object Lock, Azure Blob</h2></td>
<td><h4 id="alto-6">ALTO</h2></td>
</tr>
<tr>
<td><h4 id="soar-automatizado">SOAR automatizado</h2></td>
<td><h4 id="reactivo-1">Reactivo</h2></td>
<td><h4 id="splunk-soar-demistoxsoar">Splunk SOAR, Demisto/XSOAR</h2></td>
<td><h4 id="alto-7">ALTO</h2></td>
</tr>
<tr>
<td><h4 id="structured-logging">Structured Logging</h2></td>
<td><h4 id="preventivo-5">Preventivo</h2></td>
<td><h4 id="structlog-loguru-serilog">structlog, Loguru, Serilog</h2></td>
<td><h4 id="alto-8">ALTO</h2></td>
</tr>
<tr>
<td><h4 id="log-retention-policy">Log Retention Policy</h2></td>
<td><h4 id="preventivo-6">Preventivo</h2></td>
<td><h4 id="aws-config-rules-azure-policy">AWS Config Rules, Azure Policy</h2></td>
<td><h4 id="medio-2">MEDIO</h2></td>
</tr>
</tbody>
</table>

##

---

# A10: Mishandling of Exceptional Conditions

<img src="https://github.com/jaiderospina/DevSecOps2026/blob/main/OWASP/GRUPO%20X/Imagenes/A10.1MOEC.png" width="300">

## 1. Descripción Breve de la Vulnerabilidad

### ¿Qué es?

**A10:2025 - Mishandling of Exceptional Conditions** (Manejo Inadecuado de Condiciones Excepcionales) ocurre cuando una aplicación **no gestiona correctamente condiciones excepcionales**, como errores del sistema, fallos de red, entradas inesperadas o estados no previstos.

Es una vulnerabilidad que surge cuando los desarrolladores implementan manejo de excepciones deficiente o inexistente, permitiendo que:

- Errores críticos expongan información sensible del sistema
- Flujos de control se desvíen de forma impredecible
- Validaciones se salten silenciosamente
- Fallos de seguridad pasen desapercibidos en logs

En entornos **DevSecOps**, esta vulnerabilidad suele aparecer en:
- Microservicios
- APIs RESTful
- Pipelines CI/CD automatizados
- Infraestructura contenedorizada
- Sistemas distribuidos en cloud

---

### ¿Cómo funciona?

Cuando una aplicación no maneja correctamente una excepción, el sistema experimenta un flujo de eventos que puede ser explotado:

```
┌───────────────────────────────────────────────────────────────┐
│                   FLUJO DE LA VULNERABILIDAD                  │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  1. ENTRADA INESPERADA                                         │
│     └─> Usuario o atacante envía datos malformados           │
│                                                                │
│  2. CONDICIÓN EXCEPCIONAL                                      │
│     └─> Aplicación encuentra error no previsto               │
│                                                                │
│  3. FALTA DE MANEJO                                            │
│     └─> No hay lógica de captura adecuada                    │
│                                                                │
│  4. EXPOSICIÓN DE INFORMACIÓN                                  │
│     └─> Stack trace, rutas internas, versiones expuestas     │
│                                                                │
│  5. EXPLOTACIÓN                                                │
│     └─> Atacante obtiene información para siguiente ataque   │
│                                                                │
└───────────────────────────────────────────────────────────────┘
```

### Causas principales

```
┌───────────────────────────────────────────────────────────────┐
│              CAUSAS DE LA VULNERABILIDAD                       │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│ • Falta de bloques try-catch adecuados en código             │
│ • Manejo genérico de excepciones (catch Exception)           │
│ • Logging insuficiente de errores críticos                   │
│ • Exposición de stack traces en respuestas HTTP              │
│ • Ausencia de validación post-excepción                      │
│ • Gestión inadecuada de fallos en servicios remotos          │
│ • Timeouts no configurados en operaciones críticas           │
│ • Recuperación de errores sin verificación de estado         │
│ • Falta de centralización del manejo de errores              │
│ • Mensajes de error detallados en producción                 │
│                                                                │
└───────────────────────────────────────────────────────────────┘
```

### Impacto en DevSecOps

En pipelines CI/CD y arquitecturas cloud-native, esta vulnerabilidad se amplifica debido a:

| Aspecto | Impacto |
|--------|--------|
| **Divulgación de Información** | Exposición de rutas internas, versiones, tecnologías, estructura del sistema |
| **Compromiso de Lógica** | Elusión de controles de seguridad mediante manipulación de flujos de error |
| **Indisponibilidad** | Fallos en cascada que afectan a múltiples servicios en la arquitectura distribuida |
| **Exfiltración de Datos** | Acceso a información sensible mediante análisis de mensajes de error |
| **Escalamiento** | Punto de apoyo para ataques posteriores más sofisticados |
| **Complejidad Distribuida** | Múltiples capas de servicios sin manejo centralizado |
| **Logs Distribuidos** | Imposibilidad de correlacionar errores sin infraestructura apropiada |
| **Fallos Silenciosos** | Excepciones no capturadas en contenedores |

### Naturaleza de la vulnerabilidad

```
CATEGORÍA:         Error de Diseño + Error de Implementación + Error de Configuración
TIPO:              Manejo de Errores
SEVERIDAD:         Alta (CVSS 7.5+)
FRECUENCIA:        Muy Común (aparece en 40-60% de aplicaciones)
DETECTABLE:        Sí (mediante SAST, DAST, análisis manual)
```

---

## 2. Métodos de Explotación

### Descripción de ataques

Los atacantes provoca condiciones inesperadas para observar cómo reacciona el sistema, permitiendo extraer información valiosa:

```
┌──────────────────────────────────────────────────────────────┐
│              FLUJO TÍPICO DE EXPLOTACIÓN                      │
├──────────────────────────────────────────────────────────────┤
│                                                                │
│  FASE 1: RECONOCIMIENTO                                        │
│  ┌──────────────────────┐                                     │
│  │ Envío de Inputs      │                                     │
│  │ Malformados          │                                     │
│  └────────┬─────────────┘                                     │
│           │                                                    │
│           v                                                    │
│  FASE 2: GENERACIÓN DE ERROR                                  │
│  ┌──────────────────────────────┐                             │
│  │ Generación de Excepción      │                             │
│  │ No Controlada                │                             │
│  └────────┬─────────────────────┘                             │
│           │                                                    │
│           v                                                    │
│  FASE 3: EXTRACCIÓN DE INFORMACIÓN                            │
│  ┌──────────────────────────────┐                             │
│  │ Exposición de Stack Trace    │                             │
│  │ o Información Sensible       │                             │
│  └────────┬─────────────────────┘                             │
│           │                                                    │
│           v                                                    │
│  FASE 4: ENUMERACIÓN                                           │
│  ┌──────────────────────────────┐                             │
│  │ Análisis de Respuesta        │                             │
│  │ para Enumeración de Sistema  │                             │
│  └────────┬─────────────────────┘                             │
│           │                                                    │
│           v                                                    │
│  FASE 5: EXPLOTACIÓN                                           │
│  ┌──────────────────────────────┐                             │
│  │ Construcción de Exploit      │                             │
│  │ Dirigido y Específico        │                             │
│  └──────────────────────────────┘                             │
│                                                                │
└──────────────────────────────────────────────────────────────┘
```

### Cómo la explotan los atacantes

1. **Inyección de Excepciones**: Enviar payloads malformados deliberadamente
   - Caracteres especiales: `'`, `"`, `\`, `/`, `%`
   - Valores nulos o vacíos
   - Tipos de datos incorrectos
   - Valores numéricos extremos

2. **Análisis de Errores**: Examinar mensajes de error para reconocimiento
   - Identificar versiones de tecnologías
   - Mapear estructura de carpetas
   - Descubrir bases de datos
   - Encontrar endpoints internos

3. **Fuzzing Automático**: Pruebas automáticas para generar condiciones excepcionales
   - Envío masivo de inputs variados
   - Búsqueda de puntos débiles
   - Análisis de respuestas diferenciadas

4. **Timing Attacks**: Medir tiempos de respuesta en manejo de errores
   - Diferencias en tiempos revelan lógica interna
   - Validar información mediante tiempo de respuesta

5. **Log Injection**: Manipular logs mediante caracteres especiales
   - Inyectar líneas en logs
   - Falsificar eventos de auditoría
   - Ocultar actividad maliciosa

---

---

### Herramientas comunes utilizadas por atacantes

| Herramienta | Tipo | Propósito | Uso en A10:2025 |
|-------------|------|----------|-----------------|
| **Burp Suite** | Scanner Web | Fuzzing interactivo de errores | Identificar endpoints que exponen información |
| **OWASP ZAP** | Scanner Web | Escaneo automático de seguridad | Automatizar búsqueda de stack traces |
| **Postman** | Cliente HTTP | Generación manual de requests | Crear payloads anómalos personalizados |
| **Insomnia** | Cliente HTTP | Generación de requests | Fuzzing interactivo |
| **Apache JMeter** | Herramienta de Carga | Pruebas de estrés | Generar excepciones concurrentes |
| **AFL Fuzzer** | Fuzzer | Fuzzing dirigido | Generar inputs que causen excepciones |
| **LibFuzzer** | Fuzzer | Fuzzing de cobertura | Automatizar búsqueda de excepciones |
| **Chaos Monkey** | Inyección de Fallos | Inyectar fallos en cloud | Explorar manejo de fallos en producción |
| **wfuzz** | Fuzzer Web | Fuzzing de parámetros | Probar combinaciones de entrada |
| **ffuf** | Fuzzer Rápido | Fuzzing de fuerza bruta | Descubrir endpoints y parámetros |

---

## 3. Prevención y Mitigación

### Estrategia integrada en 4 capas

```
┌─────────────────────────────────────────────────────────────┐
│                   CAPA 1: PREVENCIÓN                         │
│            (Fase de Desarrollo)                              │
├─────────────────────────────────────────────────────────────┤
│ • Code Review enfocado en manejo de excepciones              │
│ • SAST: Análisis estático (SonarQube, Checkmarx, Fortify)  │
│ • Entrenamiento de desarrolladores en patrones seguros      │
│ • Pair programming en funciones críticas                    │
└─────────────────────────────────┬───────────────────────────┘
                                  │
                                  ↓
┌─────────────────────────────────────────────────────────────┐
│                 CAPA 2: MITIGACIÓN COMPILACIÓN               │
│            (Fase de Build & Integration)                     │
├─────────────────────────────────────────────────────────────┤
│ • Linting automático: eslint, pylint, checkstyle            │
│ • DAST: Pruebas dinámicas en CI/CD (OWASP ZAP)             │
│ • Validación de dependencias vulnerables                    │
│ • Análisis de cobertura de excepciones                      │
└─────────────────────────────────┬───────────────────────────┘
                                  │
                                  ↓
┌─────────────────────────────────────────────────────────────┐
│                 CAPA 3: CONTROL EN TIEMPO DE EJECUCIÓN       │
│            (Fase de Deploy & Runtime)                        │
├─────────────────────────────────────────────────────────────┤
│ • WAF (Web Application Firewall) con reglas de error        │
│ • Monitoreo de excepciones en tiempo real                   │
│ • Circuit Breakers implementados                            │
│ • Timeouts configurados en todas las operaciones            │
│ • Rate limiting en endpoints                                │
└─────────────────────────────────┬───────────────────────────┘
                                  │
                                  ↓
┌─────────────────────────────────────────────────────────────┐
│               CAPA 4: DETECCIÓN Y RESPUESTA                  │
│            (Fase de Monitoreo & Incident Response)           │
├─────────────────────────────────────────────────────────────┤
│ • SIEM: Análisis centralizado de logs (ELK, Splunk)        │
│ • Alertas automáticas de patrones anómalos                 │
│ • Incident response automatizado                            │
│ • Correlación de eventos distribuidos                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Buenas Prácticas

### Diagrama de flujo seguro de manejo de excepciones

```
┌─────────────────────────────────┐
│   ENTRADA DEL USUARIO           │
│   (Solicitud HTTP)              │
└────────────────┬────────────────┘
                 │
                 v
        ┌────────────────────┐
        │ VALIDACIÓN         │
        │ PRELIMINAR         │
        │ (Entrada)          │
        └────────┬───────────┘
                 │
          ┌──────┴──────┐
          │             │
         NO            SÍ
          │             │
          v             v
      ┌────────┐   ┌──────────────────┐
      │RECHAZO │   │PROCESAMIENTO      │
      │+ LOG   │   │DE LÓGICA          │
      └────────┘   └────┬─────────────┘
                         │
                    ┌────┴─────┐
                    │           │
                  ERROR       SUCCESS
                    │           │
                    v           v
            ┌────────────────┐ ┌──────────────┐
            │CAPTURA         │ │VALIDACIÓN    │
            │ESPECÍFICA      │ │POST-OPERACIÓN│
            │DE EXCEPCIÓN    │ └────────┬─────┘
            └────────┬───────┘          │
                     │                  │
            ┌────────┴─────┐            │
            │              │            │
        ESPERADA      INESPERADA        │
            │              │            │
            v              v            │
        ┌────────┐   ┌──────────┐      │
        │RECUPER │   │ESCALADA  │      │
        │AR      │   │SEGURA    │      │
        │RETRY   │   │LOG CRÍTICO│      │
        └────┬───┘   └────┬─────┘      │
             │            │             │
             └────────┬───┴────────────┘
                      │
                      v
          ┌───────────────────────┐
          │LOGGING DETALLADO      │
          │(sin exponer sensible) │
          │- Request ID           │
          │- Usuario              │
          │- Timestamp            │
          │- Error Type           │
          │- Resultado            │
          └────────────┬──────────┘
                       │
                       v
          ┌───────────────────────┐
          │RESPUESTA AL USUARIO   │
          │(GENÉRICA Y SEGURA)    │
          │- Código HTTP          │
          │- Mensaje genérico     │
          │- Reference ID         │
          │- SIN detalles técnicos│
          └───────────────────────┘
```

### Checklist de implementación

```
VALIDACIÓN Y ENTRADA
─────────────────────────────────────────
[ ] Todas las entradas son validadas antes del procesamiento
[ ] Validación ocurre tanto en cliente como servidor
[ ] Mensajes de rechazo son genéricos (no revelan estructura)
[ ] Validaciones ocurren de nuevo después de recuperarse de error

MANEJO DE EXCEPCIONES
─────────────────────────────────────────
[ ] No hay bloques catch(Exception) genéricos
[ ] Cada excepción esperada tiene un handler específico
[ ] Excepciones inesperadas se loguean con contexto completo
[ ] Se implementa recuperación (retry/fallback) cuando es apropiado

LOGGING Y MONITOREO
─────────────────────────────────────────
[ ] Todos los errores críticos están logeados
[ ] Logs no contienen información sensible (contraseñas, tokens)
[ ] Logs están correlacionados por request_id
[ ] Logs centralizados en ELK/Splunk/Datadog
[ ] Patrones anómalos se detectan automáticamente

RESPUESTAS AL CLIENTE
─────────────────────────────────────────
[ ] Nunca se exponen stack traces
[ ] Nunca se revelan detalles internos del sistema
[ ] Se proporciona reference_id para seguimiento
[ ] Mensajes de error son genéricos pero útiles
[ ] Errores de autenticación no revelan si usuario existe

CONFIGURACIÓN Y DEPLOYMENT
─────────────────────────────────────────
[ ] LOG_LEVEL=ERROR en producción (nunca DEBUG)
[ ] EXPOSE_DETAILS=false en configuración
[ ] Timeouts configurados explícitamente
[ ] Circuit Breakers implementados en servicios remotos
[ ] Health checks miden estado de excepciones

TESTING
─────────────────────────────────────────
[ ] Existen tests para cada tipo de excepción esperada
[ ] Tests verifican que respuesta es genérica
[ ] Tests verifican que logging es correcto
[ ] DAST automatizado en CI/CD busca stack traces
[ ] Chaos testing inyecta fallos y valida recuperación
```

---

## 5. Configuraciones Recomendadas

### Arquitectura segura en DevSecOps

```
┌────────────────────────────────────────────────────────────────┐
│                   USUARIO / CLIENTE                            │
└──────────────────────────────┬─────────────────────────────────┘
                               │
                               v
        ┌──────────────────────────────────────────┐
        │         API GATEWAY / WAF                 │
        │ ├─ Validación de entrada                 │
        │ ├─ Rate limiting por IP                  │
        │ ├─ Detección de patrones de ataque       │
        │ ├─ Error masking inicial                 │
        │ └─ Compresión de respuesta               │
        └──────────────┬───────────────────────────┘
                       │
        ┌──────────────┴────────────────────────┐
        │                                        │
        v                                        v
  ┌──────────────┐                      ┌──────────────┐
  │SERVICIO A    │                      │SERVICIO B    │
  │              │                      │              │
  │┌──────────┐  │                      │┌──────────┐  │
  ││Try-Catch │  │                      ││Try-Catch │  │
  ││Específico│  │                      ││Específico│  │
  │└──────────┘  │                      │└──────────┘  │
  │              │                      │              │
  │┌──────────┐  │                      │┌──────────┐  │
  ││Circuit   │  │                      ││Circuit   │  │
  ││Breaker   │  │                      ││Breaker   │  │
  │└──────────┘  │                      │└──────────┘  │
  │              │                      │              │
  │┌──────────┐  │                      │┌──────────┐  │
  ││Timeout   │  │                      ││Timeout   │  │
  ││5s Config │  │                      ││5s Config │  │
  │└──────────┘  │                      │└──────────┘  │
  └──────────────┘                      └──────────────┘
        │                                        │
        └──────────────┬─────────────────────────┘
                       │
                       v
        ┌──────────────────────────────────────┐
        │   LOGGER CENTRALIZADO (ELK STACK)    │
        │ ┌──────────────────────────────────┐ │
        │ │ Elasticsearch                     │ │
        │ │ - Indexación de logs             │ │
        │ │ - Búsqueda full-text             │ │
        │ │ - Correlación de eventos         │ │
        │ └──────────────────────────────────┘ │
        │ ┌──────────────────────────────────┐ │
        │ │ Logstash                          │ │
        │ │ - Parseo de logs                 │ │
        │ │ - Enriquecimiento                │ │
        │ │ - Normalización                  │ │
        │ └──────────────────────────────────┘ │
        │ ┌──────────────────────────────────┐ │
        │ │ Kibana                            │ │
        │ │ - Visualización                  │ │
        │ │ - Dashboards                     │ │
        │ │ - Análisis                       │ │
        │ └──────────────────────────────────┘ │
        └────────────┬─────────────────────────┘
                     │
        ┌────────────┴──────────────┐
        │                           │
        v                           v
  ┌──────────────┐          ┌──────────────────┐
  │   ALERTAS    │          │  AUDIT LOGS      │
  │              │          │                  │
  │┌────────────┐│          │┌────────────────┐│
  ││ Patrones   ││          ││ Seguridad      ││
  ││ anómalos   ││          ││ Compliance     ││
  ││ en tasa de ││          ││ Trazabilidad   ││
  ││ excepciones││          ││ Detección de   ││
  │└────────────┘│          ││ anomalías      ││
  │┌────────────┐│          │└────────────────┘│
  ││ Circuit    ││          │┌────────────────┐│
  ││ breakers   ││          ││ Eventos de     ││
  ││ abiertos   ││          ││ seguridad      ││
  │└────────────┘│          │└────────────────┘│
  │┌────────────┐│          │┌────────────────┐│
  ││ Tasa de    ││          ││ Cambios en     ││
  ││ timeout    ││          ││ configuración  ││
  ││ elevada    ││          │└────────────────┘│
  │└────────────┘│          │                  │
  └──────────────┘          └──────────────────┘
```

---

## 6. Controles de Seguridad

### Matriz integral de controles

```
┌──────────┬─────────────────────┬──────────────────┬────────────────┐
│  FASE    │    CONTROL          │   HERRAMIENTA    │    MÉTRICA     │
├──────────┼─────────────────────┼──────────────────┼────────────────┤
│DESARROLLO│ Code Review Manual  │ GitHub/GitLab    │ Issues/Review  │
│          │ SAST                │ SonarQube        │ Vulnerabilities│
│          │ Análisis Estático   │ Checkmarx        │ Findings       │
│          │ Linting             │ ESLint/Pylint    │ Violations     │
├──────────┼─────────────────────┼──────────────────┼────────────────┤
│COMPILACIÓN│ DAST Temprano       │ OWASP ZAP        │ Issues         │
│          │ Dependency Check    │ Snyk/Trivy       │ Vulns          │
│          │ Container Scan      │ Grype            │ Image issues   │
│          │ Tests Unitarios     │ pytest/JUnit     │ Coverage %     │
├──────────┼─────────────────────┼──────────────────┼────────────────┤
│RUNTIME   │ WAF Rules           │ ModSecurity      │ Blocked        │
│          │ Circuit Breaker     │ Resilience4j     │ Cascades       │
│          │ Timeout Enforcement │ Spring           │ Aborted ops    │
│          │ Monitoreo Runtime   │ Datadog/New Relic│ Exception rate │
├──────────┼─────────────────────┼──────────────────┼────────────────┤
│OPERACIÓN │ Log Aggregation     │ ELK/Splunk       │ Logs ingested  │
│          │ Alerting            │ Prometheus       │ Alerts fired   │
│          │ Análisis Patrones   │ ML-based tools   │ TTD (mins)     │
│          │ Chaos Engineering   │ Chaos Toolkit    │ Resiliencia    │
└──────────┴─────────────────────┴──────────────────┴────────────────┘
```

---

## 7. Conclusiones

### Puntos clave para recordar

A10:2025 - Mishandling of Exceptional Conditions es una vulnerabilidad crítica en entornos modernos de **Cloud y DevSecOps** porque:

1. **Complejidad Distribuida**: Múltiples servicios sin manejo centralizado amplían exponencialmente el riesgo
2. **Automatización CI/CD**: Los pipelines pueden propagar vulnerabilidades rápidamente a producción
3. **Escalabilidad en Cloud**: Fallos sin captura causan cascadas catastróficas en arquitecturas distribuidas
4. **Observabilidad Distribuida**: Logs distribuidos sin correlación hacen difícil detectar patrones maliciosos
5. **Información Sensible**: Stack traces pueden exponer información valiosa para ataques posteriores

### Modelo de evolución continua

```
┌─────────────────────────────────────────────────────────┐
│         CICLO CONTINUO DE MEJORA (PDCA)                │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  PLAN (Planificación)                                   │
│  └─ Identificar vulnerabilidades de excepciones         │
│  └─ Establecer objetivos de seguridad                  │
│  └─ Diseñar controles                                  │
│                    ↓                                    │
│  DO (Ejecución)                                         │
│  └─ Implementar controles                              │
│  └─ Desplegar en staging                              │
│  └─ Ejecutar tests                                     │
│                    ↓                                    │
│  CHECK (Verificación)                                   │
│  └─ Monitorear métricas                               │
│  └─ Analizar patrones de excepciones                  │
│  └─ Recolectar feedback                               │
│                    ↓                                    │
│  ACT (Actuar)                                           │
│  └─ Ajustar basado en aprendizajes                    │
│  └─ Actualizar playbooks                              │
│  └─ Entrenar al equipo                                │
│                    │                                    │
│                    └──────────────────────────────────→ │
│                     (Siguiente iteración)               │
│                                                          │
└─────────────────────────────────────────────────────────┘
```









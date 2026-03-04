### Integrantes
1. Marcelo Desalvador.
2. Daniel cardenas.
3. Miguel Muñoz.
4. Damian Gonzalez.

# Análisis de Vulnerabilidades en el OWASP Top 10: Métodos de Explotación y Prevención
<p align="center">
<img src="./Imagenes/logoOWASP.png" alt="Alt text" width="150" height="50" style="display: block; margin-left: auto; margin-right: auto;">
</p>
## ¿Qué es OWASP?

OWASP es el acrónimo de Open Worldwide Application Security Project, una fundación sin fines de lucro dedicada a mejorar la seguridad de las aplicaciones web y software mediante recursos abiertos y colaborativos. Se originó en 2001 como un proyecto comunitario y se convirtió en fundación en 2004, promoviendo prácticas seguras en el desarrollo de software.

OWASP surgió para identificar vulnerabilidades comunes en aplicaciones web y ofrecer herramientas gratuitas a desarrolladores y organizaciones. Su misión principal es fomentar la concienciación, educación y mejores prácticas en ciberseguridad, con una comunidad global de voluntarios y expertos.
<br>
<br>
<br>

## TOP 10 OWASP - 2025
<p align="center">
<img src="./Imagenes/top10.jpg" alt="Alt text" width="150" height="50" style="display: block; margin-left: auto; margin-right: auto;">
</p>
1. A01:2025 - Broken Access Control
2. A02:2025 - Security Misconfiguration
3. A03:2025 - Software Supply Chain Failures
4. A04:2025 - Cryptographic Failures
5. A05:2025 - Injection
6. A06:2025 - Insecure Design
7. A07:2025 - Authentication Failures
8. A08:2025 - Software or Data Integrity Failures
9. A09:2025 - Security Logging and Alerting Failures
10. A10:2025 - Mishandling of Exceptional Conditions

## Descripción de Vulnerabilidades TOP 10 OWASP - 2025 
<p align="center">
<img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjMwaGdiZDhjaGRidWc5c3dqdWo4cHk5cG5xOHpvaW9va2VkaHRjciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SF5MyECNTsEBGm0Hx3/giphy.gif" width=100 style="display: block; margin-left: auto; margin-right: auto;">
</p>
### 1. A01:2025 - Broken Access Control
<br>
<br>
<p align="center">
<img src="./Imagenes/Broken_Access_Control.jpg" alt="Alt text" width="250" height="150" style="display: block; margin-left: auto; margin-right: auto;">
</p>
<br>
<br>
Se refiere a debilidades en los mecanismos que regulan los permisos de los usuarios dentro de una aplicación. Estas fallas permiten que una persona acceda a recursos, datos o funcionalidades que no le corresponden, pudiendo visualizar, modificar o ejecutar acciones fuera de los límites establecidos, lo que pone en riesgo la seguridad y la integridad del sistema.

**Métodos de Explotación:**

- Manipulación de parámetros (Parameter Tampering): Modificar valores en la URL, formularios o solicitudes para acceder a recursos de otros usuarios.
- Referencias directas inseguras (IDOR): Cambiar un identificador (ej. ID de usuario) para visualizar o editar información que no corresponde.
- Escalada de privilegios: Obtener permisos superiores a los asignados, como acceso administrativo.
- Omisión de validaciones en backend: Aprovechar que el control de acceso solo está implementado en el frontend.
- Acceso indebido a APIs: Consumir endpoints (POST, PUT, DELETE) sin validación adecuada de rol o autenticación.
- Manipulación de tokens (JWT/cookies): Alterar, reutilizar o falsificar tokens para elevar privilegios.
- Forzado de navegación: Acceder manualmente a rutas restringidas escribiendo directamente la URL.
- Configuración insegura de CORS: Permitir solicitudes desde orígenes no autorizados hacia APIs protegidas.

**Prevención y mitigación:**

- Implementar los controles de acceso en el lado del servidor, donde no puedan ser manipulados por el usuario.
- Aplicar el principio de “denegar por defecto”, permitiendo acceso solo cuando esté explícitamente autorizado.
- Centralizar y reutilizar los mecanismos de autorización en toda la aplicación.
- Asegurar que los usuarios solo puedan acceder o modificar sus propios recursos, respetando límites de negocio.
- Deshabilitar listados de directorios y eliminar archivos sensibles o de respaldo del entorno público.
- Registrar y monitorear intentos fallidos de acceso para detectar comportamientos sospechosos.
- Implementar limitación de velocidad (rate limiting) para reducir ataques automatizados.
- Gestionar correctamente las sesiones y tokens (invalidar sesiones al cerrar sesión y usar JWT de corta duración).
- Utilizar frameworks o patrones de seguridad reconocidos que faciliten controles de acceso robustos.

### 2. A02:2025 – Security Misconfiguration
<br>
<br>
<p align="center">
<img src="./Imagenes/Security Misconfiguration.jpg" alt="Alt text" width="250" height="200" style="display: block; margin-left: auto; margin-right: auto;">
</p>
<br>
<br>

Ocurre cuando una aplicación, servidor o servicio está configurado de forma incorrecta o insegura. Incluye configuraciones por defecto, servicios innecesarios habilitados, permisos excesivos, cabeceras de seguridad ausentes o configuraciones inconsistentes entre entornos.

**Métodos de Explotación:**
- Acceso a paneles administrativos expuestos sin autenticación o con credenciales por defecto.
- Explotación de servicios innecesarios o puertos abiertos.
- Uso de configuraciones débiles en servidores web (CORS permisivo, falta de HTTPS, cabeceras inseguras).
- Acceso a archivos sensibles por permisos incorrectos (logs, backups, .env).
- Enumeración de información sensible por mensajes de error detallados.

**Prevención y mitigación:**

- Deshabilitar servicios, puertos y funcionalidades no necesarias.
- Aplicar configuraciones seguras por defecto (principio de “secure by default”).
- Implementar HTTPS, cabeceras de seguridad y políticas de CORS estrictas.
- Estandarizar configuraciones entre entornos (dev, QA, prod).
- Revisar permisos de archivos y carpetas.
- Automatizar auditorías de configuración con herramientas como CIS Benchmarks o scanners de configuración.


### 3. A03:2025 – Software Supply Chain Failures
<br>
<br>
<p align="center">
<img src="./Imagenes/Software Supply Chain Failures.png" alt="Alt text" width="400" height="100" style="display: block; margin-left: auto; margin-right: auto;">
</p>
<br>
<br>
Riesgos derivados de depender de componentes externos (librerías, paquetes, contenedores, repositorios) que pueden estar comprometidos, desactualizados o manipulados. La cadena de suministro incluye todo lo que la aplicación consume para funcionar.

**Métodos de Explotación:**

- Inyección de código malicioso en paquetes populares (ataques tipo dependency hijacking).
- Publicación de versiones falsas o maliciosas de librerías legítimas (typosquatting).
- Compromiso de repositorios o pipelines de CI/CD.
- Uso de imágenes de contenedor con malware o vulnerabilidades conocidas.
- Manipulación de dependencias transitivas que el desarrollador no revisa.

**Prevención y mitigación:**

- Usar repositorios confiables y firmar dependencias.
- Implementar análisis de composición de software (SCA) para detectar vulnerabilidades.
- Mantener dependencias actualizadas y eliminar las no utilizadas.
- Usar imágenes de contenedor oficiales y escaneadas.
- Aplicar controles de seguridad en CI/CD (firmas, validación, revisión de cambios).
- Implementar SBOM (Software Bill of Materials) para tener trazabilidad completa.


### 4. A04:2025 - Cryptographic Failures
<br>
<br>
<p align="center">
<img src="./Imagenes/Cryptographic Failures.png" alt="Alt text" width="110" height="110" style="display: block; margin-left: auto; margin-right: auto;">
</p>
<br>
<br>
Los fallos criptográficos abordan los riesgos derivados de una implementación incorrecta o insuficiente de controles de cifrado para proteger información sensible. Incluye el uso de protocolos inseguros, algoritmos débiles, configuraciones inadecuadas o la ausencia de cifrado en datos críticos. Estas deficiencias pueden facilitar la exposición o alteración de información confidencial, comprometiendo la seguridad de los sistemas y la protección de los datos.

**Métodos de Explotación:**

- Intercepción de comunicaciones (Man-in-the-Middle – MITM): Captura del tráfico cuando se utilizan protocolos inseguros o configuraciones débiles, permitiendo leer información sensible.
- Descifrado de información por uso de algoritmos débiles: Aprovechamiento de cifrados obsoletos o mal implementados para romper la protección y acceder a datos confidenciales.
- Ataques de downgrade criptográfico: Forzar al sistema a utilizar versiones antiguas e inseguras de TLS/SSL para facilitar su explotación.
- Suplantación mediante certificados inválidos o mal configurados: Permite que un atacante se haga pasar por un servidor legítimo.
- Exposición de datos sin cifrado en reposo: Acceso directo a información sensible almacenada sin protección adecuada.
- Compromiso de claves criptográficas: Obtención de claves mal almacenadas o gestionadas para descifrar o manipular datos protegidos.

**Prevención y mitigación:**

- Clasificar y proteger los datos sensibles, asegurando controles proporcionales a su nivel de criticidad.
- Evitar almacenar información confidencial innecesaria y aplicar tokenización o truncamiento cuando sea posible.
- Cifrar los datos en reposo y en tránsito, utilizando protocolos seguros (TLS 1.2 o superior) y configuraciones robustas como HSTS.
- Usar algoritmos criptográficos modernos y evitar tecnologías obsoletas (ej. MD5, SHA1, CBC, TLS antiguos).
- Implementar una gestión segura de claves, almacenándolas en HSM cuando sea posible y generándolas de forma aleatoria.
- Proteger adecuadamente las contraseñas, empleando funciones de hash adaptativas como Argon2, Scrypt o PBKDF2.
- Utilizar cifrado autenticado y fuentes de aleatoriedad criptográficamente seguras (CSPRNG).
- Deshabilitar protocolos inseguros (FTP, SMTP sin cifrado, STARTTLS).
- Revisar periódicamente configuraciones criptográficas con especialistas o herramientas automatizadas.


### 5. A05:2025 – Inyección
<br>
<br>
<p align="center">
<img src="./Imagenes/Inyección.jpg" alt="Alt text" width="110" height="90" style="display: block; margin-left: auto; margin-right: auto;">
</p>
<br>
<br>
Una vulnerabilidad de inyección es una falla de la aplicación que permite que una entrada de usuario no confiable se envíe a un intérprete (por ejemplo, un navegador, una base de datos, la línea de comandos) y hace que el intérprete ejecute partes de esa entrada como comandos.
Una aplicación es vulnerable a ataques cuando:

- La aplicación no valida, filtra ni desinfecta los datos proporcionados por el usuario.
- Las consultas dinámicas o las llamadas no parametrizadas sin escape consciente del contexto se utilizan directamente en el intérprete.
- Los datos no desinfectados se utilizan dentro de los parámetros de búsqueda de mapeo relacional de objetos (ORM) para extraer registros confidenciales adicionales.
- Los datos potencialmente hostiles se utilizan o concatenan directamente. El SQL o comando contiene la estructura y los datos maliciosos en consultas dinámicas, comandos o procedimientos almacenados.

Algunas de las inyecciones más comunes son SQL, NoSQL, comando del sistema operativo, mapeo relacional de objetos (ORM), LDAP e inyección de lenguaje de expresión (EL) o biblioteca de navegación de gráficos de objetos (OGNL). El concepto es idéntico entre todos los intérpretes. La detección se logra mejor mediante una combinación de revisión del código fuente junto con pruebas automatizadas (incluido el fuzzing) de todos los parámetros, encabezados, URL, cookies, JSON, SOAP y entradas de datos XML. La adición de herramientas de prueba de seguridad de aplicaciones estáticas (SAST), dinámicas (DAST) e interactivas (IAST) al flujo de CI/CD también puede ser útil para identificar fallas de inyección antes de la implementación de producción.

**Métodos de Explotación:**

##### 1. SQL Injection Clásico
Manipulación directa de consultas SQL.

Ejemplo: ' OR '1'='1
Impacto:

- Bypass de autenticación
- Extracción de bases de datos
- Modificación de registros


##### 2. Blind SQL Injection
No devuelve resultados visibles, pero se basa en:
- Respuestas booleanas (TRUE/FALSE)
- Diferencias en tiempos de respuesta
Ejemplo: ' AND IF(1=1, SLEEP(5), 0) –
Impacto:
- Extracción de información carácter por carácter

##### 3. Command Injection
El atacante ejecuta comandos del sistema operativo.
Ejemplo: ; cat /etc/passwd
Impacto:
- Ejecución remota de comandos
- Control total del servidor

##### 4. NoSQL Injection
Manipulación de consultas en bases MongoDB.
Ejemplo: { "$ne": null }

**Prevención y mitigación:**

##### 1. Uso de Consultas Parametrizadas (Prepared Statements)
Separan datos de la lógica SQL.

```python
# Ejemplo seguro en Python:

cursor.execute(
    "SELECT * FROM users WHERE username = %s AND password = %s",
    (username, password)
)
```

##### 2. ORM Seguro
Frameworks que reducen riesgo si se usan correctamente:
- Hibernate
- Entity Framework
- Sequelize
- Django ORM

##### 3. Validación Estricta de Entrada
- Listas blancas
- Restricción de longitud
- Validación por tipo
- Sanitización de caracteres especiales

##### 4. Principio de Mínimo Privilegio
El usuario de base de datos:
- No debe tener permisos DROP
- No debe tener privilegios administrativos
- Debe estar segmentado por roles

##### 5. Web Application Firewall (WAF)
Detecta patrones de inyección conocidos.
 Importante:
El WAF es una capa adicional, no sustituye el desarrollo seguro.

##### 6. Pruebas Continuas en DevSecOps
Implementar:
- SAST (Static Application Security Testing)
- DAST (Dynamic Testing)
- SCA (Software Composition Analysis)
- Pentesting periódico

**Conclusión:**

Injection sigue siendo una de las vulnerabilidades más explotadas porque depende directamente de malas prácticas de desarrollo.
La mitigación efectiva requiere un enfoque en múltiples capas:
- Diseño seguro
- Desarrollo seguro
- Configuración adecuada
- Monitoreo continuo
- Gobernanza de seguridad
En un entorno corporativo maduro, la prevención de Injection debe integrarse dentro del SDLC bajo un modelo DevSecOps, combinando controles técnicos, pruebas automatizadas y gestión de riesgos.


### 6. A06:2025 Diseño inseguro
<br>
<br>
<p align="center">
<img src="./Imagenes/DisenoInseguro.png" alt="Alt text" width="200" height="100" style="display: block; margin-left: auto; margin-right: auto;">
</p>
<br>
<br>
El diseño inseguro es una categoría amplia que representa diferentes debilidades, expresadas como “diseño de control faltante o ineficaz” El diseño inseguro no es la fuente de todas las demás diez categorías de riesgo principales. Tenga en cuenta que existe una diferencia entre diseño inseguro e implementación insegura. Diferenciamos entre fallas de diseño y defectos de implementación por una razón: tienen diferentes causas fundamentales, ocurren en diferentes momentos del proceso de desarrollo y tienen diferentes remediaciones. Un diseño seguro aún puede tener defectos de implementación que generen vulnerabilidades que pueden ser explotadas. Un diseño inseguro no se puede solucionar con una implementación perfecta, ya que nunca se crearon los controles de seguridad necesarios para defenderse de ataques específicos. Uno de los factores que contribuye al diseño inseguro es la falta de perfiles de riesgo empresarial inherentes al software o sistema que se está desarrollando y, por tanto, la imposibilidad de determinar qué nivel de diseño de seguridad se requiere.

Tres partes clave para tener un diseño seguro son:
- Recopilación de requisitos y gestión de recursos
- Creando un diseño seguro
- Tener un ciclo de vida de desarrollo seguro
 
**Requisitos y gestión de recursos**

Recopilar y negociar los requisitos comerciales para una aplicación con la empresa, incluidos los requisitos de protección relacionados con la confidencialidad, integridad, disponibilidad y autenticidad de todos los activos de datos y la lógica comercial esperada. Tenga en cuenta qué tan expuesta estará su aplicación y si necesita segregación de inquilinos (más allá de los necesarios para el control de acceso). Recopilar los requisitos técnicos, incluidos los requisitos de seguridad funcionales y no funcionales. Planificar y negociar el presupuesto que cubra todo el diseño, construcción, pruebas y operación, incluidas las actividades de seguridad.

**Diseño seguro**

El diseño seguro es una cultura y metodología que evalúa constantemente las amenazas y garantiza que el código esté diseñado y probado de manera sólida para prevenir métodos de ataque conocidos. El modelado de amenazas debe integrarse en sesiones de refinamiento (o actividades similares); busque cambios en los flujos de datos y en el control de acceso u otros controles de seguridad. En el desarrollo de la historia del usuario, determine el flujo correcto y los estados de falla, asegúrese de que sean bien comprendidos y acordados por las partes responsables e afectadas. Analizar los supuestos y condiciones de los flujos esperados y de falla para garantizar que sigan siendo precisos y deseables. Determinar cómo validar los supuestos y hacer cumplir las condiciones necesarias para un comportamiento adecuado. Asegúrese de que los resultados estén documentados en la historia del usuario. Aprenda de los errores y ofrezca incentivos positivos para promover mejoras.El diseño seguro no es un complemento ni una herramienta que puedas agregar al software.

**Ciclo de vida del desarrollo seguro**

El software seguro requiere un ciclo de vida de desarrollo seguro, un patrón de diseño seguro, una metodología de carreteras pavimentadas, una biblioteca de componentes segura, herramientas apropiadas, modelos de amenazas y autopsias de incidentes que se utilizan para mejorar el proceso. Comuníquese con sus especialistas en seguridad al comienzo de un proyecto de software, durante todo el proyecto y para realizar un mantenimiento continuo del software. Considere aprovechar el Modelo de madurez de garantía de software OWASP (SAMM) para ayudarle a estructurar sus esfuerzos de desarrollo de software seguro.

A menudo se subestima la autorresponsabilidad de los desarrolladores. Fomentar una cultura de concientización, responsabilidad y mitigación proactiva de riesgos. Los intercambios regulares sobre seguridad (por ejemplo, durante las sesiones de modelado de amenazas) pueden generar una mentalidad para incluir la seguridad en todas las decisiones de diseño importantes.


**Métodos de Explotación:**

##### 1. Abuso de Lógica de Negocio
El atacante no rompe el sistema, simplemente usa la lógica a su favor.

Ejemplo:
Una tienda permite aplicar cupones múltiples veces.
Un atacante automatiza el proceso y obtiene productos gratis.
Impacto:
- Pérdidas económicas
- Fraude masivo

##### 2. Fuerza Bruta por Falta de Rate Limiting
Si el diseño no contempla:
- Límite de intentos
- Bloqueo temporal
- Captcha
Un atacante puede automatizar millones de intentos.
Herramientas usadas:
- Hydra
- Burp Intruder
- Scripts automatizados

##### 3. Escalamiento de Privilegios por Diseño Deficiente
Ejemplo:
Un usuario puede modificar el parámetro:
role=user
a
role=admin
Si el backend confía en ese parámetro, el atacante obtiene privilegios administrativos.

##### 4. Falta de Validación de Flujos Críticos
Ejemplo:
Sistema de pago que no valida estado previo.
Un atacante puede:
•	Saltarse el paso de pago
•	Acceder directamente a confirmación
Esto no es un bug técnico, es un error en el flujo diseñado.

**Mitigación y prevención**

- Establecer y utilizar un ciclo de vida de desarrollo seguro con profesionales de AppSec para ayudar a evaluar y diseñar controles relacionados con la seguridad y la privacidad
- Establecer y utilizar una biblioteca de patrones de diseño seguros o componentes de carreteras pavimentadas
- Utilice modelos de amenazas para partes críticas de la aplicación, como autenticación, control de acceso, lógica empresarial y flujos de claves
- Modelado de amenazas a usuarios como herramienta educativa para generar una mentalidad de seguridad
- Integre lenguaje y controles de seguridad en las historias de usuario
- Integre comprobaciones de plausibilidad en cada nivel de su aplicación (desde el frontend hasta el backend)
- Escriba pruebas unitarias y de integración para validar que todos los flujos críticos sean resistentes al modelo de amenaza. Compilar casos de uso y casos de mal uso para cada nivel de su aplicación.
- Segregar capas de niveles en las capas del sistema y de la red, según las necesidades de exposición y protección
- Segregar a los inquilinos de manera sólida por diseño en todos los niveles


**Conclusión:**

Insecure Design representa una falla estratégica en la concepción del sistema.
No puede mitigarse únicamente con WAF, parches o actualizaciones.
Requiere:
- Cultura de seguridad
- Gobernanza
- Arquitectura segura
- Gestión de riesgos
- Integración DevSecOps

### 7. A07:2025 – Authentication Failures
<br>
<br>
<p align="center">
<img src="./Imagenes/Authentication Failures.png" alt="Alt text" width="250" height="120" style="display: block; margin-left: auto; margin-right: auto;">
</p>
<br>
<br>

Fallas en los mecanismos de autenticación que permiten a un atacante suplantar identidades o acceder sin autorización. Incluye contraseñas débiles, sesiones inseguras, MFA ausente o validaciones incorrectas.

**Métodos de Explotación:**

- Fuerza bruta o ataques de diccionario contra formularios de login.
- Credential stuffing usando credenciales filtradas.
- Secuestro de sesión por cookies inseguras o sin protección.
- Bypass de autenticación por validaciones incorrectas en el backend.
- Reutilización de tokens o sesiones caducadas.

**Prevención y mitigación:**

- Implementar MFA obligatorio.
- Usar contraseñas fuertes y políticas de bloqueo ante intentos fallidos.
- Proteger cookies con HttpOnly, Secure, SameSite.
- Validar autenticación en backend, no solo en frontend.
- Rotar tokens y expirar sesiones inactivas.
- Monitorear intentos de login sospechosos.

### 8. A08:2025 – Software or Data Integrity Failures
<br>
<br>
<p align="center">
<img src="./Imagenes/Software or Data Integrity Failures.png" alt="Alt text" width="250" height="120" style="display: block; margin-left: auto; margin-right: auto;">
</p>
<br>
<br>
Fallas que ocurren cuando el software o los datos pueden ser modificados sin autorización. Incluye manipulación de actualizaciones, datos no validados, pipelines inseguros o falta de verificación de integridad.

**Métodos de Explotación:**

- Inyección de código en actualizaciones automáticas sin firma.
- Manipulación de datos enviados al servidor sin validación.
- Alteración de archivos de configuración o scripts en pipelines.
- Modificación de datos en tránsito sin cifrado.
- Uso de variables de entorno manipuladas para alterar comportamientos.

**Prevención y mitigación:**

- Firmar código, paquetes y actualizaciones.
- Validar y sanitizar todos los datos de entrada.
- Proteger pipelines CI/CD con controles de acceso y firmas.
- Usar cifrado TLS para proteger datos en tránsito.
- Implementar controles de integridad (hashes, checksums, HMAC).
- Restringir permisos de escritura en archivos críticos.

### 9. A09:2025 – Security Logging and Alerting Failures
<br>
<br>
<p align="center">
<img src="./Imagenes/Security Logging and Alerting Failures.jpeg" alt="Alt text" width="200" height="90" style="display: block; margin-left: auto; margin-right: auto;">
</p>
<br>
<br>
Fallas en la generación, almacenamiento o monitoreo de logs que impiden detectar ataques, responder a incidentes o realizar auditorías. Incluye falta de logs, logs incompletos o alertas inexistentes.

**Métodos de Explotación:**

- Ocultamiento de actividades maliciosas al no existir registros.
- Borrado o manipulación de logs por permisos incorrectos.
- Explotación prolongada sin detección por falta de alertas.
- Escalada de privilegios sin trazabilidad.
- Uso de errores silenciosos para evadir controles.

**Prevención y mitigación:**

- Registrar eventos críticos: autenticación, cambios de permisos, errores, accesos a datos sensibles.
- Proteger logs contra modificación o borrado.
- Implementar alertas en tiempo real (SIEM, IDS/IPS).
- Centralizar logs para evitar pérdida o manipulación.
- Revisar periódicamente los registros y correlacionar eventos.
- Cumplir estándares como ISO 27001 o NIST para logging.

### 10. A10:2025 – Mishandling of Exceptional Conditions
<br>
<br>
<p align="center">
<img src="./Imagenes/Mishandling of Exceptional Conditions.png" alt="Alt text" width="140" height="90" style="display: block; margin-left: auto; margin-right: auto;">
</p>
<br>
<br>
Fallas al manejar errores, excepciones o condiciones inesperadas. Cuando una aplicación no controla adecuadamente estos escenarios, puede filtrar información sensible, quedar en estados inseguros o permitir comportamientos no previstos.

**Métodos de Explotación:**

- Forzar errores para obtener información sensible (stack traces, rutas, configuraciones).
- Provocar fallos que dejen la aplicación en un estado inseguro.
- Explotar condiciones de carrera o estados inconsistentes.
- Manipular entradas para generar excepciones no controladas.
- Usar errores silenciosos para evadir validaciones.

**Prevención y mitigación:**

- Implementar manejo centralizado de errores.
- Evitar mostrar mensajes detallados al usuario final.
- Registrar errores internamente sin exponer información sensible.
- Validar entradas para evitar excepciones inesperadas.
- Diseñar la aplicación para fallar de forma segura (fail-safe).
- Realizar pruebas de estrés, caos y escenarios inesperados.

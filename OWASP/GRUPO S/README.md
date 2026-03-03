### Integrantes
1. Marcelo Desalvador
2. Daniel cardenas
3. Miguel Muñoz
4. Damian Gonzalez
<br>
<br>

## Análisis de Vulnerabilidades en el OWASP Top 10: Métodos de Explotación y Prevención
<br>
<img src="./Imagenes/logoOWASP.png" alt="Alt text" width="150" height="50">

#### Que es OWASP
<br>

OWASP es el acrónimo de Open Worldwide Application Security Project, una fundación sin fines de lucro dedicada a mejorar la seguridad de las aplicaciones web y software mediante recursos abiertos y colaborativos. Se originó en 2001 como un proyecto comunitario y se convirtió en fundación en 2004, promoviendo prácticas seguras en el desarrollo de software.
<br>

OWASP surgió para identificar vulnerabilidades comunes en aplicaciones web y ofrecer herramientas gratuitas a desarrolladores y organizaciones. Su misión principal es fomentar la concienciación, educación y mejores prácticas en ciberseguridad, con una comunidad global de voluntarios y expertos.
<br>
<br>
<br>

#### TOP 10 OWASP - 2025
<br>
<img src="./Imagenes/top10.jpg" alt="Alt text" width="150" height="50">
<br>
<br>

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
<br>
<br>

#### Descripción de Vulnerabilidades TOP 10 OWASP - 2025 
<br>
<img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjMwaGdiZDhjaGRidWc5c3dqdWo4cHk5cG5xOHpvaW9va2VkaHRjciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SF5MyECNTsEBGm0Hx3/giphy.gif" width=50>
<br>
<br>

1. A01:2025 - Broken Access Control
<br>
Se refiere a debilidades en los mecanismos que regulan los permisos de los usuarios dentro de una aplicación. Estas fallas permiten que una persona acceda a recursos, datos o funcionalidades que no le corresponden, pudiendo visualizar, modificar o ejecutar acciones fuera de los límites establecidos, lo que pone en riesgo la seguridad y la integridad del sistema.
<br>
<br>
**Métodos de Explotación**

<br>
<br>

- Manipulación de parámetros (Parameter Tampering): Modificar valores en la URL, formularios o solicitudes para acceder a recursos de otros usuarios.
- Referencias directas inseguras (IDOR): Cambiar un identificador (ej. ID de usuario) para visualizar o editar información que no corresponde.
- Escalada de privilegios: Obtener permisos superiores a los asignados, como acceso administrativo.
- Omisión de validaciones en backend: Aprovechar que el control de acceso solo está implementado en el frontend.
- Acceso indebido a APIs: Consumir endpoints (POST, PUT, DELETE) sin validación adecuada de rol o autenticación.
- Manipulación de tokens (JWT/cookies): Alterar, reutilizar o falsificar tokens para elevar privilegios.
- Forzado de navegación: Acceder manualmente a rutas restringidas escribiendo directamente la URL.
- Configuración insegura de CORS: Permitir solicitudes desde orígenes no autorizados hacia APIs protegidas.
<br>
<br>
**Cómo prevenir**

<br>
<br>

- Implementar los controles de acceso en el lado del servidor, donde no puedan ser manipulados por el usuario.
- Aplicar el principio de “denegar por defecto”, permitiendo acceso solo cuando esté explícitamente autorizado.
- Centralizar y reutilizar los mecanismos de autorización en toda la aplicación.
- Asegurar que los usuarios solo puedan acceder o modificar sus propios recursos, respetando límites de negocio.
- Deshabilitar listados de directorios y eliminar archivos sensibles o de respaldo del entorno público.
- Registrar y monitorear intentos fallidos de acceso para detectar comportamientos sospechosos.
- Implementar limitación de velocidad (rate limiting) para reducir ataques automatizados.
- Gestionar correctamente las sesiones y tokens (invalidar sesiones al cerrar sesión y usar JWT de corta duración).
- Utilizar frameworks o patrones de seguridad reconocidos que faciliten controles de acceso robustos.

<br>
<br>
4. A04:2025 - Cryptographic Failures
<br>
Los fallos criptográficos abordan los riesgos derivados de una implementación incorrecta o insuficiente de controles de cifrado para proteger información sensible. Incluye el uso de protocolos inseguros, algoritmos débiles, configuraciones inadecuadas o la ausencia de cifrado en datos críticos. Estas deficiencias pueden facilitar la exposición o alteración de información confidencial, comprometiendo la seguridad de los sistemas y la protección de los datos.
<br>
<br>
**Métodos de Explotación**

<br>
<br>

- Intercepción de comunicaciones (Man-in-the-Middle – MITM): Captura del tráfico cuando se utilizan protocolos inseguros o configuraciones débiles, permitiendo leer información sensible.
- Descifrado de información por uso de algoritmos débiles: Aprovechamiento de cifrados obsoletos o mal implementados para romper la protección y acceder a datos confidenciales.
- Ataques de downgrade criptográfico: Forzar al sistema a utilizar versiones antiguas e inseguras de TLS/SSL para facilitar su explotación.
- Suplantación mediante certificados inválidos o mal configurados: Permite que un atacante se haga pasar por un servidor legítimo.
- Exposición de datos sin cifrado en reposo: Acceso directo a información sensible almacenada sin protección adecuada.
- Compromiso de claves criptográficas: Obtención de claves mal almacenadas o gestionadas para descifrar o manipular datos protegidos.
<br>
<br>
**Cómo prevenir**

<br>
<br>

- Clasificar y proteger los datos sensibles, asegurando controles proporcionales a su nivel de criticidad.
- Evitar almacenar información confidencial innecesaria y aplicar tokenización o truncamiento cuando sea posible.
- Cifrar los datos en reposo y en tránsito, utilizando protocolos seguros (TLS 1.2 o superior) y configuraciones robustas como HSTS.
- Usar algoritmos criptográficos modernos y evitar tecnologías obsoletas (ej. MD5, SHA1, CBC, TLS antiguos).
- Implementar una gestión segura de claves, almacenándolas en HSM cuando sea posible y generándolas de forma aleatoria.
- Proteger adecuadamente las contraseñas, empleando funciones de hash adaptativas como Argon2, Scrypt o PBKDF2.
- Utilizar cifrado autenticado y fuentes de aleatoriedad criptográficamente seguras (CSPRNG).
- Deshabilitar protocolos inseguros (FTP, SMTP sin cifrado, STARTTLS).
- Revisar periódicamente configuraciones criptográficas con especialistas o herramientas automatizadas.
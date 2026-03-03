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
El control de acceso aplica políticas que impiden a los usuarios actuar fuera de sus permisos previstos. Las fallas suelen provocar la divulgación no autorizada de información, la modificación o destrucción de todos los datos, o la realización de una función empresarial fuera de los límites del usuario. Las vulnerabilidades comunes del control de acceso incluyen:
<br>
<br>
    * Violación del principio de mínimo privilegio, comúnmente conocido como denegar por defecto, donde el acceso solo debe concederse a capacidades, roles o usuarios particulares, pero está disponible para cualquier persona.

    * Evitar los controles de acceso modificando la URL (manipulación de parámetros o navegación forzada), el estado interno de la aplicación o la página HTML, o utilizando una herramienta de ataque que modifique las solicitudes de API.

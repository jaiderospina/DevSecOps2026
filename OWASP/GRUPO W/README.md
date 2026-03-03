# INTEGRANTES

* Lady Bautista  
* Vicente Rueda  
* Juan Carlos Murcia  
* Juan Diaz
* Jonathan Garzon

# A03:2025 - Software Supply Chain Failures

![ssch](image/ssch.png)

## Que es

Las fallas en la cadena de suministro de un software(Software Supply Chain Failures) es cualquier compromiso o falla de los procesos, componentes o herramientas que intervente en la creación hasta la distribución o actualización del software. Esto incluyendo librerías, compilación, pipeline, artefactos y cualquier elemento en la cadena de suministro del software.

Desde su aparición en el **OWASP top 10 2013** con el nombre de **A9:Uso de componentes con vulnerabilidades conocidas** la categoría a evolucionado esto con el fin de abarcar no solo componentes sino las fallas o debilidades que se puedan presentar en la cadena de suministro.

esta categoría se base en dependencias y herramientas externas que el software requiere de manera directa o indirecta, esto incluyendo componentes obsoletos, no mantenidos o que tengan vulnerabilidades conocidas, pero no solo cubre estas área también compromisos como un paquete que ya contenga un malware o errores en procesos como la compilación o distribución.

De esa manera se puede intuir que las causas posible son dependencias sin versionamiento o inventario, no hacer una constante monitoreo de los componentes, herramientas o dependencias que depende el software, falta de controles en los artefactos generados, no actualizar dependencias, paquetes y herramientas entre otros fallos que se puedan presentar en la cadena de suministro.

Estas vulnerabilidades pueden permitir que un sistema sea completamente comprometido si un componente malicioso se ejecuta con los mismos permisos que la aplicación, lo que puede derivar en la exposición, alteración o indisponibilidad de datos, la distribución de software malicioso en entornos de desarrollo como npm, PyPI o Maven, y generar altos costos de recuperación además de afectar gravemente la reputación de la organización.

## Explotación

Los atacantes explotan la cadena de suministro comprometiendo cualquier punto entre el desarrollo y la distribución del software:

### Inyección o Envenenamiento de Dependencias

<img src="image/AngularDependency.png" width="500">

Se trata de meter código dañino en una librería o paquete que otros proyectos bajarán después. Esto se puede hacer subiendo versiones cambiadas o adueñándose de cuentas de responsables. Ya instalado, el código dañino funciona con los mismos permisos que la aplicación.

***Caso real***

<img src="image/npm.png" width="500">

el mayor y más peligroso compromiso de la cadena de suministro de npm de la historia

En 2025 se halló un ataque con software dañino en el sistema de npm que afectó a cientos de elementos JavaScript, incluyendo herramientas conocidas como @ctrl/tinycolor. El criminal añadió códigos dañinos que corren al instalarse, sacando credenciales y quedando dentro de procesos de CI/CD.

https://www.tomshardware.com/tech-industry/cyber-security/shai-hulud-malware-campaign-dubbed-the-largest-and-most-dangerous-npm-supply-chain-compromise-in-history-hundreds-of-javascript-packages-affected

#### Herramientas y técnicas utilizadas

| Herramienta / Plataforma | Uso en el ataque |
|--------------------------|-----------------|
| npm CLI | Publicación de versiones de paquetes alteradas |
| Node.js | Automatización de scripts maliciosos |
| Scripts `postinstall` / `preinstall` | Ejecución automática de código al instalar el paquete |
| Malware tipo stealer | Robo de credenciales del desarrollador |
| Tokens expuestos en CI/CD | Acceso no autorizado para publicar paquetes |
| curl / wget | Exfiltración de información hacia servidores del atacante |

### Confusión de Dependencias

El atacante sube a sitios públicos un paquete con igual nombre a una dependencia interna de una empresa. Si el sistema prefiere la fuente pública, instalará la versión dañina sin que el programador se dé cuenta.

***Caso real***

<img src="image/PyPIWatermark.png" width="500">

se descubrió un ataque de phishing dirigido a usuarios de PyPI por correo electrónico.

Publicación no autorizada de versiones de num2words en PyPI
En julio de 2025, se descubrió un envío en PyPI de la versión 0.5.15 del paquete num2words que no concordaba con el repositorio oficial de código (GitHub), lo cual sugirió una posible apropiación de la cuenta del mantenedor y un envío malicioso de la librería.

https://blog.pypi.org/posts/2025-07-31-incident-report-phishing-attack/

#### Herramientas y técnicas utilizadas

| Herramienta / Plataforma | Uso en el ataque |
|--------------------------|-----------------|
| npm / PyPI / Maven | Publicación de paquetes con nombres idénticos a dependencias internas |
| Archivos `package.json`, `requirements.txt`, `pom.xml` | Identificación de nombres de dependencias privadas |
| Scripts automatizados | Búsqueda masiva de nombres de paquetes internos |
| Servidores HTTP | Recepción de datos enviados por sistemas comprometidos |

### Riesgo del pipeline CI/CD

Se entra a servidores de integración y despliegue continuo para cambiar el modo en que se crea el programa. Aunque el código original sea bueno, el resultado final puede tener trampas o instrucciones escondidas.

#### Cambio de artefactos

Se cambian archivos o paquetes en sitios mal protegidos. Si no se mira que todo esté bien con firmas digitales o claves, el software malo se reparte como si fuera bueno.

#### Aprovechar componentes antiguos

Los atacantes usan fallos conocidos en dependencias sin arreglar para ejecutar código a distancia, subir permisos o entrar a información privada.
# INTEGRANTES

* Lady Bautista  
* Vicente Rueda  
* Juan Carlos Murcia  
* Juan Diaz
* Jonathan Garzon

# A03:2025 - Software Supply Chain Failures

![ssch](image\ssch.png)

## Que es

Las fallas en la cadena de suministro de un software(Software Supply Chain Failures) es cualquier compromiso o falla de los procesos, componentes o herramientas que intervente en la creación hasta la distribución o actualización del software. Esto incluyendo librerías, compilación, pipeline, artefactos y cualquier elemento en la cadena de suministro del software.

Desde su aparición en el **OWASP top 10 2013** con el nombre de **[A9:Uso de componentes con vulnerabilidades conocidas]** la categoría a evolucionado esto con el fin de abarcar no solo componentes sino las fallas o debilidades que se puedan presentar en la cadena de suministro.

esta categoría se base en dependencias y herramientas externas que el software requiere de manera directa o indirecta, esto incluyendo componentes obsoletos, no mantenidos o que tengan vulnerabilidades conocidas, pero no solo cubre estas área también compromisos como un paquete que ya contenga un malware o errores en procesos como la compilación o distribución.

De esa manera se puede intuir que las causas posible son dependencias sin versionamiento o inventario, no hacer una constante monitoreo de los componentes, herramientas o dependencias que depende el software, falta de controles en los artefactos generados, no actualizar dependencias, paquetes y herramientas entre otros fallos que se puedan presentar en la cadena de suministro.

Estas vulnerabilidades pueden permitir que un sistema sea completamente comprometido si un componente malicioso se ejecuta con los mismos permisos que la aplicación, lo que puede derivar en la exposición, alteración o indisponibilidad de datos, la distribución de software malicioso en entornos de desarrollo como npm, PyPI o Maven, y generar altos costos de recuperación además de afectar gravemente la reputación de la organización.

## Explotación

Los atacantes explotan la cadena de suministro comprometiendo cualquier punto entre el desarrollo y la distribución del software:

### Inyección o Envenenamiento de Dependencias

![Dependecy](image\AngularDependency.png)

Se trata de meter código dañino en una librería o paquete que otros proyectos bajarán después. Esto se puede hacer subiendo versiones cambiadas o adueñándose de cuentas de responsables. Ya instalado, el código dañino funciona con los mismos permisos que la aplicación.

***Casos reales***

![npm](image/npm.png)

el mayor y más peligroso compromiso de la cadena de suministro de npm de la historia

En 2025 se halló un ataque con software dañino en el sistema de npm que afectó a cientos de elementos JavaScript, incluyendo herramientas conocidas como @ctrl/tinycolor. El criminal añadió códigos dañinos que corren al instalarse, sacando credenciales y quedando dentro de procesos de CI/CD.

https://www.tomshardware.com/tech-industry/cyber-security/shai-hulud-malware-campaign-dubbed-the-largest-and-most-dangerous-npm-supply-chain-compromise-in-history-hundreds-of-javascript-packages-affected

### Confusión de Dependencias

El atacante sube a sitios públicos un paquete con igual nombre a una dependencia interna de una empresa. Si el sistema prefiere la fuente pública, instalará la versión dañina sin que el programador se dé cuenta.

### Riesgo del pipeline CI/CD

Se entra a servidores de integración y despliegue continuo para cambiar el modo en que se crea el programa. Aunque el código original sea bueno, el resultado final puede tener trampas o instrucciones escondidas.

#### Cambio de artefactos

Se cambian archivos o paquetes en sitios mal protegidos. Si no se mira que todo esté bien con firmas digitales o claves, el software malo se reparte como si fuera bueno.

#### Aprovechar componentes antiguos

Los atacantes usan fallos conocidos en dependencias sin arreglar para ejecutar código a distancia, subir permisos o entrar a información privada.
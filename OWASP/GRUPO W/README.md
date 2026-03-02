#INTEGRANTES

Lady Bautista  
Vicente Rueda  
Juan Carlos Murcia  
Juan Diaz 
Jonathan Garzon


#  A03:2025 - Software Supply Chain Failures

![](image\ssch.png)

## Que es
Las fallas en la cadena de suministro de un software(Software Supply Chain Failures) es cualquier compromiso o falla de los procesos, componentes o herramientas que intervente en la creación hasta la distribución o actualización del software. Esto incluyendo librerías, compilación, pipeline, artefactos y cualquier elemento en la cadena de suministro del software.

Desde su aparición en el **OWASP top 10 2013** con el nombre de **[A9:Uso de componentes con vulnerabilidades conocidas]** la categoría a evolucionado esto con el fin de abarcar no solo componentes sino las fallas o debilidades que se puedan presentar en la cadena de suministro.

esta categoría se base en dependencias y herramientas externas que el software requiere de manera directa o indirecta, esto incluyendo componentes obsoletos, no mantenidos o que tengan vulnerabilidades conocidas, pero no solo cubre estas área también compromisos como un paquete que ya contenga un malware o errores en procesos como la compilación o distribución.

De esa manera se puede intuir que las causas posible son dependencias sin versionamiento o inventario, no hacer una constante monitoreo de los componentes, herramientas o dependencias que depende el software, falta de controles en los artefactos generados, no actualizar dependencias, paquetes y herramientas entre otros fallos que se puedan presentar en la cadena de suministro.

Estas vulnerabilidades pueden permitir que un sistema sea completamente comprometido si un componente malicioso se ejecuta con los mismos permisos que la aplicación, lo que puede derivar en la exposición, alteración o indisponibilidad de datos, la distribución de software malicioso en entornos de desarrollo como npm, PyPI o Maven, y generar altos costos de recuperación además de afectar gravemente la reputación de la organización.

## Explotación

### Publicación de dependencias maliciosas (Dependency Injection / Poisoning)

![](image\AngularDependency.webp)

Su característica es introducir código malicioso dentro de un paquete o librerías que se consuman al en desarrollo del software.
el objetivo es ejecutar código malicioso en los entornos tanto de desarrollo como en producción. 
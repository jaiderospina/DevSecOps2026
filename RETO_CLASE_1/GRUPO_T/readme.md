\##Grupo T



Reynel Cely

Laura Bernal

Johanna Ortiz

Bayardo Medina







1\. Leer la sección oficial: https://docs.docker.com/reference/cli/docker/container/run/#publish







\&#x09;¿Qué diferencia hay entre -p 8080:80 y -P?







La diferencia principal radica en el control que tienes sobre la asignación:



\-p 8080:80 (Mapeo explícito): Tú defines exactamente qué puerto de tu computadora (host) se conecta al puerto del contenedor.



Uso: Ideal cuando quieres que tu servicio esté siempre en una dirección fija, como localhost:8080.



\-P (Mapeo automático/aleatorio): Docker publica todos los puertos expuestos en la imagen a puertos aleatorios disponibles en tu computadora.



Uso: Útil cuando corres muchos contenedores del mismo tipo y no quieres que choquen entre sí, o cuando no te importa qué puerto use el host mientras funcione.







¿Qué significa cuando ves 0.0.0.0:8080->80/tcp en docker ps?

Esta cadena se lee de izquierda a derecha como un "túnel":

0.0.0.0: Significa que el puerto está escuchando en todas las interfaces de red de tu máquina (Wi-Fi, Ethernet, localhost).

:8080 Es el puerto en tu computadora por el cual vas a entrar.

\->80/tcp: Indica que todo el tráfico que entre por el 8080 será redirigido al puerto 80 interno del contenedor usando el protocolo TCP.





2\. Investigar el comando docker port <nombre> y cómo se interpreta su salida.



3\. Buscar imágenes oficiales que expongan puertos (nginx, httpd, tomcat, etc.).




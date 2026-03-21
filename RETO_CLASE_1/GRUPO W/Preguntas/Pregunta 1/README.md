¿Diferencia entre -p y -P?


La opción -p permite mapear manualmente un puerto del host a un puerto del contenedor, mientras que la opción -P publica automáticamente todos los puertos expuestos por el contenedor en puertos disponibles del host.

Ejemplo con -p:
docker run -d -p 8080:80 nginx

En este caso, el usuario define que el puerto 8080 del host será utilizado para acceder al puerto 80 del contenedor.

## Integrantes

1. Milton Beltrán
2. Juan Mesa
3. Daniel Bermúdez
4. Jhon Alexander Ariza Ariza


## Objetivos del Trabajo:

## Acceso Público Avanzado con Múltiples Puertos y Servicios

## ¿Qué diferencia hay entre -p 8080:80 y -P?

La diferencia entre usar -p 8080:80 y -P en Docker es que con -p 8080:80 defines de manera explícita que el puerto 8080 del host se conecte al puerto 80 del contenedor, lo que te permite acceder al servicio en http://localhost:8080, mientras que con -P Docker publica automáticamente todos los puertos expuestos en el Dockerfile asignándoles un puerto aleatorio disponible en el host, de modo que si el contenedor expone el puerto 80 este podría quedar mapeado, por ejemplo, al 32768 del host, y para saber cuál se asignó debes consultar con docker ps; en resumen, -p te da control manual y preciso sobre el mapeo, mientras que -P lo hace de forma automática y aleatoria.



## ¿Qué significa cuando ves 0.0.0.0:8080->80/tcp en docker ps?

Cuando en la salida de `docker ps` ves algo como `0.0.0.0:8080->80/tcp`, significa que el contenedor tiene su puerto interno **80/tcp** publicado hacia el host en el puerto **8080**, y que está accesible desde todas las interfaces de red del host (`0.0.0.0` indica “todas las direcciones disponibles”); en otras palabras, cualquier conexión que llegue al puerto 8080 de tu máquina (por ejemplo, `http://localhost:8080` o desde otra máquina apuntando a la IP de tu host en el puerto 8080) será redirigida al puerto 80 dentro del contenedor, donde está corriendo el servicio.

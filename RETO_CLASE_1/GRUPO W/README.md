## INTEGRANTES

    Lady Bautista
    Vicente Rueda
    Juan Carlos Murcia
    Juan Diaz
    Jonathan Garzon

# Investigación de mediana complejidad (obligatoria)

- [¿Diferencia entre -p y -P?](./Preguntas/Pregunta%201/)
- [¿Qué significa 0.0.0.0:8080->80/tcp?](./Preguntas/Pregunta%202/)
- [¿Qué hace docker port?](./Preguntas/Pregunta%203/)
- [Buscar imágenes oficiales que expongan puertos ginx, httpd, tomcat, etc.](./Preguntas/Pregunta%204/)


# Pasos que deben realizar (indicaciones claras)

- Inicia un contenedor Apache (puedes usar la misma forma del Taller 2 o la imagen oficial httpd – tú decides y lo justificas en el README).
Mapear el puerto 8080 del host al 80 del contenedor. Usa nombre --name apache-reto.


Iniciar un segundo contenedor Nginx (imagen oficial recomendada).
Mapea el puerto 8081 del host al 80 del contenedor. Usa nombre --name nginx-reto.

Probar la opción automática -P (publicar todos los puertos expuestos) con un tercer contenedor (puedes usar la misma imagen nginx o httpd). Observa qué puerto aleatorio te asigna Docker.

Verifica todo con:

docker ps
docker port apache-reto
docker port nginx-reto
docker port <tercer-contenedor>
Accede desde el navegador a:

http://localhost:8080 → debe mostrar Apache
http://localhost:8081 → debe mostrar Nginx
(Si se está en una VM en la nube, usa la IP pública + puerto correspondiente).

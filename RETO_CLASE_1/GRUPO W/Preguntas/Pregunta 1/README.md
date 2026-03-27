[Regresar al inicio](README.md)

# ¿Diferencia entre -p y -P?


La opción -p permite mapear manualmente un puerto del host a un puerto del contenedor, mientras que la opción -P publica automáticamente todos los puertos expuestos por el contenedor en puertos disponibles del host.

# Ejemplo con -p:
docker run -d -p 8080:80 nginx

En este caso, el usuario define que el puerto 8080 del host será utilizado para acceder al puerto 80 del contenedor.


# Ejemplo con -P:
docker run -d -P nginx

Aquí Docker asigna automáticamente un puerto disponible del host para el puerto expuesto del contenedor.

 # Análisis:
-p brinda mayor control sobre los puertos utilizados
-P facilita la asignación sin riesgo de conflictos
-p es más utilizado en entornos productivos
-P es útil en pruebas y entornos de laboratorio

# Durante la práctica se comprobó que el puerto asignado con -P cambia dinámicamente y debe ser consultado con docker ps.

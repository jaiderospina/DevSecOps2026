
# Reto en Clase 1 – Acceso Público Avanzado con Múltiples Puertos y Servicios


# Creamos Apache en el puerto 8080

< docker run -d -p 8080:80 --name apache-reto httpd >

# Creamos Nginx en el puerto 8081

< docker run -d -p 8081:80 --name nginx-reto nginx >


# Creamos contenedor puerto automatico -P

< docker run -d -P --name nginx-auto nginx >


# Verificamos

## Ver todos los contenedores y puertos

< docker ps >

## Ver el mapeo del Apache

< docker port apache-reto >

## Ver el mapeo del Nginx

< docker port nginx-reto >

##

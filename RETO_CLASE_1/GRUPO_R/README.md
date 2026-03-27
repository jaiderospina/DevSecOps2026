## Portada
**Integrantes:** Miguel Angel Ahumada, Juan Sebastian Lara  
**Fecha:** 26/03/2026 


---  

# Reto en Clase 1 – Acceso Público Avanzado con Múltiples Puertos y Servicios


    



## Objetivo del reto
Configurar y acceder a múltiples contenedores web al mismo tiempo usando distintas estrategias de publicación de puertos en Docker, comparando el uso de `-p` y `-P`, y verificando el funcionamiento de cada servicio desde el navegador.

---

## Introducción
En este reto se implementaron tres contenedores web sobre la misma máquina host. El primero fue un contenedor Apache publicado manualmente con `-p 8080:80`, el segundo un contenedor Nginx publicado con `-p 8081:80`, y el tercero un contenedor adicional desplegado con `-P`, lo que permitió a Docker asignar un puerto aleatorio del host al puerto expuesto por la imagen.

---

## Investigación:  
Diferencia entre `-p` y `-P`  


| Opción | Descripción | Ejemplo | Resultado |
|---|---|---|---|
| `-p` | Publica manualmente un puerto del contenedor en un puerto específico del host | `-p 8080:80` | El host escucha por 8080 y redirige al 80 del contenedor |
| `-P` | Publica automáticamente todos los puertos expuestos de la imagen hacia puertos aleatorios del host | `-P` | Docker asigna un puerto efímero automáticamente |

  
### Interpretación de `0.0.0.0:8080->80/tcp`
Esta salida indica que el puerto 8080 del host está vinculado al puerto 80/TCP del contenedor y que el servicio está expuesto en todas las interfaces IPv4 del host.


### Uso de docker port
El comando docker port <contenedor> permite consultar los puertos publicados de un contenedor y su relación entre host y contenedor.

---

## Desarrollo del reto

### 1. Creación del contenedor Apache
Se creó el contenedor Apache con la imagen oficial `httpd`, usando publicación manual del puerto:

```bash
docker run -d -p 8080:80 --name apache-reto httpd



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

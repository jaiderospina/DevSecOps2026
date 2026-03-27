## Portada
**Integrantes:** Miguel Angel Ahumada, Juan Sebastian Lara  
**Fecha:** 26/03/2026 


---  

# Reto en Clase 1 – Acceso Público Avanzado con Múltiples Puertos y Servicios


    



## Objetivo del reto
Configurar y acceder a múltiples contenedores web al mismo tiempo usando distintas estrategias de publicación de puertos en Docker, comparando el uso de `-p` y `-P`, y verificando el funcionamiento de cada servicio desde el navegador.

---

## 1. Introducción
En este reto se implementaron tres contenedores web sobre la misma máquina host. El primero fue un contenedor Apache publicado manualmente con `-p 8080:80`, el segundo un contenedor Nginx publicado con `-p 8081:80`, y el tercero un contenedor adicional desplegado con `-P`, lo que permitió a Docker asignar un puerto aleatorio del host al puerto expuesto por la imagen.

---

## 2. Investigación:  
  
### 2.1 ¿Diferencia entre -p 8080:80 y -P?  

La diferencia principal es que con `-p 8080:80` el usuario define el mapeo exacto, mientras que con `-P` Docker decide automáticamente el puerto del host. En ambos casos el contenedor expone el servicio al exterior, pero `-p` ofrece control manual y `-P` facilita pruebas rápidas.


| Opción | Descripción | Ejemplo | Resultado |
|---|---|---|---|
| `-p` | Publica manualmente un puerto del contenedor en un puerto específico del host | `-p 8080:80` | El host escucha por 8080 y redirige al 80 del contenedor |
| `-P` | Publica automáticamente todos los puertos expuestos de la imagen hacia puertos aleatorios del host | `-P` | Docker asigna un puerto efímero automáticamente |

### 2.2 ¿Qué significa cuando ves 0.0.0.0:8080->80/tcp en docker ps?

Cuando `docker ps` muestra una salida como `0.0.0.0:8080->80/tcp`, significa que el puerto `8080` del host está publicado y redirige tráfico al puerto `80/tcp` del contenedor. La dirección `0.0.0.0` indica que el puerto está escuchando en todas las interfaces IPv4 del host, por lo que el servicio puede ser accedido mediante `localhost:8080` o mediante la IP del equipo anfitrión, dependiendo del entorno de ejecución.

### 2.3 ¿Para qué sirve `docker port <nombre>`?

El comando `docker port <contenedor>` permite listar los mapeos de puertos publicados de un contenedor. Es decir, muestra qué puerto interno del contenedor fue asociado a qué puerto del host. También puede consultarse un puerto específico, por ejemplo `docker port apache-reto 80/tcp`.

### 2.4 Imágenes oficiales investigadas

Para el desarrollo de este reto se revisaron imágenes oficiales que exponen puertos para servicios web, entre ellas:

- `httpd`
- `nginx`

Estas imágenes son adecuadas para el laboratorio porque proporcionan servicios web listos para ejecutar y exponen el puerto 80 para tráfico HTTP.

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

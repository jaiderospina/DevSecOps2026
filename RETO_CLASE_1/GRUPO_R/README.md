## Portada  

**Integrantes:**  
- Miguel Angel Ahumada Duarte  
- Juan Sebastian Lara Suarez
  
**Grupo:** R    
**Fecha:** 26/03/2026 


---  

# Reto en Clase 1 – Acceso Público Avanzado con Múltiples Puertos y Servicios


    

## Objetivo del reto
Configurar y acceder a múltiples contenedores web al mismo tiempo usando distintas estrategias de publicación de puertos en Docker, comparando el uso de `-p` y `-P`, y verificando el funcionamiento de cada servicio desde el navegador.

---

## 1. Introducción

En este reto se trabajó el acceso público a servicios web desplegados en contenedores Docker, ampliando lo aprendido en el Taller 2. En lugar de publicar un solo servicio, se configuraron varios contenedores web dentro de la misma máquina host, utilizando diferentes estrategias de mapeo de puertos.

Para el desarrollo de la actividad se implementaron tres contenedores:

- Un contenedor **Apache**, publicado manualmente con `-p 8080:80`
- Un contenedor **Nginx**, publicado manualmente con `-p 8081:80`
- Un tercer contenedor **Nginx**, desplegado con `-P`, permitiendo que Docker asignara automáticamente un puerto del host

De esta manera, se comprobó cómo Docker permite ejecutar varios servicios web de forma simultánea sin conflictos de puertos, y cómo se pueden inspeccionar las publicaciones realizadas con los comandos `docker ps` y `docker port`.


---

## 2. Investigación:  
  
### 2.1 ¿Diferencia entre -p 8080:80 y -P?  

La diferencia principal es que con `-p 8080:80` el usuario define el mapeo exacto, mientras que con `-P` Docker decide automáticamente el puerto del host. En ambos casos el contenedor expone el servicio al exterior, pero `-p` ofrece control manual y `-P` facilita pruebas rápidas.


### 2.2 ¿Qué significa cuando ves 0.0.0.0:8080->80/tcp en docker ps?

Cuando `docker ps` muestra una salida como `0.0.0.0:8080->80/tcp`, significa que el puerto `8080` del host está publicado y redirige tráfico al puerto `80/tcp` del contenedor. La dirección `0.0.0.0` indica que el puerto está escuchando en todas las interfaces IPv4 del host, por lo que el servicio puede ser accedido mediante `localhost:8080` o mediante la IP del equipo anfitrión, dependiendo del entorno de ejecución.

### 2.3 ¿Para qué sirve `docker port <nombre>`?

El comando `docker port <contenedor>` sirve para listar los puertos publicados de un contenedor y mostrar cómo están mapeados entre el contenedor y el host.

Por ejemplo, al ejecutar:

```bash
docker port apache-reto
```
se puede obtener una salida como:

80/tcp -> 0.0.0.0:8080

Esto indica que el puerto 80/tcp del contenedor fue publicado hacia el puerto 8080 del host. La documentación oficial también permite consultar un puerto específico, por ejemplo docker port apache-reto 80/tcp.


### 2.4 Imágenes oficiales investigadas

Para el desarrollo de este reto se revisaron imágenes oficiales que exponen puertos para servicios web, entre ellas:

- `httpd`
- `nginx`

Estas imágenes son adecuadas para el laboratorio porque proporcionan servicios web listos para ejecutar y exponen el puerto 80 para tráfico HTTP.

---

## 3. Tabla comparativa: `-p` vs `-P`

| Opción | Descripción | Ejemplo | Resultado |
|---|---|---|---|
| `-p` | Publica manualmente un puerto del contenedor en un puerto específico del host | `-p 8080:80` | El host escucha por 8080 y redirige al 80 del contenedor |
| `-P` | Publica automáticamente todos los puertos expuestos de la imagen hacia puertos aleatorios del host | `-P` | Docker asigna un puerto efímero automáticamente |

### Análisis comparativo

El uso de `-p` es más conveniente cuando se necesita control total sobre el acceso al servicio, por ejemplo cuando el docente solicita expresamente que Apache quede en el puerto `8080` y Nginx en `8081`. En cambio, `-P` es útil para pruebas rápidas, escenarios de laboratorio o despliegues donde no sea importante conocer de antemano el puerto exacto del host.

En este reto se utilizaron ambas opciones para demostrar que el estudiante comprende la diferencia conceptual y práctica entre publicación manual y automática de puertos.

---

## 4. Desarrollo del reto

### Creación del contenedor Apache
Se creó el contenedor Apache con la imagen oficial `httpd`, usando publicación manual del puerto:

El comando ejecutado fue:
```bash
docker run -d -p 8080:80 --name apache-reto httpd
```
<p align="center">
<img src="OWASP/GRUPO R/IMAGENES/Creacion de Docker Apache .png" width="600">
</p>
#### Explicacion
- `docker run`: crea y ejecuta un contenedor
- `-d`: ejecuta el contenedor en segundo plano
- `-p 8080:80`: enlaza el puerto 8080 del host con el puerto 80 del contenedor
- `--name apache-reto`: asigna el nombre solicitado en el ejercicio
- `httpd`: imagen oficial de Apache

Resultado

El contenedor quedó ejecutándose correctamente y el servicio Apache se hizo accesible desde el navegador mediante:

http://localhost:8080

Captura 1. Creación del contenedor apache-reto.


Captura 2. Navegador mostrando Apache en http://localhost:8080.

---

### Creación del contenedor Nginx

Para el segundo servicio se utilizó la imagen oficial nginx, publicando manualmente el puerto 8081 del host hacia el puerto 80 del contenedor.

El comando ejecutado fue:

```bash
docker run -d -p 8081:80 --name nginx-reto nginx
```



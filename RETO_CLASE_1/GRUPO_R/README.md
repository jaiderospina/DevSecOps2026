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

### 4.1 Creación del contenedor Apache
Se creó el contenedor Apache con la imagen oficial `httpd`, usando publicación manual del puerto:

El comando ejecutado fue:
```bash
docker run -d -p 8080:80 --name apache-reto httpd
```
<p align="center">
<img src="../../OWASP/GRUPO R/IMAGENES/Creacion de Docker Apache .png" width="600">
</p>
<div align="center">
  <strong>Captura 1.</strong> Creación del contenedor apache-reto.
</div>

#### Explicacion
- `docker run`: crea y ejecuta un contenedor
- `-d`: ejecuta el contenedor en segundo plano
- `-p 8080:80`: enlaza el puerto 8080 del host con el puerto 80 del contenedor
- `--name apache-reto`: asigna el nombre solicitado en el ejercicio
- `httpd`: imagen oficial de Apache
<p align="center">
<img src="../../OWASP/GRUPO R/IMAGENES/Ingreso de Docker Apache .png" width="600">
</p>
<p align="center">
<strong>Captura 2.</strong> Ingreso al contenedor apache-reto.
</p>

##### Resultado

El contenedor quedó ejecutándose correctamente y el servicio Apache se hizo accesible desde el navegador mediante:

```bash
http://localhost:8080
```

<p align="center">
<img src="../../OWASP/GRUPO R/IMAGENES/Visualisacion Apache.png" width="600">
</p>
<p align="center">
<strong>Captura 3.</strong> Navegador mostrando Apache en http://localhost:8080
</p>


---

### 4.2 Creación del contenedor Nginx

Para el segundo servicio se utilizó la imagen oficial nginx, publicando manualmente el puerto 8081 del host hacia el puerto 80 del contenedor.

El comando ejecutado fue:

```bash
docker run -d -p 8081:80 --name nginx-reto nginx
```

<p align="center">
<img src="../../OWASP/GRUPO R/IMAGENES/Creacion de Docker Nginx.png" width="600">
</p>
<p align="center">  
<strong>Captura 4.</strong> Creación del contenedor nginx-reto.
</p>

#### Explicación

- `docker run`: crea y ejecuta un contenedor
- `-d`: lo deja corriendo en segundo plano
- `-p 8081:80`: publica el puerto 80 del contenedor en el puerto 8081 del host
- `--name nginx-reto`: asigna el nombre solicitado
- `nginx`: imagen oficial del servidor web Nginx
  
<p align="center">
<img src="../../OWASP/GRUPO R/IMAGENES/Ingreso de Docker Nginx.png" width="600">
</p>
<p align="center">  
<strong>Captura 5.</strong> Ingreso al contenedor nginx-reto.
</p>

##### Resultado

El contenedor quedó funcionando correctamente y el servicio Nginx fue accesible desde el navegador mediante:

```bash
http://localhost:8081
```
<p align="center">
<img src="../../OWASP/GRUPO R/IMAGENES/Visualisacion Nginx.png" width="600">
</p>
<p align="center">  
<strong>Captura 6.</strong>Navegador mostrando nginx en http://localhost:8081.
</p>


---

### 4.3 Creación del tercer contenedor con `-P`


Para probar la publicación automática de puertos se creó un tercer contenedor usando nuevamente la imagen `nginx`, pero esta vez con la opción `-P`, que publica automáticamente todos los puertos expuestos por la imagen en puertos aleatorios del host.

**Comando ejecutado:**

```bash
docker run -d -P --name nginx-auto nginx
```

<p align="center">
<img src="../../OWASP/GRUPO R/IMAGENES/Creacion de Docker Nginx auto.png" width="600">
</p>
<p align="center">  
<strong>Captura 7.</strong> Creación del contenedor nginx-auto.
</p>

#### Explicación

- `-P`: publica automáticamente todos los puertos expuestos por la imagen
- Docker selecciona un puerto disponible del host sin necesidad de indicarlo manualmente
- En este caso, la imagen `nginx` expone el puerto `80/tcp`, por lo tanto Docker asignó un puerto aleatorio del host hacia ese puerto interno

<p align="center">
<img src="../../OWASP/GRUPO R/IMAGENES/Ingreso de Docker Nginx auto.png" width="600">
</p>
<p align="center">
<strong>Captura 8.</strong> Ingreso al contenedor Nginx-auto.
</p>

##### Resultado

Al verificar con `docker ps`, Docker asignó el puerto `32768` del host al puerto `80/tcp` del contenedor `nginx-auto`.

Esto se evidenció con una salida similar a la siguiente:

```bash
0.0.0.0:32768->80/tcp
```

Por lo tanto, el contenedor pudo ser accedido desde el navegador usando:

```bash
http://localhost:32768
```

<p align="center">
<img src="../../OWASP/GRUPO R/IMAGENES/Visualisacion Nginx auto.png" width="600">
</p>
<p align="center">  
<strong>Captura 9.</strong>Navegador mostrando nginx-auto.
</p>

<p align="center">
<img src="../../OWASP/GRUPO R/IMAGENES/Docker ps Nginx auto.png" width="600">
</p>
<p align="center">  
<strong>Captura 10.</strong>Salida de <strong>docker ps</strong> mostrando el puerto automático asignado al tercer contenedor.
</p>


---

### 4.4 Verificación con `docker ps`

Una vez creados los tres contenedores, se verificó su estado con:

```bash
docker ps
```

La salida permitió comprobar que:

- `apache-reto` estaba publicado en `0.0.0.0:8080->80/tcp`
- `nginx-reto` estaba publicado en `0.0.0.0:8081->80/tcp`
- `nginx-auto` estaba publicado en `0.0.0.0:32768->80/tcp`

Esto confirmó que los tres servicios estaban activos simultáneamente y sin conflicto de puertos.

<p align="center">
<img src="../../OWASP/GRUPO R/IMAGENES/Docker ps Todos los contenedores.png" width="600">
</p>
<p align="center">  
<strong>Captura 11.</strong>Salida completa de <strong>docker ps</strong> con los tres contenedores en ejecución.
</p>


---

### 4.5 Inspección de puertos con `docker port`

Posteriormente se inspeccionó cada contenedor utilizando el comando `docker port`.

#### Apache

```bash
docker port apache-reto
```
<p align="center">
<img src="../../OWASP/GRUPO R/IMAGENES/Inspección de puertos Apache-reto.png" width="600">
</p>
<p align="center">
<strong>Captura 12.</strong> Inspección de puertos con docker port al contenedor apache-reto.
</p>

Salida esperada:

```bash
80/tcp -> 0.0.0.0:8080
```

#### Nginx

```bash
docker port nginx-reto
```
<p align="center">
<img src="../../OWASP/GRUPO R/IMAGENES/Inspección de puertos Nginx-reto.png" width="600">
</p>
<p align="center">
<strong>Captura 13.</strong> Inspección de puertos con docker port al contenedor nginx-reto.
</p>

Salida esperada:

```bash
80/tcp -> 0.0.0.0:8081
```

#### Tercer contenedor automático

```bash
docker port nginx-auto
```
<p align="center">
<img src="../../OWASP/GRUPO R/IMAGENES/Inspección de puertos Nginx auto.png" width="600">
</p>
<p align="center">
<strong>Captura 14.</strong> Inspección de puertos con docker port al contenedor nginx-auto.
</p>

Salida esperada:

```bash
80/tcp -> 0.0.0.0:32768
```

Con esto se comprobó de forma individual la asociación entre puertos internos y puertos publicados en el host.

**Captura 8.** Salida de `docker port apache-reto`.  
**Captura 9.** Salida de `docker port nginx-reto`.  
**Captura 10.** Salida de `docker port nginx-auto`.

---
## 5. Detener un contenedor y validar continuidad del otro

Como parte del reto, se detuvo solo uno de los contenedores para verificar que los demás continuaran funcionando normalmente. En este caso se detuvo `apache-reto`.

**Comando ejecutado:**

```bash
docker stop apache-reto
```

Luego se verificó nuevamente con:

```bash
docker ps
```

El resultado mostró que `nginx-reto` y `nginx-auto` continuaban activos, lo que demuestra que cada contenedor opera de manera independiente.

Después se validó en el navegador que:

- `http://localhost:8080` ya no respondía, porque Apache fue detenido
- `http://localhost:8081` seguía funcionando correctamente
- `http://localhost:32768` seguía funcionando correctamente

**Captura 14.** Detención del contenedor `apache-reto`.  
**Captura 15.** Salida de `docker ps` después de detener uno de los contenedores.  
**Captura 16.** Evidencia de que `nginx-reto` sigue funcionando aun después de detener Apache.

---

## 6. Dificultades encontradas y solución

Durante el desarrollo del reto, una de las principales dificultades fue identificar correctamente qué puerto había asignado Docker al tercer contenedor creado con `-P`, ya que al no definirse manualmente el puerto del host, era necesario inspeccionarlo con `docker ps` o con `docker port`.

Otra dificultad fue comprender la diferencia práctica entre `-p` y `-P`, ya que ambos permiten publicar servicios, pero tienen usos distintos. Esto se resolvió revisando la documentación oficial de Docker y validando el comportamiento real de cada opción mediante pruebas en la terminal.

También fue importante verificar que no existieran conflictos de puertos entre contenedores, lo cual se solucionó asignando puertos distintos (`8080` y `8081`) para los dos servicios publicados manualmente.

---

## 7. Justificación de las decisiones tomadas

Para el contenedor Apache se eligió la imagen oficial `httpd` porque ya incluye el servicio web listo para usarse, lo que simplifica el laboratorio frente a instalar Apache manualmente dentro de un Ubuntu como en el Taller 2.

Para el segundo y tercer contenedor se eligió la imagen oficial `nginx`, ya que también expone el puerto 80 y permite comparar fácilmente el comportamiento entre publicación manual y automática.

Se utilizó `-p` en los dos primeros contenedores porque el reto exigía acceso específico por `8080` y `8081`, mientras que se utilizó `-P` en el tercero para evidenciar cómo Docker asigna puertos de forma automática.

---

## 8. Conclusión

Con el desarrollo de este reto se logró comprender de manera práctica cómo publicar contenedores web en Docker utilizando tanto mapeo manual como automático de puertos. Se confirmó que la opción `-p` permite un control preciso sobre el puerto del host, mientras que `-P` facilita la exposición automática de servicios cuando no es necesario definir un puerto fijo.

Además, se aprendió a interpretar la salida de `docker ps`, a usar `docker port` para inspeccionar publicaciones específicas y a comprobar que varios servicios pueden ejecutarse en simultáneo dentro de la misma máquina sin interferencias, siempre que los puertos del host sean diferentes.

A diferencia del Taller 2, en este reto no solo se trabajó con un único contenedor, sino que se administraron varios servicios al mismo tiempo, comparando estrategias de publicación y verificando su funcionamiento real desde el navegador. Esto permitió una comprensión más completa del acceso público de contenedores y del manejo práctico de puertos en Docker.

---


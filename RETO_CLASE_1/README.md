# Taller 2: Acceso público de containers

# **Prerrequisito**

Desarrollar taller 2 del repo docker. 

- https://github.com/jaiderospina/Docker20242/blob/main/taller-docker-master/taller2-acceso-puertos.md


## Dedesarrollo.
Bienvenido a este taller, en este taller aprenderás como manejar los puertos en los containers y cómo permitir que tengan acceso público a través de los mismos. Esto lo lograremos a través de crear un container con Apache instalado en el puerto 80, el cual saldrá por el puerto 8001 del host que tiene instalado Docker

## Paso 1: Crear container y exponer los puertos
Luego de haber ingresado a tu máquina virtual con Docker instalado, ejecutar el siguiente comando para crear una máquina virtual con Ubuntu:18.04
```
docker run -it -d -p 8001:80 --name=apache ubuntu:18.04 /bin/bash
```
### Explicación
Este comando lo que hará es que creará un container con la imagen del repositorio de Ubuntu en el DockerHub con su tag 18.04, es decir Ubuntu versión 18.04. En este caso creamos la imagen con el parámetro -d que significa que se ejecute en segundo plano o como daemon, y que exponga los puertos 80 del container con el 8001 del host, luego en vez de acceder al container por su ID, lo accesamos por el nombre "apache" y finalmente se crea el container ejecutando el comando /bin/bash dentro de él.

## Paso 2: Acceder al container que esta en segundo plano
Para acceder al container debes de ejecutar el comando:
```
docker exec -it apache /bin/bash
```
Luego de ingresar al container actualiza el repositorio de ubuntu:
```
apt update
```
Luego instala Apache con el siguiente comando:
```
apt install apache2
```
Luego inicia apache con el comando
```
/etc/init.d/apache2 start
```
Luego ejecuta exit para salir del container
```
exit
```
## Paso 3: Accede al sitio localizado enlazado al container
Para esto debes de obtener el ip de tu máquina virtual, en este caso el IP público, dependiendo del proveedor puedes verlo con el comando, podría ser la interfaz eth0 en algunos casos:
```
ip add
```
y buscar el IP público o bien con el IP público asignado por tu proveedor de la nube, solo debes acceder desde el navegador como
```
http://IP:PORT
```
Para acceder desde el host:
```
http://IP_HOST:8001
```
Para acceder desde el container:
```
http://IP_CONTAINER:80
```
y podrás ver la instalación por defecto de Apache, también puedes usar el puerto 80 en el servidor público, colocando -p 80:80 en vez de -p 8001:80
## Paso 4: Ver IP del container
En algunos casos, como prueba local podrás acceder al IP del container, ya sea desde adentro del mismo con ifconfig o bien con el comando docker en otra consola ejecutando:
```
docker inspect apache | grep IPAddress
```

**Reto en Clase 1: Ampliación “Acceso Público Avanzado con Múltiples Puertos y Servicios”**  


**¡Bienvenidos al primer Reto en Clase del curso!**  
Este no es un taller guiado paso a paso como el Taller 2. Es un **reto práctico** donde ustedes, en grupos de 3-4 personas, deben aplicar lo aprendido, investigar un poco en la documentación oficial y crear una solución funcional con **dos servidores web corriendo simultáneamente** en la misma máquina.

**Objetivo del reto**  
Configurar y acceder a **dos contenedores web diferentes** al mismo tiempo usando distintas estrategias de mapeo de puertos, investigar las opciones `-p` y `-P`, y dominar los comandos de inspección de puertos. Todo esto sin conflictos de puertos y con evidencia clara de que ambos servicios están accesibles desde el navegador.

**Competencias que se evalúan**  
- Uso correcto de `-p` y `-P`  
- Inspección de puertos con `docker port` y `docker ps`  
- Capacidad de investigación práctica en documentación oficial  
- Calidad y riqueza del README de entrega (capturas + explicaciones)

**Investigación de mediana complejidad (obligatoria)**  

1. Leer la sección oficial: https://docs.docker.com/reference/cli/docker/container/run/#publish  
   - ¿Qué diferencia hay entre `-p 8080:80` y `-P`?  
   - ¿Qué significa cuando ves `0.0.0.0:8080->80/tcp` en `docker ps`?  
2. Investigar el comando `docker port <nombre>` y cómo se interpreta su salida.  
3. Buscar imágenes oficiales que expongan puertos (nginx, httpd, tomcat, etc.).

**Pasos que deben realizar (indicaciones claras)**

1. Inicia un contenedor **Apache** (puedes usar la misma forma del Taller 2 o la imagen oficial `httpd` – tú decides y lo justificas en el README).  
   Mapear el puerto **8080** del host al 80 del contenedor. Usa nombre `--name apache-reto`.

2. Iniciar un segundo contenedor **Nginx** (imagen oficial recomendada).  
   Mapea el puerto **8081** del host al 80 del contenedor. Usa nombre `--name nginx-reto`.

3. Probar la opción automática **-P** (publicar todos los puertos expuestos) con un tercer contenedor (puedes usar la misma imagen nginx o httpd). Observa qué puerto aleatorio te asigna Docker.

4. Verifica todo con:  
   - `docker ps`  
   - `docker port apache-reto`  
   - `docker port nginx-reto`  
   - `docker port <tercer-contenedor>`

5. Accede desde el navegador a:  
   - `http://localhost:8080` → debe mostrar Apache  
   - `http://localhost:8081` → debe mostrar Nginx  
   (Si se está en una VM en la nube, usa la IP pública + puerto correspondiente).

6. Detener solo uno de los contenedores y verificar que el otro sigue funcionando.

**Entrega obligatoria (README rico)**  
En el repositorio del curso:

- Crear la carpeta general **`Reto_clase_1`** (si aún no existe).  
- Dentro de ella, cada grupo crea **su propia carpeta** con el nombre del grupo (ejemplo: `grupo3-jaider`, `grupoA`, `grupoB`).  
- Dentro de tu carpeta de grupo coloca **únicamente un archivo `README.md`**.

**El README debe ser rico y profesional** (esto vale el 60% de la nota del reto):  
- Portada con nombre del grupo, integrantes y fecha.  
- Objetivo del reto.  
- Tabla comparativa: `-p` vs `-P` (con lo que investigaron).  
- **Al menos 8-10 capturas de pantalla** numeradas y con pie de foto:  
  - `docker ps` completo  
  - Salida de `docker port` de cada contenedor  
  - Navegador mostrando Apache  
  - Navegador mostrando Nginx  
  - Salida de `docker ps` después de detener uno  
- Explicación detallada de cada paso que hicieron (¿por qué eligieron `-p` o `-P` en cada caso?).  
- Dificultades encontradas y cómo las resolvieron.  
- Conclusión: ¿Qué aprendieron que no estaba en el Taller 2?


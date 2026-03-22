## Integrantes

| # | Nombre |
|---|--------|
| 1 | Roberto Carlos Muñoz |
| 2 | Carlos Alberto Gonzalez |
| 3 | Diego Armando Hernandez |
| 4 | Daniel Mauricio Daza Borja |







#Reto en Clase 1 – Acceso Público Avanzado con Múltiples Puertos y Servicios
---

##Objetivo del reto

Configurar y acceder a múltiples contenedores web (Apache y Nginx) de forma simultánea en una misma máquina, utilizando diferentes estrategias de mapeo de puertos en Docker (`-p` y `-P`), evitando conflictos y verificando su correcto funcionamiento desde el navegador.

---

##Desarrollo del ejercicio

###1. Creación del contenedor Apache

Se utilizó la imagen oficial `httpd` y se realizó el mapeo manual de puertos:

```bash
docker run -d -p 8080:80 --name apache-reto httpd
```

Esto permite acceder al servicio Apache desde el navegador mediante:

```
http://localhost:8080
```

---

###2. Creación del contenedor Nginx

Se desplegó un segundo contenedor con la imagen oficial `nginx`, usando un puerto diferente:

```bash
docker run -d -p 8081:80 --name nginx-reto nginx
```

Acceso desde navegador:

```
http://localhost:8081
```

---

###3. Uso de puertos automáticos (-P)

Se creó un tercer contenedor utilizando asignación automática de puertos:

```bash
docker run -d -P --name nginx-auto nginx
```

Docker asignó automáticamente el puerto:

```
0.0.0.0:32768->80/tcp
```

Acceso:

```
http://localhost:32768
```

---

##Verificación de contenedores

Se utilizó el siguiente comando:

```bash
docker ps
```

<img src="https://github.com/jaiderospina/DevSecOps2026/blob/main/OWASP/GRUPO%20X/Imagenes/IMAGENES%20DOCKER/IMAGEN%201.png"/>

---

##Inspección de puertos

Se verificaron los puertos asignados con:

```bash
docker port apache-reto
docker port nginx-reto
docker port nginx-auto
```
---

##Pruebas en navegador

Se comprobó el acceso a cada servicio:

* Apache → http://localhost:8080
* Nginx → http://localhost:8081
* Nginx automático → http://localhost:32768

<img src="https://github.com/jaiderospina/DevSecOps2026/blob/main/OWASP/GRUPO%20X/Imagenes/IMAGENES%20DOCKER/APACHE_FUNCIONANDO.png"/>
<img src="https://github.com/jaiderospina/DevSecOps2026/blob/main/OWASP/GRUPO%20X/Imagenes/IMAGENES%20DOCKER/NGINX_FUNCIONANDO.png"/>
<img src="https://github.com/jaiderospina/DevSecOps2026/blob/main/OWASP/GRUPO%20X/Imagenes/IMAGENES%20DOCKER/NGINX_AUTOMATICO_FUNCIONANDO.png"/>

---

##Prueba de detención de contenedor

Se detuvo el contenedor Apache:

```bash
docker stop apache-reto
```

Luego se verificó:

```bash
docker ps
```

Resultado:

* Apache detenido X
* Nginx funcionando

<img src="https://github.com/jaiderospina/DevSecOps2026/blob/main/OWASP/GRUPO%20X/Imagenes/IMAGENES%20DOCKER/IMAGEN_8.png"/>

---

##Tabla comparativa: -p vs -P

| Característica       | -p (manual)             | -P (automático)      |
| -------------------- | ----------------------- | -------------------- |
| Asignación de puerto | Definida por el usuario | Asignada por Docker  |
| Control              | Alto                    | Bajo                 |
| Facilidad            | Media                   | Alta                 |
| Uso recomendado      | Producción              | Pruebas / desarrollo |
| Ejemplo              | 8080:80                 | 32768:80             |

---

##Conceptos clave aprendidos

###¿Qué significa 0.0.0.0:8080->80/tcp?

* `0.0.0.0` → accesible desde cualquier IP
* `8080` → puerto del host
* `80` → puerto del contenedor

---

###Comando docker port

Permite identificar cómo están mapeados los puertos entre el host y el contenedor.

Ejemplo:

```bash
docker port nginx-auto
```

---

##Dificultades encontradas

* Confusión inicial con el uso de puertos (`-p` vs `-P`)
* Identificación del puerto automático asignado por Docker
* Validación del acceso correcto en navegador

###Solución

* Uso de `docker ps` para identificar puertos
* Uso de `docker port` para confirmar asignaciones
* Pruebas directas en navegador

---

##Conclusión

Se logró implementar correctamente múltiples contenedores web en una misma máquina, utilizando tanto asignación manual como automática de puertos. Se comprobó que Docker permite ejecutar servicios simultáneamente sin conflictos, facilitando el acceso externo mediante el mapeo de puertos.

Además, se adquirió un mejor entendimiento sobre la gestión de puertos, inspección de contenedores y publicación de servicios en entornos Docker, lo cual es fundamental para despliegues reales en ambientes productivos.

---

##Evidencia final

El sistema permitió:

* Ejecutar múltiples servicios web simultáneamente
* Acceder a cada uno desde diferentes puertos
* Validar independencia entre contenedores
* Controlar servicios de forma individual

---

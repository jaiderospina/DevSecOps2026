# Reto en Clase: Acceso Público Avanzado con Múltiples Puertos y Servicios

**Curso:** DevSecOps 2026  
**Repositorio:** DevSecOps2026  

**Grupo:** GRUPO S  

**Integrantes:**
- Damian Gonzalez
- Marcelo Desalvador
- Roger Cardenas

## Objetivo del reto

El objetivo de este reto fue configurar múltiples contenedores web ejecutándose simultáneamente en la misma máquina utilizando Docker.  

Se utilizaron diferentes estrategias de publicación de puertos mediante las opciones `-p` y `-P`, verificando posteriormente el mapeo de puertos con los comandos `docker ps` y `docker port`.

Además, se comprobó el acceso a los servicios desde el navegador y se validó la independencia entre contenedores al detener uno de ellos.

## Diferencia entre -p y -P

| Opción | Descripción |
|------|------|
| `-p` | Permite publicar manualmente un puerto del host hacia el puerto de un contenedor |
| `-P` | Docker publica automáticamente todos los puertos expuestos del contenedor en puertos aleatorios del host |

# Figura 1 — Contenedores activos
<img width="1691" height="342" alt="image" src="https://github.com/user-attachments/assets/e1da0bf8-58cd-4fb6-ba9d-75f57cfbf38b" />
Se utilizó el comando `docker ps` para verificar los contenedores en ejecución dentro del host.

# Figura 2. Verificación del contenedor Apache

Durante la práctica se utilizó el siguiente comando para crear el contenedor Apache:

```bash
docker run -d --name apache-reto -p 8080:80 httpd
<img width="509" height="135" alt="image" src="https://github.com/user-attachments/assets/32567756-8ff9-489e-b147-8d417298d96d" />

# Figura 3. Verificación del contenedor Nginx

Se creó un segundo contenedor utilizando la imagen oficial de Nginx con el siguiente comando:

```bash
docker run -d --name nginx-reto -p 8081:80 nginx
<img width="509" height="126" alt="image" src="https://github.com/user-attachments/assets/5e0c52ac-30f4-425a-8187-7ea46575066b" />

# Figura 4. Verificación de publicación automática con `-P`

Para demostrar el uso de la opción `-P`, se creó un contenedor adicional con el siguiente comando:

```bash
docker run -d --name nginx-auto -P nginx
<img width="512" height="141" alt="image" src="https://github.com/user-attachments/assets/20a90d36-09c1-410d-928f-f58c3da95f0f" />




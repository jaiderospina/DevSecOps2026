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
Se utilizó el comando `docker ps`para verificar los contenedores en ejecución dentro del host.

### Figura 2. Verificación del contenedor Apache

Durante la práctica se utilizó el siguiente comando para crear el contenedor Apache:

<img width="509" height="130" alt="image" src="https://github.com/user-attachments/assets/9cf46fd1-04ea-4fc3-a086-8f1e382af606" />

### Figura 3. Verificación del contenedor Nginx

Se creó un segundo contenedor utilizando la imagen oficial de Nginx con el siguiente comando:

<img width="516" height="130" alt="image" src="https://github.com/user-attachments/assets/5276dc20-435e-41d9-a8cb-45829bc21ad5" />

### Figura 4. Verificación de publicación automática con `-P`

Para demostrar el uso de la opción `-P`, se creó un contenedor adicional con el siguiente comando:

<img width="527" height="155" alt="image" src="https://github.com/user-attachments/assets/18bd6559-b4c1-4f1e-8c5d-5aeaf4b780ac" />

### Figura 5. Acceso al servicio Apache desde el navegador

Se verificó el funcionamiento del contenedor `apache-reto` accediendo desde el navegador al puerto 8080 del host.

**URL utilizada:**
<img width="1318" height="387" alt="image" src="https://github.com/user-attachments/assets/4fdf921a-5925-4b73-b1e4-e06047bf8ee2" />
  
### Figura 6. Acceso al servicio Nginx desde el navegador

Se comprobó el funcionamiento del contenedor `nginx-reto` accediendo al puerto 8081 del host desde el navegador.

**URL utilizada:**
<img width="1435" height="563" alt="image" src="https://github.com/user-attachments/assets/01d38878-f3f2-4eb7-9fce-91ba7675f20d" />

### Figura 7. Acceso al contenedor publicado automáticamente

Se accedió al contenedor `nginx-auto` utilizando el puerto asignado automáticamente por Docker.

**URL utilizada:**
<img width="1399" height="589" alt="image" src="https://github.com/user-attachments/assets/2219509d-3c15-44e2-bb20-fdd6fc68adb8" />

### Figura 8. Detención del contenedor Apache

Con el fin de comprobar la independencia entre servicios, se detuvo el contenedor `apache-reto` mediante el siguiente comando:
<img width="536" height="284" alt="image" src="https://github.com/user-attachments/assets/4355a9ce-8718-4d75-8953-067176914e7b" />

### Figura 9. Verificación posterior a la detención de Apache

Después de detener el contenedor Apache, se volvió a ejecutar el comando `docker ps` para validar el estado de los demás servicios.
<img width="1695" height="312" alt="image" src="https://github.com/user-attachments/assets/eade8f76-3501-489d-b18c-fa02bea4bcac" />

### Figura 10. Validación de independencia entre contenedores

Finalmente, se comprobó desde el navegador que el contenedor `nginx-reto` seguía respondiendo correctamente aun después de detener el contenedor Apache.

**URL utilizada:**
<img width="1446" height="574" alt="image" src="https://github.com/user-attachments/assets/9e585a78-e032-4a1a-9127-90c22cd0d6d2" />

## Dificultades encontradas

Durante la práctica se presentaron conflictos de nombre al intentar crear contenedores que ya existían previamente, como `apache-reto` y `nginx-auto`. La situación se resolvió verificando los contenedores existentes mediante `docker ps` y reutilizando los contenedores ya desplegados, evitando así duplicidad de nombres.

## Conclusión

En esta actividad se aprendió a desplegar múltiples servicios web en contenedores Docker dentro de una misma máquina, utilizando tanto publicación manual de puertos con `-p` como publicación automática mediante `-P`.

Asimismo, se verificó el funcionamiento de los servicios con `docker ps`, `docker port` y pruebas desde navegador, comprobando que diferentes contenedores pueden operar simultáneamente sin interferencia si cada uno usa puertos distintos en el host.




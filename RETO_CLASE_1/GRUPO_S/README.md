
# Grupo S

## Integrantes
- Damian Gonzalez
- Marcelo Desalvador
- Roger Cardenas

## Objetivo del reto

Configurar múltiples contenedores web ejecutándose simultáneamente en la misma máquina utilizando Docker.  
Se aplicaron diferentes estrategias de publicación de puertos utilizando las opciones `-p` y `-P`, verificando posteriormente los puertos asignados mediante los comandos `docker ps` y `docker port`.

## Diferencia entre -p y -P

| Opción | Descripción |
|------|------|
| `-p` | Permite definir manualmente el puerto del host que se conectará al puerto del contenedor |
| `-P` | Docker publica automáticamente todos los puertos expuestos por la imagen en puertos aleatorios del host |

Se verificaron los contenedores en ejecución utilizando el comando `docker ps`.  
Se observó que los contenedores `apache-reto`, `nginx-reto` y `nginx-auto` estaban activos.

<img width="1700" height="353" alt="image" src="https://github.com/user-attachments/assets/0964f122-6353-45d0-a5e6-7147423dca08" />

## Evidencia de ejecución

### Figura 1. Verificación general de contenedores en ejecución

Se utilizó el comando `docker ps` para verificar los contenedores activos en la máquina.  
En esta validación se observaron los contenedores `apache-reto`, `nginx-reto` y `nginx-auto`, junto con sus respectivos puertos publicados.

**Comando ejecutado:**
```bash
docker ps

<img width="1698" height="365" alt="image" src="https://github.com/user-attachments/assets/f13bcb7b-960e-4e8e-a8a5-88f680906090" />
**Figura 1.** Contenedores activos y puertos publicados en el host.

### Figura 2. Verificación del contenedor Apache

El contenedor `apache-reto` fue creado para exponer el servicio web Apache en el puerto 8080 del host mediante la opción `-p`.

**Comando de creación usado durante la práctica:**
```bash
docker run -d --name apache-reto -p 8080:80 httpd

<img width="552" height="121" alt="image" src="https://github.com/user-attachments/assets/0016119f-cb2f-4854-b5e2-cd7ee637ab2e" />
**Figura 2.** El puerto 80 del contenedor `apache-reto` fue publicado en el puerto 8080 del host.





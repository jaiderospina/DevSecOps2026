
# Grupo S

## Integrantes
- Damian Gonzalez
- Marcelo Desalvador
- Roger Cardenas
- ...

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

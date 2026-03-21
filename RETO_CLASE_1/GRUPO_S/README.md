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




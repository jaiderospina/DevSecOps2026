# 🐳 Reto en Clase: Acceso Público Avanzado con Múltiples Puertos y Servicios

## 👥 Grupo
Grupo E 

## 📅 Fecha
20 de Marzo 2026

## 👥 Integrantes

- Ing. Argel Ochoa Ronald David  
- Ing. Baquero Soto Mauricio  
- Ing. Buitrago Guiot Oscar Javier  
- Ing. Estefania Naranjo Novoa  

## 🏫 Curso
DevOps / Contenedores Docker
---

## 📌 Descripción
En este reto se implementa la ejecución simultánea de dos contenedores web en una misma máquina, utilizando diferentes estrategias de mapeo de puertos (`-p` y `-P`), evitando conflictos y validando su acceso desde el navegador.

---

## 🎯 Objetivo
Configurar y acceder a dos servicios web en contenedores Docker de forma concurrente, validando su funcionamiento mediante inspección de puertos y pruebas en navegador.

---

## ⚙️ Tecnologías utilizadas
- Docker
- Imagen `nginx` y `Apache`
- Navegador web

---
## 📊 Comparación entre -p y -P

| Característica | -p (Manual) | -P (Automático) |
|--------------|------------|----------------|
| Asignación de puerto | Manual | Automática |
| Control del puerto | Total | Limitado |
| Uso típico | Producción | Pruebas / desarrollo |
| Ejemplo | -p 8080:80 | -P |
| Riesgo de conflicto | Alto (si el puerto está ocupado) | Bajo |
| Facilidad de uso | Media | Alta |

### 🔎 Explicación
- **-p 8080:80**: Mapea el puerto 8080 del host al 80 del contenedor.
- **-P**: Publica todos los puertos expuestos del contenedor en puertos aleatorios del host.
  
---
## 📚 Investigación

### ❓ ¿Qué diferencia hay entre -p 8080:80 y -P?

- **-p 8080:80**: Permite definir manualmente qué puerto del host se conecta con el contenedor.
- **-P**: Docker asigna automáticamente un puerto disponible para cada puerto expuesto.

---

### ❓ ¿Qué significa 0.0.0.0:8080->80/tcp en docker ps?

Significa que:
- El contenedor expone el puerto **80**
- Está mapeado al puerto **8080 del host**
- **0.0.0.0** indica que es accesible desde cualquier IP (acceso público)

---

### ❓ ¿Qué hace docker port?

El comando:

```bash
docker port <nombre_contenedor>
```

Permite ver cómo están mapeados los puertos entre el host y el contenedor.

Ejemplo de salida:

80/tcp -> 0.0.0.0:8080

Indica que el puerto 80 del contenedor está expuesto en el puerto 8080 del host.


---

## 🚀 Paso 1: Levantar primer contenedor con puerto fijo (`-p`)
### Paso 1: Creación del contenedor web1 
Se utilizó la imagen oficial de nginx porque es ligera y rápida

Se usó
```bash
docker run -d --name web1 -p 8080:80 nginx
```

📸 Evidencia 1. Creación del contenedor nginx
![Iniciar](img/iniciar.jpg)


### 🔎 Explicación
Se mapea el puerto 8080 del host al puerto 80 del contenedor.
✔ Se utilizó -p para controlar el puerto 8080.

---

### 📸 Evidencia 2: Verificación del Contenedor web1 en ejecución 
![Evidencia1](img/Evidencia1.jpg)

---

### 🌐 Acceso
http://localhost:8080

---

### 📸 Evidencia 3: Acceso a web1 desde navegador
![Paso1](img/Paso1.png)

#### Se eligió -p para tener control total del puerto y acceder fácilmente desde el navegador.
---

## 🚀 Paso 2: Levantar segundo contenedor con puerto dinámico (`-P`)

```bash
docker run -d --name web2 -P nginx
```
#### 📸 Evidencia 4: Ejecución por comando del contenedor web2 con asignación automática de puertos
![Iniciar2](img/iniciar2.jpg)

### 🔎 Explicación
Docker asigna automáticamente un puerto disponible en el host.

#### Se utilizó -P para observar cómo Docker asigna puertos automáticamente.
---

### 📸 Evidencia 5: Contenedor web2 en ejecución
![Evidencia3](img/Evidencia3.jpg)

---

## 🔍 Paso 3: Identificación del puerto asignado

```bash
docker ps
```
### 📸 Evidencia 6: Visualización del puerto dinámico asignado con docker ps

![Evidencia5](img/Evidencia5.png)

---

### 📸 Evidencia 7: Detalle del Puerto asignado automáticamente
![Evidencia4](img/Evidencia4.png)

---

## 🌐 Acceso al segundo contenedor

[http://localhost:32768]

---


## 🕵️ Paso 4:  Inspección de puertos

```bash
docker port web2
```

---

### 📸 Evidencia 8: Inspección del puerto del contenedor web2 con docker port
![inspeccion](img/inspeccion.jpg)
---

## ⚔️ Resultado final

| Contenedor | Puerto interno | Puerto host | Estado |
|-----------|--------------|------------|--------|
| web1      | 80           | 8080       | Activo |
| web2      | 80           | Dinámico   | Activo |

Ambos servicios funcionan simultáneamente sin conflictos de puertos.

### 📸 Evidencia 09. Verificación de los contenedores activos web

![comparacion](img/comparacion.jpg)

### 📸 Evidencia 10. Verificación de los contenedores activos web por Docker Desktop

![comparacion2](img/comparacion2.jpg)

Esto permitió validar los puertos asignados.

Se accedió a:

http://localhost:8080

#### Confirmando que ambos servicios funcionan correctamente.
---
#### 🔎 Nota: Aunque se utilizaron contenedores nginx para las pruebas, el procedimiento es equivalente al uso de Apache (httpd), ya que ambos exponen el puerto 80 y permiten validar el mapeo de puertos, en razón a web 1 y web 2.
---
## 🧩 Paso 5: TERCER CONTENEDOR (-P)

## 🧪 Prueba con tercer contenedor (-P)

```bash
docker run -d --name web3 -P nginx
```
---
### 📸 Evidencia 11. Creación del contenedor web3 con puerto dinámico
![evidencia8](img/evidencia8.jpg)
---
Luego 

```bash
docker ps
docker port web3
```
---
### 📸 Evidencia 12. Verificación de contenedores y puertos
![web3](img/web3.jpg)
---


Esto permitió observar el puerto dinámico asignado automáticamente.

### 📸 Evidencia 13: Verificación en ejecución
![eviden9](img/eviden9.jpg)

Se muestra la ejecución del contenedor web3 con asignación automática de puertos usando la opción -P.

Se verifica el puerto asignado dinámicamente mediante el comando docker port web3.

### 📸 Evidencia 14: Verificación en ejecución
![eviden10](img/eviden10.jpg)


Descripción:
Se observa el estado de los contenedores en ejecución utilizando docker ps.

### 📸 Evidencia 15: Acceso al servicio
![eviden11](img/eviden11.jpg)

Descripción:
Se accede desde el navegador al puerto asignado dinámicamente validando el servicio.

---
## 🧩 “Salida de docker ps después de detener uno”

```bash
docker stop web1
docker ps
```
#### 📸 Evidencia 16. Verificación tras detener un contenedor comando

![stop1](img/stop1.jpg)

#### 📸 Evidencia 17. Verificación tras detener un contenedor en docker desktop

![stop2](img/stop2.jpg)
---

## 🧩 Prueba adicional 

```bash
docker exec -it web1 bash
echo "Servidor 1" > /usr/share/nginx/html/index.html
```

```bash
docker exec -it web2 bash
echo "Servidor 2" > /usr/share/nginx/html/index.html

```
#### 📸 Evidencia 18: Comparación de ambos servicios
![servidor1](img/servidor1.jpg)
---

### 📸 Evidencia 19: Diferenciación de servicios

![servidor](img/servidor.jpg)

---

## 🧠 Dificultades y Soluciones

## ⚠️ Dificultades encontradas

- Confusión inicial entre -p y -P.
- No identificar rápidamente el puerto asignado dinámicamente.
- Problemas al acceder desde navegador por no usar el puerto correcto.

### ✅ Soluciones

- Uso del comando `docker ps` para ver puertos.
- Uso de `docker port` para inspección detallada.
- Validación constante en navegador.

---
---

## 🧠 Conclusiones

En este reto se aprendió a gestionar el acceso público de contenedores utilizando diferentes estrategias de mapeo de puertos.

A diferencia del Taller 2, se profundizó en:
- Uso simultáneo de múltiples contenedores
- Evitar conflictos de puertos
- Interpretación de salidas de Docker
- Uso de asignación automática de puertos

Se comprendió que Docker permite desplegar múltiples servicios web en una misma máquina de forma eficiente, controlando su acceso mediante puertos específicos.

Este conocimiento es fundamental en entornos DevOps para despliegue. Además

- El uso de `-p` permite asignación manual de puertos.
- El uso de `-P` permite asignación automática.
- Docker permite múltiples servicios sin conflictos.
- `docker ps` y `docker port` son claves para inspección.

---

## ✅ Competencias alcanzadas

- Uso correcto de `-p` y `-P`
- Inspección de puertos
- Validación de servicios concurrentes
- Documentación técnica

## ✅ Bibliografía:

- Repositorio del curso:
  Documentación GitHub Repo https://github.com/jaiderospina/DevSecOps2026/
- Documentación oficial Docker: 
  https://docs.docker.com/reference/cli/docker/container/run/#publish
- Docker Hub (nginx): https://hub.docker.com/_/nginx
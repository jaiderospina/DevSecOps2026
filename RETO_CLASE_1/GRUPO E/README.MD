# 🐳 Reto en Clase: Acceso Público Avanzado con Múltiples Puertos y Servicios

## 📌 Descripción
En este reto se implementa la ejecución simultánea de dos contenedores web en una misma máquina, utilizando diferentes estrategias de mapeo de puertos (`-p` y `-P`), evitando conflictos y validando su acceso desde el navegador.

---

## 🎯 Objetivo
Configurar y acceder a dos servicios web en contenedores Docker de forma concurrente, validando su funcionamiento mediante inspección de puertos y pruebas en navegador.

---

## ⚙️ Tecnologías utilizadas
- Docker
- Imagen `nginx`
- Navegador web

---

## 🚀 Paso 1: Levantar primer contenedor con puerto fijo (`-p`)

```bash
docker run -d --name web1 -p 8080:80 nginx
```

### 🔎 Explicación
Se mapea el puerto 8080 del host al puerto 80 del contenedor.

---

### 📸 Evidencia 1: Contenedor web1 en ejecución
(INSERTAR IMAGEN AQUÍ - docker ps mostrando web1)

---

### 🌐 Acceso
http://localhost:8080

---

### 📸 Evidencia 2: Acceso a web1 desde navegador
(INSERTAR IMAGEN AQUÍ - navegador mostrando nginx en puerto 8080)

---

## 🚀 Paso 2: Levantar segundo contenedor con puerto dinámico (`-P`)

```bash
docker run -d --name web2 -P nginx
```

### 🔎 Explicación
Docker asigna automáticamente un puerto disponible en el host.

---

### 📸 Evidencia 3: Contenedor web2 en ejecución
(INSERTAR IMAGEN AQUÍ - docker ps mostrando web2 con puerto dinámico)

---

## 🔍 Paso 3: Identificación del puerto asignado

```bash
docker ps
```

Ejemplo de salida:
0.0.0.0:32768->80/tcp

---

### 📸 Evidencia 4: Puerto asignado automáticamente
(INSERTAR IMAGEN AQUÍ - salida de docker ps resaltando puerto)

---

## 🌐 Acceso al segundo contenedor

http://localhost:PUERTO_ASIGNADO

---

### 📸 Evidencia 5: Acceso a web2 desde navegador
(INSERTAR IMAGEN AQUÍ - navegador mostrando nginx en puerto dinámico)

---

## 🕵️ Inspección de puertos

```bash
docker port web2
```

---

### 📸 Evidencia 6: Inspección con docker port
(INSERTAR IMAGEN AQUÍ - resultado de docker port web2)

---

## ⚔️ Resultado final

| Contenedor | Puerto interno | Puerto host | Estado |
|-----------|--------------|------------|--------|
| web1      | 80           | 8080       | Activo |
| web2      | 80           | Dinámico   | Activo |

Ambos servicios funcionan simultáneamente sin conflictos de puertos.

---

## 🧩 Prueba adicional (opcional)

```bash
docker exec -it web1 bash
echo "Servidor 1" > /usr/share/nginx/html/index.html
```

```bash
docker exec -it web2 bash
echo "Servidor 2" > /usr/share/nginx/html/index.html
```

---

### 📸 Evidencia 7: Diferenciación de servicios
(INSERTAR IMAGEN AQUÍ - navegador mostrando “Servidor 1” y “Servidor 2”)

---

## 🧠 Conclusiones

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

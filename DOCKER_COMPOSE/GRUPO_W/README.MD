# Laboratorio Docker (WordPress + MySQL + phpMyAdmin)

# INTEGRANTES

* Lady Bautista  
* Vicente Rueda  
* Juan Carlos Murcia  
* Juan Diaz
* Jonathan Garzon

<p align="center">
  <img src="imagenes/1.png" width="600">
</p

# Requisitos previos
Windows 10/11 con virtualización habilitada (Claramente se peuede realizar el laboratorio en linux, con los respectivos ajustes requeridos)
Docker Desktop instalado y funcionando (configurado para usar WSL2).
PowerShell (ejecutado como Administrador).

# Estructura del propyecto 

D:\
└── DevSecOps\
    ├── docker-compose.yml
    ├── .env
    ├── data\
    │   ├── db\       ← datos de MySQL
    │   └── wp\       ← archivos del sitio WordPress
    ├── backups\
    └── logs\


# PASO 1 Crear la estructura de carpetas

<p align="center">
  <img src="imagenes/2.png" width="600">
</p

# PASO 2 CREAR ARCHIVO .ENV

<p align="center">
  <img src="imagenes/3.png" width="600">
</p

# VERIFICACION 

<p align="center">
  <img src="imagenes/4.png" width="600">
</p


# PASO 3 Crear docker-compose.yml en Kali

<p align="center">
  <img src="imagenes/6.png" width="600">
</p

# PASO 4 Construcción y despliegue

<p align="center">
  <img src="imagenes/7.png" width="600">
</p


# PASO 5 VERIFICACION 

# Acceso WordPress

<p align="center">
  <img src="imagenes/8.png" width="600">
</p

# Acceso phpMyAdmin


<p align="center">
  <img src="imagenes/9.png" width="600">
</p

# PASO 6 Validación de persistencia (en Kali)

Cambio de tema WordPress

<p align="center">
  <img src="imagenes/10.png" width="600">
</p

# Se detienen contenedores para verificar si los cambios quedaron alli todavia 

<p align="center">
  <img src="imagenes/11.png" width="600">
</p

# PASO 7: Comandos útiles (Kali)

<p align="center">
  <img src="imagenes/12.png" width="600">
</p






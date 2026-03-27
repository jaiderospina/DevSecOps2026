[Regresar al inicio](../../../GRUPO%20W/README.md)

# ¿Diferencia entre -p y -P?


La opción -p permite mapear manualmente un puerto del host a un puerto del contenedor, mientras que la opción -P publica automáticamente todos los puertos expuestos por el contenedor en puertos disponibles del host.

Principales Característica | -p (--publish) | -P (--publish-all) |  
|---------------------------|----------------|--------------------|  
| Control | Manual: Tú defines el puerto exacto del host. | Automático: Docker elige un puerto libre al azar. |  
| Sintaxis | -p [Host]:[Contenedor] | -P (No requiere argumentos adicionales). |  
| Rango de Puertos | Cualquier puerto disponible (ej. 80, 443, 8080). | Puertos altos efímeros (rango 49153–65535). |  
| Dependencia | Independiente de lo que diga el Dockerfile. | Obligatorio: Solo mapea puertos marcados como EXPOSE. |  
| Escalabilidad | Difícil: Múltiples contenedores chocarán si usan el mismo puerto host. | Fácil: Puedes lanzar 10 contenedores iguales sin conflictos. |  
| Predecibilidad | Alta: Siempre sabes en qué URL entrar. | Baja: Debes inspeccionar el contenedor cada vez para saber el puerto. |

# Ejemplo con -p:
docker run -d -p 8080:80 nginx

En este caso, el usuario define que el puerto 8080 del host será utilizado para acceder al puerto 80 del contenedor.


# Ejemplo con -P:
docker run -d -P nginx

Aquí Docker asigna automáticamente un puerto disponible del host para el puerto expuesto del contenedor.

 # Análisis:
- **`-p `** proporciona un mayor nivel de control sobre los puertos asignados, ya que permite definir explícitamente el puerto del host.  
  
- **`-P `** simplifica la configuración al asignar automáticamente puertos disponibles, reduciendo el riesgo de conflictos.  
  
- **`-p`** es más adecuado para entornos productivos, donde se requiere una configuración predecible y controlada.  
  
- **`-P`** resulta útil en entornos de prueba o laboratorio, donde la rapidez y la facilidad de despliegue son prioritarias.

#Durante la práctica, se evidenció que el puerto asignado mediante la opción `-P ` es dinámico, ya que Docker selecciona automáticamente un puerto disponible en el host.    
Por esta razón, es necesario consultar el puerto asignado en cada ejecución utilizando el comando: `docker ps `.

<img src="../image/docker ps.png">

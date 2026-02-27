# Taller: Gestión Segura de Repositorios y Autenticación en Git

**Materia:** Seguridad en DevSecOps
**Objetivo:** Configurar un entorno de desarrollo seguro mediante la gestión de identidades y el uso de protocolos cifrados para el transporte de código.

---

## Actividad 1: Configuración de la Identidad (Gobernanza)

En el marco de la trazabilidad y el no repudio, es vital que cada aporte al código esté firmado correctamente.

1. **Configuración Global:** Utiliza la terminal para configurar tu nombre de usuario y correo electrónico institucional/profesional.
2. **Verificación:** Ejecuta el comando para listar la configuración y asegúrate de que los cambios se hayan aplicado correctamente.

## Actividad 2: Ciclo de Vida Local a Remoto

Crea una estructura de proyecto y establece una conexión segura con la nube.

1. **Inicialización:** Crea una carpeta llamada `taller-devsecops`, inicializa un repositorio Git y crea un archivo llamado `README.md` con una breve descripción de qué es DevSecOps.
2. **Snapshot:** Realiza el primer *commit* de tu archivo.
3. **Repositorio Remoto:** Crea un repositorio privado en GitHub.
4. **Vinculación:** Conecta tu repositorio local con el remoto de GitHub utilizando la rama principal `main`.

## Actividad 3: Investigación e Implementación de Autenticación

El uso de contraseñas planas en la terminal es una vulnerabilidad. Debes investigar y aplicar **uno** de los siguientes métodos:

1. **Opción A (SSH):** Generar un par de llaves (Pública/Privada) bajo el algoritmo **Ed25519**. Configurar la llave pública en GitHub y realizar un `push` sin usar contraseñas.
2. **Opción B (PAT):** Generar un *Personal Access Token* con el principio de **mínimo privilegio** (asignando solo los permisos necesarios para escribir en repositorios).

---

## Preguntas Orientadoras (Análisis DevSecOps)

Estas preguntas deben ser respondidas al finalizar el taller para fomentar el pensamiento crítico sobre la seguridad:

1. **Trazabilidad:** ¿Por qué es un riesgo de seguridad dejar la configuración de `user.name` y `user.email` vacía o utilizar datos genéricos en un entorno empresarial?
2. **Cifrado Asimétrico:** En el caso de usar SSH, ¿cuál es la diferencia funcional entre la llave privada y la pública? ¿Qué pasaría si un tercero obtiene acceso a tu llave privada?
3. **Principio de Mínimo Privilegio:** Si decides usar un Token de Acceso Personal (PAT), ¿qué riesgos conlleva asignarle permisos de "Administrador" (Full Control) en lugar de solo permisos de "Lectura/Escritura"?
4. **Higiene del Repositorio:** ¿Para qué sirve el archivo `.gitignore` desde una perspectiva de seguridad? (Menciona al menos dos tipos de archivos que **nunca** deberían subirse al repositorio remoto).
5. **Exposición de Secretos:** Si accidentalmente subes una llave de API o una contraseña al repositorio en GitHub, ¿es suficiente con borrarla y hacer un nuevo *commit*? Justifica tu respuesta.

---

## Criterios de Evaluación

* **Correcta identidad:** Los commits muestran el nombre y correo configurados.
* **Seguridad en el transporte:** El repositorio remoto se conectó mediante SSH o PAT (comprobación de no uso de contraseña estándar).
* **Limpieza:** El repositorio no contiene archivos temporales o innecesarios.
* **Calidad de análisis:** Respuestas coherentes a las preguntas orientadoras basadas en estándares de seguridad.
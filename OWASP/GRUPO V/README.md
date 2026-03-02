## Integrantes

1. Milton Beltrán
2. Juan Mesa
3. Daniel Bermúdez
4. Jhon Alexander Ariza Ariza


Objetivos del Trabajo:

Investigar y analizar cada vulnerabilidad del OWASP Top 10.
Documentar métodos de explotación asociados con cada vulnerabilidad.
Proporcionar recomendaciones prácticas para prevenir y mitigar los riesgos asociados.


## 1 Cryptographic Failures (Fallos criptográficos)

Cuando datos sensibles no están correctamente protegidos.

Explotación:

* Interceptar datos sin HTTPS
Base de datos sin cifrar
Contraseñas almacenadas en texto plano

Prevención:

Usar HTTPS (TLS)
Hash seguro para contraseñas (bcrypt, Argon2)
Cifrar datos sensibles en base de datos
No usar algoritmos obsoletos (MD5, SHA1)

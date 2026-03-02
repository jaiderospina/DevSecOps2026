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

### Descripción

Ocurre cuando los datos sensibles no están correctamente protegidos mediante mecanismos de cifrado adecuados. Esto puede permitir que atacantes accedan a información confidencial como contraseñas, datos personales o información financiera.

---

### Métodos de Explotación

- Interceptar datos transmitidos sin HTTPS.
- Acceder a bases de datos sin cifrado.
- Obtener contraseñas almacenadas en texto plano.
- Aprovechar el uso de algoritmos criptográficos débiles u obsoletos.

---

### Prevención y Mitigación

- Utilizar HTTPS (TLS) para proteger la comunicación.
- Implementar hash seguro para contraseñas (bcrypt, Argon2).
- Cifrar datos sensibles almacenados en bases de datos.
- Evitar el uso de algoritmos obsoletos como MD5 o SHA1.
- Gestionar adecuadamente claves criptográficas y certificados digitales.

---

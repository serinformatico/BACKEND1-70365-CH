## ACTIVIDAD EN CLASE: CRUD - CR

### Consigna
Sobre una base de datos llamada “colegio”, crear una colección “estudiantes”
donde se agregarán documentos con los siguientes datos:
- nombre
- apellido
- curso
- edad
- correo
- sexo

Crear 5 estudiantes (Insert Many) con los campos mencionados arriba. Además,
crear un estudiante sólo con nombre, apellido y curso. ¿Es posible? SI
- Realizar una búsqueda para obtener a todos los estudiantes.
- Realizar una búsqueda para obtener a todos los estudiantes de sexo H (hombre)
- Realizar un conteo para obtener el número de documentos totales.
- Realizar un conteo para obtener el número de documentos totales que cumplan
  con el criterio: “Es mujer”

### Resolución
- En primer lugar, ingresar a la CLI de MongoDB con el siguiente comando:
  - **mongosh**
- Lista de comandos/consultas:
  - use colegio
  1. db.createCollection("estudiantes")
  2. db.estudiantes.insertOne({ nombre: "Juan", apellido: "Flores", curso: "PB", edad: 25, correo: "juan@gmail.com", sexo: "M" })
  3. db.estudiantes.insertOne({ nombre: "Maria", apellido: "Medina", curso: "PB", edad: 18, correo: "mar145@gmail.com", sexo: "F" })
  4. db.estudiantes.insertOne({ nombre: "Alex", apellido: "Flores", curso: "PB", edad: 30, correo: "alex2@gmail.com", sexo: "M" })
  5. db.estudiantes.insertOne({ nombre: "Lorena", apellido: "Pérez", curso: "PF", edad: 24, correo: "loren@gmail.com", sexo: "F", proyectos: [{ nombre: "Proyecto1", nota: 80 }, { nombre: "Proyecto2", nota: 90 }] })
  6. db.estudiantes.insertOne({ nombre: "Juan", apellido: "Torres", curso: "PF", edad: 25, correo: "juan.t@gmail.com", sexo: "M", hobbies: ["nadar", "ajedrez", "correr"] })
  7. db.estudiantes.find()
  4. db.estudiantes.find({ sexo: "M" })
  5. db.estudiantes.countDocuments()
  6. db.estudiantes.countDocuments({ sexo: "F"})
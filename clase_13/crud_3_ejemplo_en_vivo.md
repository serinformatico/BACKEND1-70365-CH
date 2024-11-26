## Ejemplo en vivo

### Consigna
Basado en nuestra base de datos “colegio”
- Se agregarán 5 estudiantes más, con diferentes campos y con la misma
  estructura. además, crear 1 alumno sólo con nombre.
- Realizar una búsqueda aplicando ordenamientos, proyecciones, saltos y
  límites.
- Se analizarán los resultados de las proyecciones, saltos, ordenamientos y
  límites. ¿Cómo se comportan los documentos que tienen campos incompletos?

### Resolución
- En primer lugar, ingresar a la CLI de MongoDB con el siguiente comando:
  - **mongosh**
- Lista de comandos/consultas:
  - use colegio
  1. db.estudiantes.insertMany({ nombre: "Juan", apellido: "Pereyra", curso: "PB", edad: 23, correo: "juan23@gmail.com", sexo: "M" }, { nombre: "Mariana", apellido: "Medina", curso: "PB", edad: 18, correo: "marian@gmail.com", sexo: "F" }, { nombre: "Pablo", apellido: "Gómez", curso: "PF", edad: 28, correo: "p24@gmail.com", sexo: "M" }, { nombre: "Paola", apellido: "Bianchi", curso: "PF", edad: 24, correo: "loren@gmail.com", sexo: "F" }, { nombre: "Joaquin" })
  2. db.estudiantes.find().sort({ nombre: 1 })
  3. db.estudiantes.find().sort({ nombre: -1 })
  4. db.estudiantes.find().limit(2)
  5. db.estudiantes.find().limit(2).skip(3)
## Operadores Para Filtros

- **$and** Realiza operación AND
- **$or** Realiza operación OR
- **$lt** Coincide con valores que son menores que un valor especificado.
- **$lte** Coincide con valores menores o iguales a un valor especificado.
- **$gt** Coincide con valores mayores a un valor especificado.
- **$gte** Coincide con valores mayores o iguales a un valor especificado.
- **$ne** Coincide con valores que no son iguales a un valor especificado.
- **$eq** Selecciona los documentos que son iguales a un valor especificado.
- **$exists** Selecciona los documentos según la existencia de un campo.
- **$in** Selecciona los documentos especificados en un array.
- **$nin** Coincide con ninguno de los valores especificados en un array.
- **$size** Coincide con el número de elementos especificados.
- **$all** Coincide con todos los valores definidos dentro de un array.
- **$elemMatch** Coincide con algún valor definido dentro del query.

### Resolución
- En primer lugar, ingresar a la CLI de MongoDB con el siguiente comando:
  - **mongosh**
- Lista de comandos/consultas:
  - use colegio
  1. db.estudiantes.find({ edad: { $lt: 24 } })
  2. db.estudiantes.find({ edad: { $lte: 24 } })
  3. db.estudiantes.find({ edad: { $gt: 24 } })
  4. db.estudiantes.find({ edad: { $gte: 24 } })
  5. db.estudiantes.find({ edad: { $ne: 25" } })
  6. db.estudiantes.find({ apellido: { $eq: "Flores" } })
  7. db.estudiantes.find({ $and: [{ curso: "PB" }, { edad: { $lt: 25 }}] })
  8. db.estudiantes.find({ $or: [{ curso: "PF" }, { edad: { $gte: 30 } }] })
  9. db.estudiantes.find({ hobbies: { $exists: true } })
  10. db.estudiantes.find({ nombre: { $in: ["Juan", "Maria"] } })
  11. db.estudiantes.find({ nombre: { $nin: ["Juan", "Maria"] } })
  12. db.estudiantes.find({ hobbies: { $size: 3 } })
  13. db.estudiantes.find({ hobbies: { $all: ["nadar", "correr"] } })
  14. db.estudiantes.find({ proyectos: { $elemMatch: { nombre: "Proyecto1", nota: { $gt: 75 } } } })
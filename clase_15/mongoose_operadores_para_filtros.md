## Operadores Para Filtros en Mongoose

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

### Datos
Insertar documentos en la colección Estudiantes con los siguientes datos:
``` json
  { "nombre" : "Paula", "edad" : 24 }
  { "nombre" : "Mario", "edad" : 18 }
  { "nombre" : "Lorena", "edad" : 21 }
  { "nombre" : "Luciana", "edad" : 25 }
  { "nombre" : "Carla", "edad" : 25 }
  { "nombre" : "Pablo", "edad" : 29 }
  { "nombre" : "Juan", "edad" : 22 }
  { "nombre" : "Lucia", "edad" : 25 }
  { "nombre" : "Juan", "edad" : 29 }
  { "nombre" : "Fede", "edad" : 35 }
```

### Resolución
1. Edad menor que 24:
  ``` javascript
  const estudiantes = await Estudiante.find({ edad: { $lt: 24 } });
  ```
2. Edad menor o igual a 24:
  ``` javascript
  const estudiantes = await Estudiante.find({ edad: { $lte: 24 } });
  ```
3. Edad mayor que 24:
  ``` javascript
  const estudiantes = await Estudiante.find({ edad: { $gt: 24 } });
  ```
4. Edad mayor o igual a 24:
  ``` javascript
  const estudiantes = await Estudiante.find({ edad: { $gte: 24 } });
  ```
5. Edad que no sea 25:
  ``` javascript
  const estudiantes = await Estudiante.find({ edad: { $ne: 25 } });
  ```
6. Apellido igual a "Flores":
  ``` javascript
  const estudiantes = await Estudiante.find({ apellido: "Flores" });
  ```
7. Curso es "PB" y edad menor a 25:
  ``` javascript
  const estudiantes = await Estudiante.find({ $and: [{ curso: "PB" }, { edad: { $lt: 25 } }] });
  ```
8. Curso es "PF" o edad mayor o igual a 30:
  ``` javascript
  const estudiantes = await Estudiante.find({ $or: [{ curso: "PF" }, { edad: { $gte: 30 } }] });
  ```
9. Documentos donde exista el campo hobbies:
  ``` javascript
  const estudiantes = await Estudiante.find({ hobbies: { $exists: true } });
  ```
10. Nombre es "Juan" o "Maria":
  ``` javascript
  const estudiantes = await Estudiante.find({ nombre: { $in: ["Juan", "Maria"] } });
  ```
11. Nombre no es "Juan" ni "Maria":
  ``` javascript
  const estudiantes = await Estudiante.find({ nombre: { $nin: ["Juan", "Maria"] } });
  ```
12. Documentos donde el array hobbies tenga tamaño 3:
  ``` javascript
  const estudiantes = await Estudiante.find({ hobbies: { $size: 3 } });
  ```
13. Documentos donde el array hobbies contenga ambos elementos "nadar" y "correr":
  ``` javascript
  const estudiantes = await Estudiante.find({ hobbies: { $all: ["nadar", "correr"] } });
  ```
14. Documentos donde el array proyectos contenga un elemento con nombre "Proyecto1" y nota mayor a 75:
  ``` javascript
  const estudiantes = await Estudiante.find({ proyectos: { $elemMatch: { nombre: "Proyecto1", nota: { $gt: 75 } } } });
  ```
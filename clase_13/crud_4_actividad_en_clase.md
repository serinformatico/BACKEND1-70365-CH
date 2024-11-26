## ACTIVIDAD EN CLASE: Operaciones con Filtros

### Consigna
Sobre la base y los datos cargados anteriormente
1. Insertar cinco documentos más en la colección clientes con los siguientes
datos:
``` json
  { "nombre" : "Pablo", "edad" : 25 }
  { "nombre" : "Juan", "edad" : 22 }
  { "nombre" : "Lucia", "edad" : 25 }
  { "nombre" : "Juan", "edad" : 29 }
  { "nombre" : "Fede", "edad" : 35 }
```

2. Listar todos los documentos de la colección clientes ordenados por edad
   descendente.
3. Listar el cliente más joven.
4. Listar el segundo cliente más joven.
5. Listar los clientes llamados 'Juan'
6. Listar los clientes llamados 'Juan' que tengan 29 años.
7. Listar los clientes llamados 'Juan' ó 'Lucia'.
8. Listar los clientes que tengan más de 25 años.
9. Listar los clientes que tengan 25 años ó menos.
10. Listar los clientes que NO tengan 25 años.
11. Listar los clientes que estén entre los 26 y 35 años.
12. Actualizar la edad de Fede a 36 años, listando y verificando que no
    aparezca en el último listado.
13. Actualizar todas las edades de 25 años a 26 años, listando y verificando
    que aparezcan en el último listado.
14. Borrar los clientes que se llamen 'Juan' y listar verificando el resultado.
15. Eliminar además todos los documentos de estudiantes que hayan quedado con
    algún valor.

### Resolución
- En primer lugar, ingresar a la CLI de MongoDB con el siguiente comando:
  - **mongosh**
- Lista de comandos/consultas:
  - use base_crud
  - db.createCollection("clientes")
  1. db.clientes.insertMany([{ "nombre" : "Pablo", "edad" : 25 }, { "nombre" : "Juan", "edad" : 22 }, { "nombre" : "Lucia", "edad" : 25 }, { "nombre" : "Juan", "edad" : 29 }, { "nombre" : "Federico", "edad" : 35 }])
  2. db.clientes.find().sort({ edad: -1})
  3. db.clientes.find().sort({ edad: 1}).limit(1)
  4. db.clientes.find().sort({ edad: 1}).limit(1).skip(1)
  5. db.clientes.find({ nombre: "Juan"})
  6. db.clientes.find({ $and: [{ nombre: "Juan" }, { edad: 29 }] })
  7. db.clientes.find({ $or: [{ nombre: "Juan" }, { nombre: "Lucia" }] })
  8. db.clientes.find({ edad: {$gt: 25} })
  9. db.clientes.find({ edad: {$lte: 25} })
  10. db.clientes.find({ edad: {$ne: 25} })
  11. db.clientes.find({ $and: [{ edad: {$gte: 25} }, { edad: {$lte: 35} }] })
  12. db.clientes.updateOne({ nombre: "Fede" }, { $set: { edad: 36 } })
  13. db.clientes.updateMany({ edad: 25 }, { $set: { edad: 26 } })
  14. db.clientes.deleteMany({ nombre: "Juan" })
  15. db.estudiantes.deleteMany({})
## Comandos de MongoDB

- En primer lugar, ingresar a la CLI de MongoDB con el siguiente comando:
  - **mongosh**
- Insertar un documento en la colección users
  - **db.users.insertOne({ id: 1, name: "Juan" })**
- Insertar dos o más documentos en la colección users
  - **db.users.insertMany([{ id: 2, name: "Pedro" }, { id: 3, name: "Lorena"}])**


- Obtener todos los documentos de la colección users
  - **db.users.find()**
- Obtener todos los documentos de la colección users (resultados embellecidos)
  - **db.users.find().pretty()**
- Obtener todos los documentos de la colección users por criterios
  - **db.users.find({ gender: "F" })**

- Contar los documentos de la colección users
  - **db.users.estimatedDocumentCount()**
- Contar los documentos de la colección users por criterios
  - **db.users.countDocuments({ id: {$gte: 2} })**

- Eliminar una base de datos seleccionada
  - **db.dropDatabase()**
- Salir de la CLI de MongoDB (ctrl + D)
  - **exit**
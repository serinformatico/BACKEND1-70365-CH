## Aggregation en MongoDB

### Principales Stages
- $count
   - Este operador cuenta el número de documentos que pasan a través
     del pipeline de agregación.
   - Ejemplo: Contar el número total de estudiantes e insertar el resultado
     dentro de un campo denominado "totalStudents"
      ```sh
      db.students.aggregate([{ $count: "totalStudents" }]);
      ```

- $group
   - Agrupa los documentos por un campo especificado y puede realizar
     cálculos agregados en los documentos agrupados.
   - Ejemplo: Contar cuántos estudiantes hay por cada nombre.
      ```sh
      db.students.aggregate([{ $group: { _id: "$firstName", count: { $sum: 1 }}}]);
      ```
   - Además, en vez de $sum se puede emplear $avg, $max o $min siempre que el campo sea numérico.

- $limit
   - Limita el número de documentos en la salida.
   - Ejemplo: Obtener los primeros 5 estudiantes.
      ```sh
      db.students.aggregate([{ $limit: 5 }]);
      ```

- $lookup
   - Realiza una operación de left join para unir documentos de otra
     colección.
   - Ejemplo: Unir los documentos de los cursos con los estudiantes basándose
     en los IDs de los cursos e insertarlos dentro de un campo denominado "courseDetails".
      ```sh
      db.students.aggregate([{ $lookup: {
         from: "courses",
         localField: "courses",
         foreignField: "_id",
         as: "courseDetails"
      } }]);
      ```

- $set
   - Agrega nuevos campos a los documentos o actualiza los existentes.
   - Ejemplo: Agregar un campo "fullName" concatenando "name" y "lastName".
      ```sh
      db.students.aggregate([{ $set: { fullName: { $concat: ["$firstName", " ", "$lastName"] }} }]);
      ```

- $unset
   - Elimina un campo de los documentos existentes.
   - Ejemplo: Eliminar el campo "fullName".
      ```sh
      db.students.aggregate([{ $unset: "fullName" }]);
      ```

- $match
   - Filtra los documentos para pasar solo aquellos que cumplan con las
     condiciones especificadas.
   - Ejemplo: Obtener los primeros 2 estudiantes.
      ```sh
      db.students.aggregate([{ $match: { lastName: "MEDINA" }}, { $limit: 2 }]);
      ```

- $match & $group
   - Ejemplo: Contar cuántos estudiantes hay con el apellido "MEDINA".
      ```sh
      db.students.aggregate([{ $match: { lastName: "MEDINA" }}, { $group: { _id: "$firstName", count: { $sum: 1 }}}]);
      ```

- $skip
   - Omite un número especificado de documentos en la salida.
   - Ejemplo: Omitir los primeros 5 estudiantes y obtener el resto.
      ```sh
      db.students.aggregate([{ $skip: 5 }]);
      ```

- $merge
   - Escribe los resultados de la agregación en una colección especificada.
     Si la colección no existe, se crea.
   - Ejemplo: Escribir los resultados en una colección "mergedStudents".
      ```sh
      db.students.aggregate([{ $match: { lastName: "MEDINA" }}, { $merge: { into: "mergedStudents" }}]);
      ```

- $sort
   - Ordena los documentos de acuerdo con el campo especificado.
   - Ejemplo: Ordenar los estudiantes por apellido en orden ascendente.
      ```sh
      db.students.aggregate([{ $sort: { lastName: 1 } }]);
      ```

### Ejemplos en Mongoose
- $count
   ```js
   const result = await Student.aggregate([{ $count: "totalStudents" }]);
   ```

- $match & $group
   ```js
   const result = await Student.aggregate([
      { $match: { lastName: "MEDINA" } },
      { $group: { _id: "$name", count: { $sum: 1 } } }
   ]);
   ```

- $merge
   ```js
   const result = await Student.aggregate([
      { $match: { lastName: "MEDINA" } },
      { $merge: { into: "mergedStudents" } }
   ]);
   ```

[Docs - Aggregation Reference](https://www.mongodb.com/docs/manual/reference/aggregation/)
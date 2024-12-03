## Búsqueda avanzada en Mongoose

- **db.coll.distinct( val )** Devuelve un array con los distintos valores
  que toma un determinado campo en los documentos de la colección.
- **db.coll.ﬁnd({doc.subdoc:value})** Se utiliza para filtrar sub-documentos.
- **db.coll.ﬁnd({name: /^Max$/i})** Filtra utilizando expresiones regulares

### Resolución
1. 
  ``` javascript
  const estudiantes = await Estudiante.distinct("curso");
  ```
2. 
  ``` javascript
  const estudiantes = await Estudiante.find({ apellido: "Flores" });
  ```
3. 
  ``` javascript
  const estudiantes = await Estudiante.find({ nombre: /^Ju/i });
  ```

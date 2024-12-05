## Índices en MongoDB-Mongoose


Un índice en una base de datos es una estructura que mejora la velocidad de las operaciones de búsqueda y consulta de datos. Funciona de manera similar a un índice en un libro, donde los términos clave (en este caso, valores de columnas específicas) están ordenados y apuntan directamente a las ubicaciones físicas de los datos en la base de datos.

B-tree (Árbol B): Es una estructura de datos que organiza los datos de forma que las búsquedas, inserciones y eliminaciones sean eficientes. Permite mantener los datos ordenados para realizar búsquedas rápidas.

### Tipos de índices

- Índices Simples: Son índices sobre un solo campo de un documento en una colección.
- Índices Compuestos: Son índices sobre múltiples campos en un documento.
- Índices Únicos: Garantizan que los valores de los campos indexados sean únicos en la colección.
- Índices Compuestos Únicos: Combina múltiples campos y asegura que la combinación de valores sea única en la colección.
- Índices de Texto: Son índices especiales para realizar búsquedas de texto completo en campos de texto.


### Ejemplo en JS
``` js
   const userSchema = new Schema({
      nickName: {
         type: String,
         index: { name: "idx_nickname" }, // Índice simple
      },
      firstName: { type: String },
      lastName: { type: String },
      email: {
         type: String,
         unique: true, // Índice único
      },
      description: {
         type: String,
         index: { type: "text", name: "idx_txt_description" }, // Índice de tipo texto
      },
   });

   userSchema.index({ firstName: 1, lastName: 1 }, { name: "idx_firstname_lastname" }); // Índice compuesto.
   userSchema.index({ dni: 1, address: 1 }, { name: "idx_dni_address", unique: true }); // Índice compuesto único.
```
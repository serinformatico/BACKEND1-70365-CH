## Ejemplo en vivo

### Consigna
Se creará una base de datos llamada “baseCRUD”.
1. Se agregará una colección llamada “mascotas”
2. Se agregarán 3 mascotas con las propiedades: nombre, specie, edad
3. Se buscarán mascotas por su especie
4. Contar el número de mascotas totales agregadas.

### Resolución
- En primer lugar, ingresar a la CLI de MongoDB con el siguiente comando:
  - **mongosh**
- Lista de comandos/consultas:
  - use base_crud
  1. db.createCollection("mascotas")
  2. db.mascotas.insertMany([{ nombre: "Firulais", especie: "Perro", edad: 2 }, { nombre: "Dinamita", especie: "Tortuga", edad: 23 }, { nombre: "Manchitas", especie: "Perro", edad: 5 } ])
  3. db.mascotas.find({ especie: "Perro" })
  4. db.mascotas.countDocuments()
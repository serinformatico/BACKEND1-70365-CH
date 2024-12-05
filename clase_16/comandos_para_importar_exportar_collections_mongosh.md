## Comando para importar/exportar collections con Mongo Shell

1. Comando para importar una collection local en formato json dentro de un Cluster de MongoDB
   ```sh
      mongoimport --uri="mongodb+srv://cluster0.4i0l5oa.mongodb.net/" -u tuUsuario -p tuPassword --db="nombreDeLaBaseDeDatos" --collection="nombreDeLaColeccion" --file="./nombreDelArchivo.json"
   ```
2. Comando para importar una collection local en formato json (array) dentro de un Cluster de MongoDB
   ```sh
      mongoimport --uri="mongodb+srv://cluster0.4i0l5oa.mongodb.net/" -u tuUsuario -p tuPassword --db="nombreDeLaBaseDeDatos" --collection="nombreDeLaColeccion" --file="./nombreDelArchivo.json" --jsonArray
   ```
3. Comando para exportar una collection desde un Cluster de MongoDB
   ```sh
      mongoexport --uri="mongodb+srv://cluster0.4i0l5oa.mongodb.net/" -u tuUsuario -p tuPassword --db="nombreDeLaBaseDeDatos" --collection="nombreDeLaColeccion" --out="./nombreDelArchivoDeSalida.json"
   ```
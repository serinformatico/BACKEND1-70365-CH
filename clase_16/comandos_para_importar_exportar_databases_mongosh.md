## Comando para importar/exportar databases con Mongo Shell

1. Comando para exportar una base de datos de MongoDB:
   ```sh
      mongodump --uri="mongodb+srv://tuUsuario:tuPassword@cluster0.4i0l5oa.mongodb.net/nombreDeLaBaseDeDatos" --out="./backups" --gzip
   ```
   - --out: Especifica el directorio donde se guardarán los archivos de respaldo.
   - --gzip: Indica que los archivos de respaldo deben ser comprimidos en formato gzip.
2. Comando para importar una base de datos de MongoDB:
   ```sh
      mongorestore --uri="mongodb+srv://tuUsuario:tuPassword@cluster0.4i0l5oa.mongodb.net/" --nsInclude="nombreDeLaBaseDeDatos.*" --drop --gzip ./backups
   ```
   - --nsInclude: Indica que solo las colecciones dentro de la base de datos indicada deben ser restauradas.
   - --drop: Indica que se deben eliminar las colecciones existentes en la base de datos antes de restaurar.
   - --gzip: Indica que los archivos de respaldo están comprimidos en formato gzip.
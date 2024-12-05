## Método explain()

El método explain() se utiliza para obtener información detallada sobre
cómo MongoDB ejecuta una consulta. Este método es útil para analizar el
rendimiento de las consultas y entender cómo se están utilizando los
índices.

### Información de relevancia:
   - nReturned: Es el número de documentos devueltos por la consulta.
   - executionTimeMillis: Es el tiempo total que tomó la ejecución de
      la consulta en mili-segundos.
   - totalDocsExamined: El número total de documentos examinados durante
      la ejecución de la consulta.
   - stage: El valor "FETCH" significa que se recuperaron documentos
      específicos de la colección.
   - stage: El valor "COLLSCAN" indica que se realizó un escaneo completo
      de la colección.
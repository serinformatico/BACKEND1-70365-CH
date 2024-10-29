/*
    1. Crear un servidor con el módulo nativo de nodejs "http". Setear una
       respuesta que contenga el mensaje "¡Mi primer hola mundo desde backend!"
    2. El servidor debe escuchar en el puerto 8080 (Correr con nodemon)
    3. Probar el servidor desde el navegador.
    4. Hacer algún cambio en código y corroborar que se reinicie automáticamente.
*/

import http from "http";

// Se define el puerto en el que el servidor escuchará las solicitudes
const PORT = 8080;

// Se crea el servidor HTTP
const app = http.createServer((request, response) => {
    // Se establece el encabezado de la respuesta para indicar el tipo de contenido
    response.setHeader("Content-Type", "text/plain; charset=utf8");
    // Se envía la respuesta al cliente
    response.end("¡Mi primer hola mundo desde backend!");
});

// Se levanta el servidor oyendo en el puerto definido
app.listen(PORT, () => {
    console.log(`Ejecutándose en http://localhost:${PORT}`);
});
/*
    Se profundizará sobre la sintaxis de las operaciones
    síncronas de archivos con fs.
*/

import fs from "fs";

const filepath = "./files/ejemplo.txt";

// Crea el archivo "ejemplo.txt" y escribe "¡Hola Mundo!".
fs.writeFileSync(filepath, "¡Hola Mundo!");

if (fs.existsSync(filepath)) {
    // Lee el contenido del archivo
    const content = fs.readFileSync(filepath, "utf8");
    console.log("LECTURA N°1", content);

    // Agrega contenido al final del archivo.
    fs.appendFileSync(filepath, " Bienvenidos");

    // Lee nuevamente el contenido del archivo.
    const currentContent = fs.readFileSync(filepath, "utf8");
    console.log("LECTURA N°2", currentContent);

    // Elimina el archivo.
    fs.unlinkSync(filepath);
}
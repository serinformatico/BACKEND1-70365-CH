/*
    Se realizará el mismo procedimiento del ejemplo 1, haciendo
    énfasis en los callbacks y cómo se manejan.
*/

import fs from "fs";

const filepath = "./files/ejemplo.txt";

// Crea el archivo "ejemplo.txt" y escribe "¡Hola Mundo!".
const writeContent = (content, nextCallback) => {
    return fs.writeFile(filepath, content, (error) => {
        if (error) {
            console.log('Error al escribir contenido en el archivo');
        }

        nextCallback();
    });
};

// Lee el contenido del archivo
const readContent = (nextCallback) => {
    fs.readFile(filepath, "utf8", (error, result) => {
        if (error) {
            console.log('Error al leer contenido en el archivo');
        }

        nextCallback(result);
    });
};

// Agrega contenido al final del archivo.
const appendContent = (content, nextCallback) => {
    fs.appendFile(filepath, content, (error) => {
        if (error) {
            console.log('Error al leer contenido en el archivo');
        }
        nextCallback();
    });
};

// Elimina el archivo.
const deleteFile = () => {
    if (fs.existsSync(filepath)) {
        fs.unlink(filepath, (error) => {
            if (error) {
                console.log('Error al eliminar el archivo');
            }
        });
    } else {
        console.log("El archivo no existe");
    }
};

const execute = () => {
    writeContent("Hola Mundo", () => {
        readContent((content1) => {
            console.log("\nINSERT:", content1);
            appendContent("\nBienvenidos", () => {
                readContent((content2) => {
                    console.log("\nAPPEND:", content2);
                    deleteFile();
                });
            });
        });
    });

    // Esto está tomando forma de un Callback Hell y se debe evitar.
    // La solución es usar fs.promises
};

execute();
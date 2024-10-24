/*
    Se realizará el mismo procedimiento que los ejemplos 1 y 2, pero
    trabajando fs con su sub-módulo promises. La implementación será
    con async/await.
*/

import fs from "fs";

const filepath = "./files/ejemplo.txt";

// Crea el archivo "ejemplo.txt" y escribe "¡Hola Mundo!".
const writeContent = async (content) => {
    try {
        await fs.promises.writeFile(filepath, content);
    } catch (error) {
        throw new Error("Error al escribir el archivo.");
    }
};

// Lee el contenido del archivo
const readContent = async () => {
    try {
        return await fs.promises.readFile(filepath, "utf8");
    } catch (error) {
        throw new Error("Error al leer el archivo.");
    }
};

// Agrega contenido al final del archivo.
const appendContent = async (content) => {
    try {
        await fs.promises.appendFile(filepath, content);
    } catch (error) {
        throw new Error("Error al agregar contenido en el archivo.");
    }
};

// Elimina el archivo.
const deleteFile = async () => {
    try {
        if (fs.existsSync(filepath)) {
            fs.promises.unlink(filepath);
        } else {
            console.log("El archivo no existe");
        }
    } catch (error) {
        throw new Error("Error al eliminar el archivo.");
    }
};

const execute = async () => {
    await writeContent("Hola Mundo");
    const content1 = await readContent();
    console.log("\nINSERT:", content1);

    await appendContent("\nBienvenido");
    const content2 = await readContent();
    console.log("\nAPPEND:", content2);

    await deleteFile();
};

execute();
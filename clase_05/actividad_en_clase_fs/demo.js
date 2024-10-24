/*
    ACTIVIDAD EN CLASE: Lectura y escritura de archivos

    Escribir un programa ejecutable bajo node.js que realice las
       siguientes acciones:
        1. Abra una terminal en el directorio del archivo y ejecute la
          instrucción: npm init -y. Esto creará un archivo especial
          (lo veremos más adelante) de nombre package.json.
        2.- Lea el archivo package.json y declare un objeto con el siguiente
          formato y datos:
            const info = {
                contentStr: (content del archivo leído en formato string),
                contentObj: (content del archivo leído en formato objeto),
                size: (tamaño en bytes del archivo)
            }
        3. Muestre por consola el objeto info luego de leer el archivo.
        4. Guardar el objeto info en un archivo llamado info.json dentro de la
           misma carpeta de package.json.
        5. Incluir el manejo de errores (con throw new Error).
        6. Utilizar el módulo promises de fs dentro de una función async/await
           y utilizar JSON.stringify + JSON.parse para poder hacer las
           transformaciones json->objeto y viceversa.
*/

import fs from "fs";

const filepath = "./files/info.json";

const readContent = async (filepath) => {
    try {
        const content = await fs.promises.readFile(filepath, "utf8");
        return content || "{}";
    } catch (error) {
        throw new Error("Error al leer el archivo.");
    }
};

const writeContent = async (filepath, content) => {
    try {
        await fs.promises.writeFile(filepath, content);
    } catch (error) {
        throw new Error("Error al escribir el archivo.");
    }
};

const execute = async () => {
    const content = await readContent(filepath);

    const info = {
        contentStr: JSON.stringify(content, null, "\t"),
        contentObj: JSON.parse(content),
        size: new Blob([content]).size
    };

    console.log(info);

    await writeContent(filepath, JSON.stringify(info, null, "\t"));
};

execute();

/*
    ACTIVIDAD EN CLASE: Almacenar fecha y hora

    1. Realizar un programa que cree un archivo en el cual escriba la
       fecha y la hora actual. Posteriormente leer el archivo y mostrar
       el contenido por consola.
    2. Utilizar el módulo fs y sus operaciones de tipo callback.
*/

import fs from "fs";
import moment from "moment";

const filepath = "./files/ejemplo.txt";
const currentDate = moment().format("DD-MM-YYYY");
const currentTime = moment().format("HH:mm:ss");

fs.writeFile(filepath, `La fecha y hora actual es ${currentDate} ${currentTime}`, (error) => {
    if (error) {
        console.log("Error al escribir el archivo.");;
    }
});

fs.readFile(filepath, "utf8", (error, result) => {
    if (error) {
        console.log("Error al leer el archivo.");;
    }

    console.log(result);
});
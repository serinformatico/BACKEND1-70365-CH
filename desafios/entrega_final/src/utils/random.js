import moment from "moment";
import path from "path";

// Genera un número aleatorio entre un número inicial y número final (inclusive)
export const generateNumber = (startNumber, endNumber) => {
    if (startNumber > endNumber) {
        throw new Error("El número inicial no puede ser mayor que el número final");
    }

    return Math.floor(Math.random() * (endNumber - startNumber + 1) + startNumber);
};

// Genera un nombre de archivo único utilizando un número aleatorio, la
// fecha y hora actual y la extensión del archivo original
export const generateNameForFile = (filename) => {
    if (!filename || filename.indexOf(".") === -1) {
        throw new Error("Nombre de archivo inválido");
    }

    const randomNumber = generateNumber(1000, 9999);
    const dateTime = moment().format("DDMMYYYY_HHmmss");
    const extension = path.extname(filename);

    return `file_${randomNumber}_${dateTime}${extension}`;
};
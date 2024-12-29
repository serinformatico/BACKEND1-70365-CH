import multer from "multer";
import paths from "./paths.js";

import { generateNameForFile } from "./random.js";

// Configuración del almacenamiento para multer
const storage = multer.diskStorage({
    // Define el destino para almacenar los archivos subidos
    destination: (req, file, callback) => {
        callback(null, paths.images);
    },
    // Define el nombre del archivo subido
    filename: (req, file, callback) => {
        const filename = generateNameForFile(file.originalname);
        callback(null, filename);
    },
});

const uploader = multer({ storage });

export default uploader;
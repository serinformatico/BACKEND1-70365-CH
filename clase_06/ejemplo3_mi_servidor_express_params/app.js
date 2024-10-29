/*
    PATH PARAMS: Caso práctico de uso de params
    1. Dado un arreglo de objetos de tipo usuario, realizar un servidor en
       express que permita obtener dichos usuarios.
    2. La ruta raíz "/" debe devolver todos los usuarios
    3. la ruta /:userId debe devolver sólo al usuario con dicho Id.
*/

import express from "express";
import users from "./usuarios.js";

// Se crea una instancia de la aplicación Express
const app = express();

// Se define el puerto en el que el servidor escuchará las solicitudes
const PORT = 8080;

// Se define una ruta GET para el endpoint que devuelve los usuarios
app.get("/", (request, response) => {
    // Se convierte la lista de usuarios en formato JSON
    const usersJSON = JSON.stringify(users);

    response.json(usersJSON);
});

// Se define una ruta GET para el endpoint que devuelve un usuario en específico
app.get("/:userId", (request, response) => {
    // Se extrae el userId de los parámetros de la solicitud
    const { userId } = request.params;

    // Se busca el usuario que coincide con el userId proporcionado
    const userFound = users.find((user) => user.id === Number(userId));

    // Si no se encuentra el usuario, se envía un mensaje de error
    if (!userFound) {
        return response.json({ error: "Id de usuario no encontrado" });
    }

    // Se convierte el usuario encontrado en formato JSON
    const userFoundJSON = JSON.stringify(userFound);

    response.json(userFoundJSON);
});

// Se levanta el servidor oyendo en el puerto definido
app.listen(PORT, () => {
    console.log(`Ejecutándose en http://localhost:${PORT}`);
});
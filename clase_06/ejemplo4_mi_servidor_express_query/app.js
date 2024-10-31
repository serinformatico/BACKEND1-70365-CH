/*
    QUERY PARAMS: Caso práctico de uso de req.query
    1. Dado un arreglo de objetos de tipo usuario, vamos a hacer un
       filtro por país
    2. La ruta raíz "/" debe devolver todos los usuarios, pero ahora
       colocaremos un query param con ? indicando que queremos un
       país específico. En caso de enviarlo sin query, debe devolver
       a todos los usuarios.
*/

import express from "express";
import users from "./usuarios.js";

// Se crea una instancia de la aplicación Express
const app = express();

// Se define el puerto en el que el servidor escuchará las solicitudes
const PORT = 8080;

// Se define una ruta GET para el endpoint que devuelve los usuarios
// filtrados opcionalmente por su país
app.get("/", (request, response) => {
    const { country } = request.query;
    let usersResponse = users;

    if (country) {
        usersResponse = users.filter((user) => user.country === country.trim().toUpperCase());
    }

    const usersResponseJSON = JSON.stringify(usersResponse);

    response.status(200).json(usersResponseJSON);
});

// Se levanta el servidor oyendo en el puerto definido
app.listen(PORT, () => {
    console.log(`Ejecutándose en http://localhost:${PORT}`);
});
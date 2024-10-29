/*
    1. Estructurar un servidor basado en express, el cual escuche peticiones
       en el puerto 8080
    2. Realizar una función para el método GET en la ruta "/saludo", el cual
       responderá con "¡Hola a todos, pero ahora desde express!"
    3. Ejecutar con nodemon y probar en el navegador el endpoint generado
*/

import express from "express";

// Se crea una instancia de la aplicación Express
const app = express();

// Se define el puerto en el que el servidor escuchará las solicitudes
const PORT = 8080;

// Se define una ruta GET para el endpoint "http://localhost:8080/saludo"
app.get("/saludo", (request, response) => {
    response.send("¡Hola a todos, pero ahora desde express!>"); // Respuesta en formato HTML
});

// Se define una ruta GET para el endpoint "http://localhost:8080/bienvenida"
app.get("/bienvenida", (request, response) => {
    response.send("<h1 style='color: blue;'>¡Bienvenidos!</h1>"); // Respuesta en formato HTML
});

// Se define una ruta GET para el endpoint "http://localhost:8080/usuario"
app.get("/usuario", (request, response) => {
    const usuario = {
        nombre: "Juan",
        apellido: "Medina",
        edad: 20,
        correo: "juan@gmail.com"
    };

    const usuarioJSON = JSON.stringify(usuario);
    response.json(usuarioJSON); // Respuesta en formato JSON
});

// Se levanta el servidor oyendo en el puerto definido
app.listen(PORT, () => {
    console.log(`Ejecutándose en http://localhost:${PORT}`);
});
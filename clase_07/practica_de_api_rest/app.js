import express from "express";
import { users, generateId } from "./usuarios.js";

// Se crea una instancia de la aplicación Express
const app = express();

// Se define el puerto en el que el servidor escuchará las solicitudes
const PORT = 8080;

// Middleware para acceder al contenido de formularios codificados en URL
app.use(express.urlencoded({ extended: true }));

// Middleware para acceder al contenido JSON de las solicitudes
app.use(express.json());

// Endpoint: Método GET que escucha en la URL http://localhost:8080/api/users
// Devuelve los usuarios en formato JSON
app.get('/api/users', (req, res) => {
    res.status(200).json({ status: "success", users });
})

// Endpoint: Método GET que escucha en la URL http://localhost:8080/api/users/2
// En caso de éxito, devuelve un usuario en específico en formato JSON
app.get('/api/users/:id', (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).json({ status: "error", message: "ID debe ser un número entero" })
    }

    const user = users.find((item) => item.id === Number(id));

    if (!user) {
        return res.status(404).json({ status: "error", message: "ID no encontrado" })
    }

    res.json({ status: "success", user });
})

// Endpoint: Método POST que escucha en la URL http://localhost:8080/api/users
// En caso de éxito, crear un usuario y lo devuelve en formato JSON
app.post('/api/users', (req, res) => {
    const { firstName, lastName, age, email, country } = req.body;

    if (!firstName || !lastName || !age || !email || !country) {
        return res.status(400).json({ status: "error", message: "Faltan datos obligatorios" })
    }

    users.push({ id: generateId(), firstName, lastName, age, email, country });

    res.json({ status: "success", user: users[users.length-1] });
})

// Endpoint: Método PUT que escucha en la URL http://localhost:8080/api/users/2
// En caso de éxito, modifica un usuario y lo devuelve en formato JSON
app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, age, email, country } = req.body;

    if (!firstName || !lastName || !age || !email || !country) {
        return res.status(400).json({ status: "error", message: "Faltan datos obligatorios" })
    }

    const index = users.findIndex((item) => item.id === Number(id));

    if (index < 0) {
        return res.status(404).json({ status: "error", message: "ID no encontrado" })
    }

    users[index] = {
        ...users[index],
        firstName,
        lastName,
        age,
        email,
        country
    }

    res.json({ status: "success", user: users[index] });
})

// Endpoint: Método DELETE que escucha en la URL http://localhost:8080/api/users/2
// En caso de éxito, elimina un usuario
app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const index = users.findIndex((item) => item.id === Number(id));

    if (index < 0) {
        return res.status(404).json({ status: "error", message: "ID no encontrado" })
    }

    users.splice(index, 1);

    res.json({ status: "success" })
});

// Se levanta el servidor oyendo en el puerto definido
app.listen(PORT, () => {
    console.log(`Ejecutándose en http://localhost:${PORT}`);
});
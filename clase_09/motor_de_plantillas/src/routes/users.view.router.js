import { Router } from "express";
import UserManager from "../managers/UserManager.js";

const router = Router();
const userManager = new UserManager();

// Ruta para renderizar una lista de usuarios
router.get("/", async (req, res) => {
    try {
        const users = await userManager.getAll(req.params.id);
        res.status(200).render("users", { title: "Lista de Usuarios", users });
    } catch (error) {
        res.status(error.code || 500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});

// Ruta para renderizar el formulario de registro de usuario
// Este endpoint debe estar antes de "/:id" para evitar error de interpretación del servidor
router.get("/register", async (req, res) => {
    try {
        res.status(200).render("register", { title: "Registrar Usuario" });
    } catch (error) {
        res.status(error.code || 500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});

// Ruta para renderizar los datos de un usuario por su ID
router.get("/:id", async (req, res) => {
    try {
        const user = await userManager.getOneById(req.params.id);
        res.status(200).render("user", { title: "Datos Personales", user, esMayorDeEdad: user.age >= 21 });
    } catch (error) {
        res.status(error.code || 500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});

export default router;
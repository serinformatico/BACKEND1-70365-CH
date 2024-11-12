import { Router } from "express";
import UserManager from "../managers/UserManager.js";

const router = Router();
const userManager = new UserManager();

// Ruta para obtener los usuarios
router.get("/", async (req, res) => {
    try {
        const users = await userManager.getAll(req.query);
        res.status(200).json({ status: "success", payload: users });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});

// Ruta para obtener un usuario por su ID
router.get("/:id", async (req, res) => {
    try {
        const user = await userManager.getOneById(req.params.id);
        res.status(200).json({ status: "success", payload: user });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});

// Ruta para crear un usuario
router.post("/", async (req, res) => {
    try {
        const user = await userManager.insertOne(req.body, req.file);
        res.status(201).json({ status: "success", payload: user });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});

// Ruta para actualizar un usuario por su ID
router.put("/:id", async (req, res) => {
    try {
        const user = await userManager.updateOneById(req.params.id, req.body, req.file);
        res.status(200).json({ status: "success", payload: user });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});

// Ruta para eliminar un usuario por su ID
router.delete("/:id", async (req, res) => {
    try {
        await userManager.deleteOneById(req.params.id);
        res.status(200).json({ status: "success" });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});

export default router;
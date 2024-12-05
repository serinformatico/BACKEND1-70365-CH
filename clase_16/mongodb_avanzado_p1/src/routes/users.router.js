import { Router } from "express";
import UserManager from "../managers/UserManager.js";
import UserModel from "../models/user.model.js";

const router = Router();
const userManager = new UserManager();

// Ruta para analizar el rendimiento de una consulta con explain()
router.get("/explain", async (req, res) => {
    try {
        const filters = { $and: [{ firstName: "Martin" }, { lastName: "Torres" }] };
        const explanation = await UserModel.find(filters).explain();
        res.status(200).json({ status: "success", payload: explanation.executionStats });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});

// Ruta para obtener usuarios
router.get("/", async (req, res) => {
    try {
        const users = await userManager.getAll(req.query);
        res.status(200).json({ status: "success", payload: users });
    } catch (error) {
        res.status(error.code).json({ status: "error", message: error.message });
    }
});

// Ruta para obtener un usuario por su ID
router.get("/:id", async (req, res) => {
    try {
        const user = await userManager.getOneById(req.params.id);
        res.status(200).json({ status: "success", payload: user });
    } catch (error) {
        res.status(error.code).json({ status: "error", message: error.message });
    }
});

// Ruta para crear un usuario
router.post("/", async (req, res) => {
    try {
        const user = await userManager.insertOne(req.body);
        res.status(201).json({ status: "success", payload: user });
    } catch (error) {
        res.status(error.code).json({ status: "error", message: error.message });
    }
});

export default router;
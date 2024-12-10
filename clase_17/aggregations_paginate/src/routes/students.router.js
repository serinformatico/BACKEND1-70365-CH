import { Router } from "express";
import StudentManager from "../managers/StudentManager.js";

const router = Router();
const studentManager = new StudentManager();

// Ruta para obtener los estudiantes
router.get("/", async (req, res) => {
    try {
        const students = await studentManager.getAll(req.query);
        res.status(200).json({ status: "success", payload: students });
    } catch (error) {
        res.status(error.code).json({ status: "error", message: error.message });
    }
});

// Ruta para obtener un estudiante por su ID
router.get("/:id", async (req, res) => {
    try {
        const student = await studentManager.getOneById(req.params.id);
        res.status(200).json({ status: "success", payload: student });
    } catch (error) {
        res.status(error.code).json({ status: "error", message: error.message });
    }
});

// Ruta para crear un estudiante
router.post("/", async (req, res) => {
    try {
        const student = await studentManager.insertOne(req.body);
        res.status(201).json({ status: "success", payload: student });
    } catch (error) {
        res.status(error.code).json({ status: "error", message: error.message });
    }
});

// Ruta para actualizar un estudiante por su ID
router.put("/:id", async (req, res) => {
    try {
        const student = await studentManager.updateOneById(req.params.id, req.body);
        res.status(200).json({ status: "success", payload: student });
    } catch (error) {
        res.status(error.code).json({ status: "error", message: error.message });
    }
});

// Ruta para eliminar un estudiante por su ID
router.delete("/:id", async (req, res) => {
    try {
        await studentManager.deleteOneById(req.params.id);
        res.status(200).json({ status: "success" });
    } catch (error) {
        res.status(error.code).json({ status: "error", message: error.message });
    }
});

export default router;
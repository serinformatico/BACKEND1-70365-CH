import { Router } from "express";
import CourseManager from "../managers/CourseManager.js";

const router = Router();
const courseManager = new CourseManager();

// Ruta para obtener los cursos
router.get("/", async (req, res) => {
    try {
        const courses = await courseManager.getAll(req.query);
        res.status(200).json({ status: "success", payload: courses });
    } catch (error) {
        res.status(error.code).json({ status: "error", message: error.message });
    }
});

// Ruta para obtener un curso por su ID
router.get("/:id", async (req, res) => {
    try {
        const course = await courseManager.getOneById(req.params.id);
        res.status(200).json({ status: "success", payload: course });
    } catch (error) {
        res.status(error.code).json({ status: "error", message: error.message });
    }
});

// Ruta para crear un curso
router.post("/", async (req, res) => {
    try {
        const course = await courseManager.insertOne(req.body);
        res.status(201).json({ status: "success", payload: course });
    } catch (error) {
        res.status(error.code).json({ status: "error", message: error.message });
    }
});

// Ruta para actualizar un curso por su ID
router.put("/:id", async (req, res) => {
    try {
        const course = await courseManager.updateOneById(req.params.id, req.body);
        res.status(200).json({ status: "success", payload: course });
    } catch (error) {
        res.status(error.code).json({ status: "error", message: error.message });
    }
});

// Ruta para eliminar un curso por su ID
router.delete("/:id", async (req, res) => {
    try {
        await courseManager.deleteOneById(req.params.id);
        res.status(200).json({ status: "success" });
    } catch (error) {
        res.status(error.code).json({ status: "error", message: error.message });
    }
});

export default router;
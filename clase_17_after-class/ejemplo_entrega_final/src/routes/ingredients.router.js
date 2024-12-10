import { Router } from "express";
import IngredientManager from "../managers/IngredientManager.js";

const router = Router();
const ingredientManager = new IngredientManager();

// Ruta para obtener los ingredientes
router.get("/", async (req, res) => {
    try {
        const ingredients = await ingredientManager.getAll(req.query);
        res.status(200).json({ status: "success", payload: ingredients });
    } catch (error) {
        res.status(error.code).json({ status: "error", message: error.message });
    }
});

// Ruta para obtener un ingrediente por su ID
router.get("/:id", async (req, res) => {
    try {
        const ingredient = await ingredientManager.getOneById(req.params.id);
        res.status(200).json({ status: "success", payload: ingredient });
    } catch (error) {
        res.status(error.code).json({ status: "error", message: error.message });
    }
});

// Ruta para crear un ingrediente
router.post("/", async (req, res) => {
    try {
        const ingredient = await ingredientManager.insertOne(req.body);
        res.status(201).json({ status: "success", payload: ingredient });
    } catch (error) {
        res.status(error.code).json({ status: "error", message: error.message });
    }
});

// Ruta para actualizar un ingrediente por su ID
router.put("/:id", async (req, res) => {
    try {
        const ingredient = await ingredientManager.updateOneById(req.params.id, req.body);
        res.status(200).json({ status: "success", payload: ingredient });
    } catch (error) {
        res.status(error.code).json({ status: "error", message: error.message });
    }
});

// Ruta para eliminar un ingrediente por su ID
router.delete("/:id", async (req, res) => {
    try {
        await ingredientManager.deleteOneById(req.params.id);
        res.status(200).json({ status: "success" });
    } catch (error) {
        res.status(error.code).json({ status: "error", message: error.message });
    }
});

export default router;
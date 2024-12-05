import { Router } from "express";
import MovieModel from "../models/movie.model.js";

const router = Router();

// Ruta para analizar el rendimiento de una consulta con explain()
router.get("/explain", async (req, res) => {
    try {
        const explanation = await MovieModel.find({ title: "Frankenstein" }).explain();
        res.status(200).json({ status: "success", payload: explanation.executionStats });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});

export default router;
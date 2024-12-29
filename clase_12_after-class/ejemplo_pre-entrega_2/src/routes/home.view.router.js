import { Router } from "express";
import IngredientManager from "../managers/IngredientManager.js";

const router = Router();
const ingredientManager = new IngredientManager();

router.get("/", async (req, res) => {
    try {
        const ingredients = await ingredientManager.getAll(req.query);
        res.render("home", { title: "Inicio", ingredients });
    } catch (error) {
        res.status(500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});

router.get("/realTimeIngredients", async (req, res) => {
    try {
        res.render("realTimeIngredients", { title: "Inicio" });
    } catch (error) {
        res.status(500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});

export default router;
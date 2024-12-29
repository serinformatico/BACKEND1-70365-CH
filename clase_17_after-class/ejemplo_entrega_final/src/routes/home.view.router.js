import { Router } from "express";
import moment from "moment";
import IngredientManager from "../managers/IngredientManager.js";
import RecipeManager from "../managers/RecipeManager.js";

const router = Router();
const ingredientManager = new IngredientManager();
const recipeManager = new RecipeManager();

router.get("/ingredients", async (req, res) => {
    try {
        const recipes = await recipeManager.getAll();
        const recipe = recipes.docs[0];
        const payload = await ingredientManager.getAll(req.query);
        res.render("home", { title: "Inicio", payload, recipe });
    } catch (error) {
        res.status(500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});

router.get("/ingredients/:id", async (req, res) => {
    try {
        const payload = await ingredientManager.getOneById(req.params.id);
        payload.createdAt = moment(payload.createdAt).format("YYYY-MM-DD HH:mm:ss");
        payload.updatedAt = moment(payload.updatedAt).format("YYYY-MM-DD HH:mm:ss");
        res.render("homeIngredient", { title: "Ingrediente", payload });
    } catch (error) {
        res.status(500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});

router.get("/recipes/:id", async (req, res) => {
    try {
        const payload = await recipeManager.getOneById(req.params.id);
        res.render("homeRecipe", { title: "Receta", payload });
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
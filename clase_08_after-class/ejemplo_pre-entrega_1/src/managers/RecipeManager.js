import paths from "../utils/paths.js";
import { readJsonFile, writeJsonFile } from "../utils/fileHandler.js";
import { generateId } from "../utils/collectionHandler.js";
import ErrorManager from "./ErrorManager.js";

export default class RecipeManager {
    #jsonFilename;
    #recipes;

    constructor() {
        this.#jsonFilename = "recipes.json";
    }

    // Busca un receta por su ID
    async #findOneById(id) {
        this.#recipes = await this.getAll();
        const recipeFound = this.#recipes.find((item) => item.id === Number(id));

        if (!recipeFound) {
            throw new ErrorManager("ID no encontrado", 404);
        }

        return recipeFound;
    }

    // Obtiene una lista de recetas
    async getAll() {
        try {
            this.#recipes = await readJsonFile(paths.files, this.#jsonFilename);
            return this.#recipes;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    // Obtiene un receta específica por su ID
    async getOneById(id) {
        try {
            const recipeFound = await this.#findOneById(id);
            return recipeFound;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    // Inserta un receta
    async insertOne(data) {
        try {
            const ingredients = data?.ingredients?.map((item) => {
                return { ingredient: Number(item.ingredient), quantity: 1 };
            });

            const recipe = {
                id: generateId(await this.getAll()),
                ingredients: ingredients ?? [],
            };

            this.#recipes.push(recipe);
            await writeJsonFile(paths.files, this.#jsonFilename, this.#recipes);

            return recipe;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    // Agrega un ingrediente a una receta o incrementa la cantidad de un ingrediente existente
    addOneIngredient = async (id, ingredientId) => {
        try {
            const recipeFound = await this.#findOneById(id);
            const ingredientIndex = recipeFound.ingredients.findIndex((item) => item.ingredient === Number(ingredientId));

            if (ingredientIndex >= 0) {
                recipeFound.ingredients[ingredientIndex].quantity++;
            } else {
                recipeFound.ingredients.push({ ingredient: Number(ingredientId), quantity: 1 });
            }

            const index = this.#recipes.findIndex((item) => item.id === Number(id));
            this.#recipes[index] = recipeFound;
            await writeJsonFile(paths.files, this.#jsonFilename, this.#recipes);

            return recipeFound;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    };
}
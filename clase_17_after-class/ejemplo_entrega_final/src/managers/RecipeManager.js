import ErrorManager from "./ErrorManager.js";
import { isValidID } from "../config/mongoose.config.js";
import RecipeModel from "../models/recipe.model.js";

export default class RecipeManager {
    #recipeModel;

    constructor() {
        this.#recipeModel = RecipeModel;
    }

    // Busca una receta por su ID
    async #findOneById(id) {
        if (!isValidID(id)) {
            throw new ErrorManager("ID inválido", 400);
        }

        const recipe = await this.#recipeModel.findById(id).populate("ingredients.ingredient");

        if (!recipe) {
            throw new ErrorManager("ID no encontrado", 404);
        }

        return recipe;
    }

    // Obtiene una lista de recetas
    async getAll(params) {
        try {
            const paginationOptions = {
                limit: params?.limit || 10, // Número de documentos por página (por defecto 10)
                page: params?.page || 1, // Página actual (por defecto 1)
                populate: "ingredients.ingredient", // Poblar el campo virtual 'ingredients'
                lean: true, // Convertir los resultados en objetos planos
            };

            return await this.#recipeModel.paginate({}, paginationOptions);
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Obtiene una receta específico por su ID
    async getOneById(id) {
        try {
            return await this.#findOneById(id);
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Inserta una receta
    async insertOne(data) {
        try {
            const recipe = await this.#recipeModel.create(data);
            return recipe;
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Agrega un ingrediente a una receta o incrementa la cantidad de un ingrediente existente
    async addOneIngredient(id, ingredientId) {
        try {
            const recipe = await this.#findOneById(id);
            const ingredientIndex = recipe.ingredients.findIndex((item) => item.ingredient._id.toString() === ingredientId);

            if (ingredientIndex >= 0) {
                recipe.ingredients[ingredientIndex].quantity++;
            } else {
                recipe.ingredients.push({ ingredient: ingredientId, quantity: 1 });
            }

            await recipe.save();

            return recipe;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }
}
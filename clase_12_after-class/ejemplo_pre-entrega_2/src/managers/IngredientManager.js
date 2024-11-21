import paths from "../utils/paths.js";
import { readJsonFile, writeJsonFile, deleteFile } from "../utils/fileHandler.js";
import { generateId } from "../utils/collectionHandler.js";
import { convertToBoolean } from "../utils/converter.js";
import ErrorManager from "./ErrorManager.js";

export default class IngredientManager {
    #jsonFilename;
    #ingredients;

    constructor() {
        this.#jsonFilename = "ingredients.json";
    }

    // Busca un ingrediente por su ID
    async #findOneById(id) {
        this.#ingredients = await this.getAll();
        const ingredientFound = this.#ingredients.find((item) => item.id === Number(id));

        if (!ingredientFound) {
            throw new ErrorManager("ID no encontrado", 404);
        }

        return ingredientFound;
    }

    // Obtiene una lista de ingredientes
    async getAll() {
        try {
            this.#ingredients = await readJsonFile(paths.files, this.#jsonFilename);
            return this.#ingredients;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    // Obtiene un ingrediente específico por su ID
    async getOneById(id) {
        try {
            const ingredientFound = await this.#findOneById(id);
            return ingredientFound;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    // Inserta un ingrediente
    async insertOne(data, file) {
        try {
            const { title, status, stock } = data;

            if (!title || !status || !stock ) {
                throw new ErrorManager("Faltan datos obligatorios", 400);
            }

            const ingredient = {
                id: generateId(await this.getAll()),
                title,
                status: convertToBoolean(status),
                stock: Number(stock),
                thumbnail: file?.filename ?? null,
            };

            this.#ingredients.push(ingredient);
            await writeJsonFile(paths.files, this.#jsonFilename, this.#ingredients);

            return ingredient;
        } catch (error) {
            if (file?.filename) await deleteFile(paths.images, file.filename); // Elimina la imagen si ocurre un error
            throw new ErrorManager(error.message, error.code);
        }
    }

    // Actualiza un ingrediente en específico
    async updateOneById(id, data, file) {
        try {
            const { title, status, stock } = data;
            const ingredientFound = await this.#findOneById(id);
            const newThumbnail = file?.filename;

            const ingredient = {
                id: ingredientFound.id,
                title: title || ingredientFound.title,
                status: status ? convertToBoolean(status) : ingredientFound.status,
                stock: stock ? Number(stock) : ingredientFound.stock,
                thumbnail: newThumbnail || ingredientFound.thumbnail,
            };

            const index = this.#ingredients.findIndex((item) => item.id === Number(id));
            this.#ingredients[index] = ingredient;
            await writeJsonFile(paths.files, this.#jsonFilename, this.#ingredients);

            // Elimina la imagen anterior si es distinta de la nueva
            if (file?.filename && newThumbnail !== ingredientFound.thumbnail) {
                await deleteFile(paths.images, ingredientFound.thumbnail);
            }

            return ingredient;
        } catch (error) {
            if (file?.filename) await deleteFile(paths.images, file.filename); // Elimina la imagen si ocurre un error
            throw new ErrorManager(error.message, error.code);
        }
    }

    // Elimina un ingrediente en específico
    async deleteOneById (id) {
        try {
            const ingredientFound = await this.#findOneById(id);

            // Si tiene thumbnail definido, entonces, elimina la imagen del ingrediente
            if (ingredientFound.thumbnail) {
                await deleteFile(paths.images, ingredientFound.thumbnail);
            }

            const index = this.#ingredients.findIndex((item) => item.id === Number(id));
            this.#ingredients.splice(index, 1);
            await writeJsonFile(paths.files, this.#jsonFilename, this.#ingredients);
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }
}
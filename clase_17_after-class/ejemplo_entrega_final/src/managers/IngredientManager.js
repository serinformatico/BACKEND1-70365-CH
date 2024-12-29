import ErrorManager from "./ErrorManager.js";
import { isValidID } from "../config/mongoose.config.js";
import IngredientModel from "../models/ingredient.model.js";
import { convertToBoolean } from "../utils/converter.js";

export default class IngredientManager {
    #ingredientModel;

    constructor() {
        this.#ingredientModel = IngredientModel;
    }

    // Busca un ingrediente por su ID
    async #findOneById(id) {
        if (!isValidID(id)) {
            throw new ErrorManager("ID inválido", 400);
        }

        const ingredient = await this.#ingredientModel.findById(id);

        if (!ingredient) {
            throw new ErrorManager("ID no encontrado", 404);
        }

        return ingredient;
    }

    // Obtiene una lista de ingredientes con filtros opcionales
    async getAll(params) {
        try {
            const $and = [];

            if (params?.title) $and.push({ title: { $regex: params.title, $options: "i" } });
            if (params?.status) $and.push({ status: convertToBoolean(params.status) });
            const filters = $and.length > 0 ? { $and } : {};

            const sort = {
                asc: { title: 1 },
                desc: { title: -1 },
            };

            const paginationOptions = {
                limit: params?.limit || 10, // Número de documentos por página (por defecto 10)
                page: params?.page || 1, // Página actual (por defecto 1)
                sort: sort[params?.sort] ?? {}, // Ordenamiento (sin orden por defecto)
                lean: true, // Convertir los resultados en objetos planos
            };

            return await this.#ingredientModel.paginate(filters, paginationOptions);
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Obtiene un ingrediente específico por su ID
    async getOneById(id) {
        try {
            const ingredient = await this.#findOneById(id);
            return ingredient.toObject(); // Convierte de tipo "Documento de Mongoose" a "Objecto JS Plano"
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Inserta un ingrediente
    async insertOne(data) {
        try {
            const ingredient = await this.#ingredientModel.create({
                ...data,
                status: convertToBoolean(data.status),
            });

            return ingredient;
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Actualiza un ingrediente en específico
    async updateOneById(id, data) {
        try {
            const ingredient = await this.#findOneById(id);
            const newValues = {
                ...ingredient,
                ...data,
                status: data.status ? convertToBoolean(data.status) : ingredient.status,
            };

            ingredient.set(newValues);
            ingredient.save();

            return ingredient;
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Elimina un ingrediente en específico
    async deleteOneById(id) {
        try {
            const ingredient = await this.#findOneById(id);
            await ingredient.deleteOne();
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }
}
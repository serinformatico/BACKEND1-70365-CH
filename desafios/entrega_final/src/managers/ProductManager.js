import ErrorManager from "./ErrorManager.js";
import { isValidID } from "../config/mongoose.config.js";
import ProductModel from "../models/product.model.js";
import { convertToBoolean } from "../utils/converter.js";

export default class ProductManager {
    #productModel;

    constructor() {
        this.#productModel = ProductModel;
    }

    // Busca un producto por su ID
    async #findOneById(id) {
        if (!isValidID(id)) {
            throw new ErrorManager("ID inválido", 400);
        }

        const product = await this.#productModel.findById(id);

        if (!product) {
            throw new ErrorManager("ID no encontrado", 404);
        }

        return product;
    }

    // Obtiene una lista de productos con filtros opcionales
    async getAll(params) {
        try {
            const $and = [];

            if (params?.category) $and.push({ category: params.category.trim().toUpperCase() });
            if (params?.availability) $and.push({ availability: convertToBoolean(params.availability) });
            const filters = $and.length > 0 ? { $and } : {};

            const sort = {
                asc: { price: 1 },
                desc: { price: -1 },
            };

            const paginationOptions = {
                limit: params?.limit || 10, // Número de documentos por página (por defecto 10)
                page: params?.page || 1, // Página actual (por defecto 1)
                sort: sort[params?.sort] ?? {}, // Ordenamiento (sin orden por defecto)
                lean: true, // Convertir los resultados en objetos planos
            };

            return await this.#productModel.paginate(filters, paginationOptions);
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Obtiene un producto específico por su ID
    async getOneById(id) {
        try {
            const product = await this.#findOneById(id);
            return product.toObject(); // Convierte de tipo "Documento de Mongoose" a "Objecto JS Plano"
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Inserta un producto
    async insertOne(data) {
        try {
            const product = await this.#productModel.create({
                ...data,
                status: convertToBoolean(data.status),
                availability: convertToBoolean(data.availability),
            });

            return product;
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Actualiza un producto en específico
    async updateOneById(id, data) {
        try {
            const product = await this.#findOneById(id);
            const newValues = {
                ...product,
                ...data,
                status: data.status ? convertToBoolean(data.status) : product.status,
                availability: data.availability ? convertToBoolean(data.availability) : product.availability,
            };

            product.set(newValues);
            product.save();

            return product;
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Elimina un producto en específico
    async deleteOneById(id) {
        try {
            const product = await this.#findOneById(id);
            await product.deleteOne();
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }
}
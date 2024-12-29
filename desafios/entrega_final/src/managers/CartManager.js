import ErrorManager from "./ErrorManager.js";
import { isValidID } from "../config/mongoose.config.js";
import CartModel from "../models/cart.model.js";

export default class CartManager {
    #cartModel;

    constructor() {
        this.#cartModel = CartModel;
    }

    // Busca un carrito por su ID
    async #findOneById(id) {
        if (!isValidID(id)) {
            throw new ErrorManager("ID inválido", 400);
        }

        const cart = await this.#cartModel.findById(id).populate("products.product");

        if (!cart) {
            throw new ErrorManager("ID no encontrado", 404);
        }

        return cart;
    }

    // Obtiene una lista de carritos
    async getAll(params) {
        try {
            const paginationOptions = {
                limit: params?.limit || 10, // Número de documentos por página (por defecto 10)
                page: params?.page || 1, // Página actual (por defecto 1)
                populate: "products.product", // Poblar el campo virtual 'products'
                lean: true, // Convertir los resultados en objetos planos
            };

            return await this.#cartModel.paginate({}, paginationOptions);
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Obtiene un carrito específico por su ID
    async getOneById(id) {
        try {
            const cart = await this.#findOneById(id);
            return cart.toObject(); // Convierte de tipo "Documento de Mongoose" a "Objecto JS Plano"
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Inserta un carrito
    async insertOne(data) {
        try {
            const cart = await this.#cartModel.create(data);
            return cart;
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Agrega un producto a un carrito o incrementa la cantidad de un producto existente
    async addOneProduct(id, productId) {
        try {
            const cart = await this.#findOneById(id);
            const productIndex = cart.products.findIndex((item) => item.product._id.toString() === productId);

            if (productIndex >= 0) {
                cart.products[productIndex].quantity++;
            } else {
                cart.products.push({ product: productId, quantity: 1 });
            }

            await cart.save();

            return cart;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    // Actualizar la cantidad de un producto en específico
    async updateQuantityOfProduct(id, productId, quantity) {
        try {
            const cart = await this.#findOneById(id);
            const productIndex = cart.products.findIndex((item) => item.product._id.toString() === productId);

            if (productIndex >= 0) {
                cart.products[productIndex].quantity = Number(quantity);
                await cart.save();
            }

            return cart;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    // Quitar un producto en específico
    async removeOneProduct(id, productId) {
        try {
            const cart = await this.#findOneById(id);
            const productIndex = cart.products.findIndex((item) => item.product._id.toString() === productId);

            if (productIndex >= 0) {
                cart.products.splice(productIndex, 1);
                await cart.save();
            }

            return cart;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    // Quitar todos los productos
    async removeAllProducts(id) {
        try {
            const cart = await this.#findOneById(id);
            cart.products = [];
            await cart.save();

            return cart;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }
}
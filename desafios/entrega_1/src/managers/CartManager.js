import paths from "../utils/paths.js";
import { readJsonFile, writeJsonFile } from "../utils/fileHandler.js";
import { generateId } from "../utils/collectionHandler.js";
import ErrorManager from "./ErrorManager.js";

export default class CartManager {
    #jsonFilename;
    #carts;

    constructor() {
        this.#jsonFilename = "carts.json";
    }

    // Busca un carrito por su ID
    async #findOneById(id) {
        this.#carts = await this.getAll();
        const cart = this.#carts.find((item) => item.id === Number(id));

        if (!cart) {
            throw new ErrorManager("ID no encontrado", 404);
        }

        return cart;
    }

    // Obtiene una lista de carritos
    async getAll() {
        try {
            this.#carts = await readJsonFile(paths.files, this.#jsonFilename);
            return this.#carts;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    // Obtiene un carrito específico por su ID
    async getOneById(id) {
        try {
            const cart = await this.#findOneById(id);
            return cart;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    // Inserta un carrito
    async insertOne(data) {
        try {
            const products = data?.products?.map((item) => {
                return { product: Number(item.product), quantity: 1 };
            });

            const cart = {
                id: generateId(await this.getAll()),
                products: products ?? [],
            };

            this.#carts.push(cart);
            await writeJsonFile(paths.files, this.#jsonFilename, this.#carts);

            return cart;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    // Agrega un producto a un carrito o incrementa la cantidad de un producto existente
    addOneProduct = async (id, productId) => {
        try {
            const cart = await this.#findOneById(id);
            const productIndex = cart.products.findIndex((item) => item.product === Number(productId));

            if (productIndex >= 0) {
                cart.products[productIndex].quantity++;
            } else {
                cart.products.push({ product: Number(productId), quantity: 1 });
            }

            const index = this.#carts.findIndex((item) => item.id === Number(id));
            this.#carts[index] = cart;
            await writeJsonFile(paths.files, this.#jsonFilename, this.#carts);

            return cart;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    };
}
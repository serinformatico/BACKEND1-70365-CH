import paths from "../utils/paths.js";
import { readJsonFile, writeJsonFile, deleteFile } from "../utils/fileHandler.js";
import { generateId } from "../utils/collectionHandler.js";
import { convertToBoolean } from "../utils/converter.js";
import ErrorManager from "./ErrorManager.js";

export default class ProductManager {
    #jsonFilename;
    #products;

    constructor() {
        this.#jsonFilename = "products.json";
    }

    // Busca un producto por su ID
    async #findOneById(id) {
        this.#products = await this.getAll();
        const product = this.#products.find((item) => item.id === Number(id));

        if (!product) {
            throw new ErrorManager("ID no encontrado", 404);
        }

        return product;
    }

    // Obtiene una lista de productos
    async getAll() {
        try {
            this.#products = await readJsonFile(paths.files, this.#jsonFilename);
            return this.#products;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    // Obtiene un producto específico por su ID
    async getOneById(id) {
        try {
            const product = await this.#findOneById(id);
            return product;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    // Inserta un producto
    async insertOne(data, file) {
        try {
            const { title, description, code, price, status, stock, category } = data;

            if (!title || !description || !code || !price || !status || !stock || !category) {
                throw new ErrorManager("Faltan datos obligatorios", 400);
            }

            if (!file?.filename) {
                throw new ErrorManager("Falta el archivo de la imagen", 400);
            }

            const product = {
                id: generateId(await this.getAll()),
                title,
                description,
                code,
                price: Number(price),
                status: convertToBoolean(status),
                stock: Number(stock),
                category,
                thumbnail: file?.filename,
            };

            this.#products.push(product);
            await writeJsonFile(paths.files, this.#jsonFilename, this.#products);

            return product;
        } catch (error) {
            if (file?.filename) await deleteFile(paths.images, file.filename); // Elimina la imagen si ocurre un error
            throw new ErrorManager(error.message, error.code);
        }
    }

    // Actualiza un producto en específico
    async updateOneById(id, data, file) {
        try {
            const { title, description, code, price, status, stock, category } = data;
            const product = await this.#findOneById(id);
            const newThumbnail = file?.filename;

            const newValues = {
                id: product.id,
                title: title || product.title,
                description: description || product.description,
                code: code || product.code,
                price: price ? Number(price) : product.price,
                status: status ? convertToBoolean(status) : product.status,
                stock: stock ? Number(stock) : product.stock,
                category: category || product.category,
                thumbnail: newThumbnail || product.thumbnail,
            };

            const index = this.#products.findIndex((item) => item.id === Number(id));
            this.#products[index] = newValues;
            await writeJsonFile(paths.files, this.#jsonFilename, this.#products);

            // Elimina la imagen anterior si es distinta de la nueva
            if (file?.filename && newThumbnail !== product.thumbnail) {
                await deleteFile(paths.images, product.thumbnail);
            }

            return product;
        } catch (error) {
            if (file?.filename) await deleteFile(paths.images, file.filename); // Elimina la imagen si ocurre un error
            throw new ErrorManager(error.message, error.code);
        }
    }

    // Elimina un producto en específico
    async deleteOneById (id) {
        try {
            const product = await this.#findOneById(id);

            // Si tiene thumbnail definido, entonces, elimina la imagen del producto
            if (product.thumbnail) {
                await deleteFile(paths.images, product.thumbnail);
            }

            const index = this.#products.findIndex((item) => item.id === Number(id));
            this.#products.splice(index, 1);
            await writeJsonFile(paths.files, this.#jsonFilename, this.#products);

            return product;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }
}
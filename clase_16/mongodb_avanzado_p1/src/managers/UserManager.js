import ErrorManager from "./ErrorManager.js";
import { isValidID } from "../config/mongoose.config.js";
import UserModel from "../models/user.model.js";

export default class UserManager {
    #userModel;

    constructor() {
        this.#userModel = UserModel;
    }

    // Busca un usuario por su ID
    async #findOneById(id) {
        if (!isValidID(id)) {
            throw new ErrorManager("ID inválido", 400);
        }

        // Ejemplo de como usar populate sin el middleware "pre" (este es declarado dentro del model)
        // const user = await this.#userModel.findById(id).populate("favoriteMovies.movie");

        const user = await this.#userModel.findById(id);

        if (!user) {
            throw new ErrorManager("ID no encontrado", 404);
        }

        return user;
    }

    // Obtiene una lista de usuarios poblando el atributo "favoriteMovies" con populate()
    async getAll() {
        try {
            // Ejemplo de como usar populate sin el middleware "pre" (este es declarado dentro del model)
            // return await this.#userModel.find().populate("favoriteMovies.movie");

            return await this.#userModel.find();
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Obtiene un usuario específico por su ID
    async getOneById(id) {
        try {
            return await this.#findOneById(id);
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Inserta un usuario
    async insertOne(data) {
        try {
            const user = await this.#userModel.create(data);
            return user;
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }
}
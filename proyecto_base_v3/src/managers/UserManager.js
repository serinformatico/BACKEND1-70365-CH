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

        const user = await this.#userModel.findById(id);

        if (!user) {
            throw new ErrorManager("ID no encontrado", 404);
        }

        return user;
    }

    // Obtiene una lista de usuarios
    async getAll() {
        try {
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

    // Actualiza un usuario en específico
    async updateOneById(id, data) {
        try {
            const user = await this.#findOneById(id);
            const emailExisting = await this.#userModel.findOne({ _id: { $ne: id }, email: data.email });

            if (emailExisting) {
                throw new ErrorManager("El email ya está registrado", 409);
            }

            const newValues = { ...user, ...data };
            user.set(newValues);
            user.save();

            return user;
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Elimina un usuario en específico
    async deleteOneById(id) {
        try {
            const user = await this.#findOneById(id);
            await user.deleteOne();
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }
}
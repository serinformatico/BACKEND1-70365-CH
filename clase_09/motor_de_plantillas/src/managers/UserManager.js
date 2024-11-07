import paths from "../utils/paths.js";
import { readJsonFile, writeJsonFile } from "../utils/fileHandler.js";
import { generateId } from "../utils/collectionHandler.js";
import ErrorManager from "./ErrorManager.js";

export default class UserManager {
    #jsonFilename;
    #users;

    constructor() {
        this.#jsonFilename = "users.json";
    }

    // Busca un usuario por su ID
    async #findOneById(id) {
        this.#users = await this.getAll();
        const userFound = this.#users.find((item) => item.id === Number(id));

        if (!userFound) {
            throw new ErrorManager("ID no encontrado", 404);
        }

        return userFound;
    }

    // Obtiene una lista de usuarios
    async getAll() {
        try {
            this.#users = await readJsonFile(paths.files, this.#jsonFilename);
            return this.#users;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    // Obtiene un usuario específico por su ID
    async getOneById(id) {
        try {
            const userFound = await this.#findOneById(id);
            return userFound;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    // Inserta un usuario
    async insertOne(data) {
        try {
            const { firstName, lastName, age, email, country } = data;

            if (!firstName || !lastName || !age || !email ) {
                throw new ErrorManager("Faltan datos obligatorios", 400);
            }

            const user = {
                id: generateId(await this.getAll()),
                firstName,
                lastName,
                age: Number(age),
                email,
                country,
            };

            this.#users.push(user);
            await writeJsonFile(paths.files, this.#jsonFilename, this.#users);

            return user;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    // Actualiza un usuario en específico
    async updateOneById(id, data) {
        try {
            const { firstName, lastName, age, email, country } = data;
            const userFound = await this.#findOneById(id);

            const user = {
                id: userFound.id,
                firstName: firstName || userFound.firstName,
                lastName: lastName || userFound.lastName,
                age: age ? Number(age) : userFound.age,
                email: email || userFound.email,
                country: country || userFound.country,
            };

            const index = this.#users.findIndex((item) => item.id === Number(id));
            this.#users[index] = user;
            await writeJsonFile(paths.files, this.#jsonFilename, this.#users);

            return user;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    // Elimina un usuario en específico
    async deleteOneById (id) {
        try {
            await this.#findOneById(id);

            const index = this.#users.findIndex((item) => item.id === Number(id));
            this.#users.splice(index, 1);
            await writeJsonFile(paths.files, this.#jsonFilename, this.#users);
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }
}
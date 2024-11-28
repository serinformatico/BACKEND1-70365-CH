import ErrorManager from "./ErrorManager.js";
import { isValidID } from "../config/mongoose.config.js";
import StudentModel from "../models/student.model.js";

export default class StudentManager {
    #student;

    constructor() {
        this.#student = StudentModel;
    }

    // Busca un estudiante por su ID
    async #findOneById(id) {
        if (!isValidID(id)) {
            throw new ErrorManager("ID inválido", 400);
        }

        const studentFound = await this.#student.findById(id);

        if (!studentFound) {
            throw new ErrorManager("ID no encontrado", 404);
        }

        return studentFound;
    }

    // Obtiene una lista de estudiantes aplicando una serie de filtros opcionales
    async getAll(params) {
        try {
            const $and = [];

            if (params?.firstName) $and.push({ firstName: params.firstName.toString().toUpperCase() });
            if (params?.lastName) $and.push({ lastName: params.lastName.toString().toUpperCase() });
            if (params?.age) $and.push({ age: params.age });
            const filters = $and.length > 0 ? { $and } : {};

            return await this.#student.find(filters);
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Obtiene un estudiante específico por su ID
    async getOneById(id) {
        try {
            return await this.#findOneById(id);
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Inserta un estudiante
    async insertOne(data) {
        try {
            const student = await this.#student.create(data);
            return student;
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Actualiza un estudiante en específico
    async updateOneById(id, data) {
        try {
            const studentFound = await this.#findOneById(id);
            const newValues = { ...studentFound, ...data };
            studentFound.set(newValues);
            studentFound.save();

            return studentFound;
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Elimina un estudiante en específico
    async deleteOneById(id) {
        try {
            const student = await this.#findOneById(id);
            await student.deleteOne();
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }
}
import ErrorManager from "./ErrorManager.js";
import { isValidID } from "../config/mongoose.config.js";
import CourseModel from "../models/course.model.js";

export default class CourseManager {
    #courseModel;

    constructor() {
        this.#courseModel = CourseModel;
    }

    // Busca un curso por su ID
    async #findOneById(id) {
        if (!isValidID(id)) {
            throw new ErrorManager("ID inválido", 400);
        }

        const course = await this.#courseModel.findById(id);

        if (!course) {
            throw new ErrorManager("ID no encontrado", 404);
        }

        return course;
    }

    // Obtiene una lista de cursos
    async getAll(params) {
        try {
            const $and = [];

            if (params?.name) $and.push({ name: { $regex: params.name, $options: "i" } });
            const filters = $and.length > 0 ? { $and } : {};

            const sort = {
                asc: { name: 1 },
                desc: { name: -1 },
            };

            const paginationOptions = {
                limit: params?.limit || 10, // Número de documentos por página (por defecto 10)
                page: params?.page || 1, // Página actual (por defecto 1)
                sort: sort[params?.sort] ?? {}, // Ordenamiento (sin orden por defecto)
                lean: true, // Convertir los resultados en objetos planos
            };

            return await this.#courseModel.paginate(filters, paginationOptions);
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Obtiene un curso específico por su ID
    async getOneById(id) {
        try {
            return await this.#findOneById(id);
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Inserta un curso
    async insertOne(data) {
        try {
            const course = await this.#courseModel.create(data);
            return course;
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Actualiza un curso en específico
    async updateOneById(id, data) {
        try {
            const course = await this.#findOneById(id);
            const newValues = { ...course, ...data };
            course.set(newValues);
            course.save();

            return course;
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Elimina un curso en específico
    async deleteOneById(id) {
        try {
            const course = await this.#findOneById(id);
            await course.deleteOne();
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }
}
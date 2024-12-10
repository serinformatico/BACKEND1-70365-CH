import ErrorManager from "./ErrorManager.js";
import { isValidID } from "../config/mongoose.config.js";
import StudentModel from "../models/student.model.js";

export default class StudentManager {
    #studentModel;

    constructor() {
        this.#studentModel = StudentModel;
    }

    // Busca un estudiante por su ID
    async #findOneById(id) {
        if (!isValidID(id)) {
            throw new ErrorManager("ID inválido", 400);
        }

        const student = await this.#studentModel.findById(id).populate("courses.course");

        if (!student) {
            throw new ErrorManager("ID no encontrado", 404);
        }

        return student;
    }

    // Obtiene una lista de estudiantes
    async getAll(params) {
        try {
            const $and = [];

            if (params?.firstName) $and.push({ firstName: { $regex: params.firstName, $options: "i" } });
            if (params?.lastName) $and.push({ lastName: { $regex: params.lastName, $options: "i" } });
            const filters = $and.length > 0 ? { $and } : {};

            const sort = {
                asc: { lastName: 1 },
                desc: { lastName: -1 },
            };

            const paginationOptions = {
                limit: params?.limit || 10, // Número de documentos por página (por defecto 10)
                page: params?.page || 1, // Página actual (por defecto 1)
                sort: sort[params?.sort] ?? {}, // Ordenamiento (sin orden por defecto)
                populate: "courses.course", // Poblar el campo virtual 'students'
                lean: true, // Convertir los resultados en objetos planos
            };

            return await this.#studentModel.paginate(filters, paginationOptions);
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
            const student = await this.#studentModel.create(data);
            return student;
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Actualiza un estudiante en específico
    async updateOneById(id, data) {
        try {
            const student = await this.#findOneById(id);
            const emailExisting = await this.#studentModel.findOne({ _id: { $ne: id }, email: data.email });

            if (emailExisting) {
                throw new ErrorManager("El email ya está registrado", 409);
            }

            const newValues = { ...student, ...data };
            student.set(newValues);
            student.save();

            return student;
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
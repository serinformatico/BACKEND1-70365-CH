import { Schema, model } from "mongoose";

const studentSchema = new Schema({
    firstName: {
        type: String,
        required: [ true, "El nombre es obligatorio" ],
        uppercase: true,
        trim: true,
        minLength: [ 3, "El nombre debe tener al menos 3 caracteres" ],
        maxLength: [ 25, "El nombre debe tener como máximo 25 caracteres" ],
    },
    lastName: {
        type: String,
        required: [ true, "El apellido es obligatorio" ],
        uppercase: true,
        trim: true,
        minLength: [ 3, "El apellido debe tener al menos 3 caracteres" ],
        maxLength: [ 25, "El apellido debe tener como máximo 25 caracteres" ],
    },
    age: {
        type: Number,
        required: [ true, "La edad es obligatoria" ],
        min: [ 0, "La edad debe ser un valor positivo" ],
    },
    email: {
        type: String,
        required: [ true, "El email es obligatorio" ],
        lowercase: true,
        trim: true,
        unique: true,
    },
    course: {
        type: String,
        required: [ true, "El nombre del curso es obligatorio" ],
        trim: true,
        maxLength: [ 50, "El nombre debe tener como máximo 50 caracteres" ],
    },
    rating: {
        type: Number,
        required: [ true, "La nota es obligatoria" ],
        min: [ 1, "La nota debe ser mayor o igual a 1" ],
        max: [ 10, "La nota debe ser menor o igual a 10" ],
    },
}, {
    timestamps: true, // Añade timestamps para generar createdAt y updatedAt
    versionKey: false, // Elimina el campo __v de versión
});

const Student = model("students", studentSchema);

export default Student;
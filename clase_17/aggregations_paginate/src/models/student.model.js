import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const studentSchema = new Schema({
    firstName: {
        type: String,
        required: [ true, "El nombre es obligatorio" ],
        minLength: [ 3, "El nombre debe tener al menos 3 caracteres" ],
        maxLength: [ 25, "El nombre debe tener como máximo 25 caracteres" ],
    },
    lastName: {
        type: String,
        required: [ true, "El apellido es obligatorio" ],
        minLength: [ 3, "El apellido debe tener al menos 3 caracteres" ],
        maxLength: [ 25, "El apellido debe tener como máximo 25 caracteres" ],
    },
    email: {
        type: String,
        required: [ true, "El email es obligatorio" ],
        lowercase: true,
        trim: true,
        unique: true,
        validate: {
            validator: async function (email) {
                const countDocuments = await this.model("students").countDocuments({
                    _id: { $ne: this._id },
                    email, // Atributo de verificación de duplicado
                });
                return countDocuments === 0;
            },
            message: "El email ya está registrado",
        },
    },
    courses: [
        {
            course: {
                type: Schema.Types.ObjectId,
                ref: "courses",
                required: [ true, "El curso es obligatorio" ],
            },
            _id: false,
        },
    ],
}, {
    timestamps: true, // Añade timestamps para generar createdAt y updatedAt
    versionKey: false, // Elimina el campo __v de versión
});

// Índice compuesto para nombre y apellido
studentSchema.index({ firstName: 1, lastName: 1 }, { name: "idx_firstname_lastname" });

// Agrega mongoose-paginate-v2 para habilitar las funcionalidades de paginación.
studentSchema.plugin(paginate);

const StudentModel = model("students", studentSchema);

export default StudentModel;
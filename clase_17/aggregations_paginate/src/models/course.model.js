import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const courseSchema = new Schema({
    name: {
        index: { name: "idx_name" },
        type: String,
        required: [ true, "El nombre es obligatorio" ],
        minLength: [ 3, "El nombre debe tener al menos 3 caracteres" ],
        maxLength: [ 25, "El nombre debe tener como máximo 25 caracteres" ],
    },
    startDate: {
        type: Date,
        required: [ true, "La fecha de inicio es obligatoria" ],
    },
    endDate: {
        type: Date,
        required: [ true, "La fecha de finalización es obligatoria" ],
        validate: {
            validator: function(endDate) {
                return endDate > this.startDate;
            },
            message: "La fecha de finalización debe ser posterior a la fecha de inicio",
        },
    },
}, {
    timestamps: true, // Añade timestamps para generar createdAt y updatedAt
    versionKey: false, // Elimina el campo __v de versión
});

// Agrega mongoose-paginate-v2 para habilitar las funcionalidades de paginación.
courseSchema.plugin(paginate);

const CourseModel = model("courses", courseSchema);

export default CourseModel;
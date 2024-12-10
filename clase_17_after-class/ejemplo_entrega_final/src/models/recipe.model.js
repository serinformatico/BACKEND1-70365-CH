import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const recipeSchema = new Schema({
    ingredients: [
        {
            ingredient: {
                type: Schema.Types.ObjectId,
                ref: "ingredients",
                required: [ true, "El nombre del ingrediente es obligatorio" ],
            },
            quantity: {
                type: Number,
                required: [ true, "La cantidad del ingrediente es obligatoria" ],
                min: [ 1, "La cantidad debe ser mayor que 0" ],
            },
            _id: false,
        },
    ],
}, {
    timestamps: true, // Añade timestamps para generar createdAt y updatedAt
    versionKey: false, // Elimina el campo __v de versión
});

// Agrega mongoose-paginate-v2 para habilitar las funcionalidades de paginación.
recipeSchema.plugin(paginate);

const RecipeModel = model("recipes", recipeSchema);

export default RecipeModel;
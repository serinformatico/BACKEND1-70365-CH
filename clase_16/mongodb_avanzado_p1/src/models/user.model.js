import { Schema, model } from "mongoose";

const userSchema = new Schema({
    nickName: {
        type: String,
        index: { name: "idx_nickname" }, // Índice simple
    },
    firstName: { type: String },
    lastName: { type: String },
    email: {
        type: String,
        unique: true, // Índice único
    },
    description: {
        type: String,
        index: { type: "text", name: "idx_txt_description" }, // Índice de tipo texto
    },
    favoriteMovies: [
        {
            movie: {
                type: Schema.Types.ObjectId,
                ref: "movies",
                required: [ true, "La película es obligatorio" ],
            },
            _id: false,
        },
    ],
}, {
    timestamps: true, // Añade timestamps para generar createdAt y updatedAt
    versionKey: false, // Elimina el campo __v de versión
});

userSchema.index({ firstName: 1, lastName: 1 }, { name: "idx_firstname_lastname" }); // Índice compuesto.
userSchema.index({ dni: 1, address: 1 }, { name: "idx_dni_address", unique: true }); // Índice compuesto único.

// Middleware que aplica populate a find(), findOne(), findById(), etc.
userSchema.pre(/^find/, function(next) {
    this.populate("favoriteMovies.movie");
    next();
});

const UserModel = model("users", userSchema);

export default UserModel;
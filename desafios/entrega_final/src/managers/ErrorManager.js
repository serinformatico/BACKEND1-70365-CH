export default class ErrorManager extends Error {
    // Constructor para inicializar el mensaje y el código del error
    constructor(message, code) {
        super(message);

        this.code = code || 500;
    }

    // Método estático para manejar errores con mensajes y códigos apropiados
    static handleError(error) {
        // Verifica si el error es un ValidationError de Mongoose
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map((item) => item.message);
            return new ErrorManager(messages.join(",").trim(), 400);
        }

        // Verifica si es un código 11000, que indica un error de duplicidad en MongoDB
        if (error.code === 11000) {
            return new ErrorManager(error.message, 409);
        }

        // Para cualquier otro tipo de error, envía el mensaje y un código 500
        return new ErrorManager(error.message, error?.code || 500);
    }
}
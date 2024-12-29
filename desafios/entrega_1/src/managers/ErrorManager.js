export default class ErrorManager extends Error {
    // Constructor para inicializar el mensaje y el código del error
    constructor(message, code) {
        super(message);

        this.code = code || 500;
    }
}
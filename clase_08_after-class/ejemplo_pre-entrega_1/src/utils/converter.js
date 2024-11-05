// Convierte una cadena o número en un valor booleano
export const convertToBoolean = (value) => {
    // Conjunto de valores considerados verdaderos
    const trueValues = [ "true", "on", "yes", "1", 1, true ];
    return trueValues.includes(value);
};
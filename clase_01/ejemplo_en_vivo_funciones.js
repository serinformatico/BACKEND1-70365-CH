/*
    Realizar una función con estructura básica.
    Se destacarán los elementos y un caso de uso.
*/

// Función expresada con estructura anónima (significa que la función interna no tiene nombre)
const saludar1 = function (nombre) {
    return `¡Buenos días ${nombre}!`;
};
console.log("\nEJEMPLO N°1: saludar1", saludar1("Juan"));

/*
    Realizar la misma función con estructura flecha.
    Se destacarán las diferencias.
*/

// Función expresada con estructura de flecha
const saludar2 = (nombre) => `¡Buenos días ${nombre}!`;
console.log("\nEJEMPLO N°2: saludar2", saludar2("Lorena"));

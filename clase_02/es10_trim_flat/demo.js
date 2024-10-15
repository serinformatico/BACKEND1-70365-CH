/*
    - Validación de cadena con trim
    - Aplanado de Array con múltiple anidación

    El método trim() elimina los espacios iniciales y finales de un string.
    El método flat() aplana un array que contiene otros arrays-
*/

console.log("\nEJEMPLO N°1: Uso del método trim");
const greeting = "   Hola Mundo  ";
console.log(greeting.trim());

console.log("\nEJEMPLO N°2: Uso del método flat");
const numbers = [10, [-1, -2], 20, 50, [1, 5, [100, 200, 300]]];
console.log(numbers.flat(2));
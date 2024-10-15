/*
    Utilización del operador exponencial y manejo de array con includes.
*/

const resultadoDosAlCubo = 2**3;
console.log("\nEJEMPLO N°1: Uso del operador exponencial");
console.log(resultadoDosAlCubo);

console.log("\nEJEMPLO N°2: Uso del método includes para arrays");
const colors = ["rojo", "verde", "negro"];
const includesThisItem = colors.includes("rojo");
console.log("El color rojo está en el array de colores: ", includesThisItem);

const color = "blanco";
if (colors.includes(color)) {
    console.log(`Color ${color} encontrado`);
} else {
    console.log(`Color ${color} No encontrado`);
}
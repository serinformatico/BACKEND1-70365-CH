/*
    Ejemplo callback con operaciones

    Se crearán cuatro funciones: sumar, restar, multiplicar y dividir.
    Además, se proporcionará otra función operación, que recibirá como
    callback cualquiera de estas tres funciones para ejecutarla.
*/

const sumar = (a, b) => a + b;
const restar = (a, b) => a - b;
const multiplicar = (a, b) => a * b;
const dividir = (a, b) => a / b;

const operar = (a, b, callback) => {
    const resultado = callback(a, b);
    console.log(resultado);
};

console.log("\nEJEMPLO: Ejemplo callback con operaciones");
operar(10, 5, dividir);
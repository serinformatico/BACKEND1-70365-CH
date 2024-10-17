/*
    Ejemplo de ejecución sincrónica
*/

function imprimirA() {
    console.log("Función A");
    imprimirB();
};

function imprimirB() {
    console.log("Función B");
    imprimirC();
};

function imprimirC() {
    console.log("Función C");
    imprimirD();
};

function imprimirD() {
    console.log("Función D");
};

imprimirA(); // Imprime: Función A, Función B, Función C, Función D, Imprimir E
console.log("Imprimir E");
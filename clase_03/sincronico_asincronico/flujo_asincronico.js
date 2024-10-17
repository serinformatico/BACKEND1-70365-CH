/*
    Ejemplo de ejecución asíncrona
*/

function imprimirA() {
    console.log("Función A");
    imprimirB();
};

function imprimirB() {
    setTimeout(() => {
        console.log("Función B");
    }, 750);

    imprimirC();
};

function imprimirC() {
    setTimeout(() => {
        console.log("Función C");
    }, 500);

    imprimirD();
};

function imprimirD() {
    console.log("Función D");
};

imprimirA(); // Imprime: Función A, Función D, Imprimir E, Función C, Función B
console.log("Imprimir E");
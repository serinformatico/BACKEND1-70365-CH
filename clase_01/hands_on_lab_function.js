/*
    HANDS ON LAB: Funciones
    -> En esta instancia de la clase realizaremos una función que corrobore
    elementos en una lista.

    ¿Cómo lo hacemos?

    Definiremos la función “mostrarLista”, la cual recibirá un arreglo con
    elementos como parámetro.
        1. Si la lista está vacía, devolver un mensaje indicando “Lista vacía”.
        2. Si la lista cuenta con elementos, mostrarlos 1 por 1 en consola.
          Finalizar el proceso devolviendo la longitud de la lista (Utilizar
          template strings)
        3. Invocar la función con los casos de prueba.
*/

const mostrarLista = (frutas) => {
    if (frutas.length === 0) {
        return "Lista vacía";
    }

    frutas.forEach((fruta) => {
        console.log(fruta);
    });

    return `Longitud de la lista: ${frutas.length}`;
};

let resultado1 = mostrarLista([]);
console.log("\nEJEMPLO N°1:", resultado1);

let resultado2 = mostrarLista(["bananas", "mazanas", "naranjas"]);
console.log("\nEJEMPLO N°2:", resultado2);
/*
    Un callback es una función que se pasa como argumento a otra función
    y se ejecuta después de que la primera haya completado alguna tarea.

    Convenciones:
        - El callback siempre es el último parámetro.
        - El callback suele ser una función que recibe dos parámetros.
        - La función llama al callback al terminar de ejecutar todas sus
          operaciones.
*/

function increaseByTwo(number) {
    return number + 2;
}

function increaseNumbers(numbers, callback) {
    for (let i = 0; i < numbers.length; i++) {
        numbers[i] = callback(numbers[i]);
    }

    return numbers;
}

console.log("\nEJEMPLO: Uso de callback");
const numbers = [10, 20, 30];
console.log(increaseNumbers(numbers, increaseByTwo));
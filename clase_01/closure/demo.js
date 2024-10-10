/*
    CLOSURE:

    Es una función interna que tiene acceso a las variables de su función externa, incluso
    después de que la función externa haya terminado de ejecutarse. Esto significa que el
    closure tiene acceso al ámbito en el que fue creado y puede acceder a variables en ese
    ámbito, incluso si la función exterior ya no está activa.
*/

function crearSumador(x) {
    // La función interna "sumar" es el closure y tiene acceso al parámetro
    // denominado "x" de la función externa "crearSumador".
    function sumar(y, z) {
        return x + y + z;
    }

    // Se retorna la función "sumar".
    return sumar;
}

// Se crea la instancia de "crearSumador". Entonces, "x" valdrá 10.
const sumar10 = crearSumador(10);

// Ahora, se puede invocar la función interna "sumar" para pasarle
// como parámetro el valor de "y" y "z". Es decir, sumará 10 + y + z.
let resultadoA = sumar10(5, 7);     // Imprime 22
let resultadoB = sumar10(20, 30);   // Imprime 60
console.log(resultadoA, resultadoB);
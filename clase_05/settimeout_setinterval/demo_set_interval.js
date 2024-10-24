/*
    El método setInterval ejecuta una tarea cada vez que se
    cumpla un intervalo de tiempo.
*/

let counter = 0;

const interval = setInterval(() => {
    // Este bloque se ejecutará después haber transcurrido 1 seg.
    counter++;
    console.log(`¡Hola Mundo! Cuenta ${counter}`);

    if (counter === 3) {
        // Este método detiene el intervalo
        clearInterval(interval);
    }
}, 1000); // Tiempo expresado en mili-segundos 1000ms = 1s.

console.log("Bienvenidos");
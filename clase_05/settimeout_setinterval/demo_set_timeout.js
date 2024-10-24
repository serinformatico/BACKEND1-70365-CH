/*
    El método setTimeout se utiliza para establecer un temporizador
    que ejecute una tarea después de un determinado tiempo.
*/

setTimeout(() => {
    // Este bloque se ejecutará después haber transcurrido 1 seg.
    const greeting = "¡Hola Mundo!";
    console.log(greeting);
}, 1000); // Tiempo expresado en mili-segundos 1000ms = 1s.

console.log("Bienvenidos");
/*
    ACTIVIDAD EN CLASE: Proyecto de node

    1. Crear un proyecto de node que genere 10000 números aleatorios en un
       rango de 1 a 20. Indicar por consola la finalización de esta operación
       con un mensaje.
    2. Mediante el uso de Promesas, crear un objeto cuyas claves sean los
       números salidos y el valor asociado a cada clave será la cantidad de
       veces que salió dicho número. Representar por consola los resultados.

    Nota: Considerar que esta operación debe realizarse de forma asíncrona.
*/

const generateRandomNumbersBetween1And20 = () => {
    return new Promise((resolve, reject) => {
        const randomNumbers = {};

        for (let i = 1; i <= 10000; i++) {
            const randomNumber = Math.floor(Math.random() * 20 + 1);

            if (randomNumbers[randomNumber] != undefined) {
                randomNumbers[randomNumber]++;
            } else {
                randomNumbers[randomNumber] = 1;
            }
        }

        if (Object.keys(randomNumbers).length === 0) {
            reject(new Error("Hubo un error en la generación de los números aleatorios"));
        } else {
            resolve(randomNumbers);
        }
    });
};

generateRandomNumbersBetween1And20()
    .then((response) => console.log("Proceso terminado: ", response))
    .catch((error) => console.log(error.message));
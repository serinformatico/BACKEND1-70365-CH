/*
    Una función asíncrona en JavaScript es una función que permite
    ejecutar código de manera no bloqueante, utilizando la palabra
    clave async. Estas funciones retornan una promesa, lo que
    permite usar await dentro de ellas para esperar el resultado de
    operaciones asíncronas (llamadas a APIs o lecturas de archivos)
    sin bloquear el flujo principal del programa.
*/

const greet = (firstName, lastName) => {
    return new Promise((resolve, reject) => {
        if (!firstName) {
            reject(new Error("Nombre indefinido"));
        }

        if (!lastName) {
            reject(new Error("Apellido indefinido"));
        }

        setTimeout(() => {
            resolve(`Hola ${firstName} ${lastName}`);
        }, 1000);
    });
};

const execute = async () => {
    try {
        const greeting = await greet("Juan", "Perez");
        const greeting2 = `${greeting}. ¡Bienvenido!`;
        console.log(greeting2)
    } catch (error) {
        console.log(error.message)
    } finally {
        console.log("Me ejecuto al terminar el bloque try/catch sin importar el resultado")
    }
};

execute();

console.log("Este mensaje no espera a que se resuelva la promesa");

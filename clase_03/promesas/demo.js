/*
    Una Promise en JavaScript es un objeto que representa la eventual
    resolución o rechazo de una operación asíncrona. Proporciona una
    forma de manejar valores que estarán disponibles en el futuro,
    evitando el uso excesivo de callbacks.

    Una promise puede estar en uno de estos estados:
        - Pending (pendiente): la operación aún no ha terminado.
        - Fulfilled (resuelta): la operación terminó con éxito.
        - Rejected (rechazada): la operación falló.
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

greet("Juan", "Perez")
    .then((response) => `${response}. ¡Bienvenido!`)
    .then((response) => console.log(response))
    .catch((error) => console.log(error.message))
    .finally(() => console.log("Me ejecuto al terminar la promesa sin importar el resultado"));

console.log("Este mensaje no espera a que se resuelva la promesa");
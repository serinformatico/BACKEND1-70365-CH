/*
    Utilización básica de operador rest y operador spread en los objetos.

    * Operador spread: se utiliza para agregar, modificar elementos de
      un arreglo o propiedades y/o métodos de un objeto. También, se usa
      para fusionar o clonar objetos y arreglos.
    * Operador rest: se utiliza para representar un número indefinido de
      parámetros como un arreglo dentro de una función. También, su usa
      dentro de un destructuring para representar al resto de parámetros.
*/

let client = {
    firstName: "Juan",
    age: 25,
};

// Modificar el valor de la edad y agregar la propiedad "isTall":
console.log("\nEJEMPLO N°1: Uso del operador spread");
client = { ...client, age: 22, isTall: true}
console.log(client);

// Fusionar objetos:
console.log("\nEJEMPLO N°2: Uso del operador spread para fusionar objetos");
const address = {
    street: "Av. Siempreviva",
    country: "ARGENTINA",
};
const clientWithAddress = { ...client, ...address };
console.log(clientWithAddress);

// Clonar objetos:
console.log("\nEJEMPLO N°3: Uso del operador spread para clonar objetos");
const client2 = { ...client };
client2.age = 50;
console.log("cliente 1:", client, " - cliente 2:", client2);

// Destructuring: Eliminar la propiedad "edad":
console.log("\nEJEMPLO N°4: Uso del operador rest - Destructuring");
const { age, ...clientWithoutAge } = client; // Coloca el resto en una variable sin la propiedad "age"
console.log(clientWithoutAge);

console.log("\nEJEMPLO N°5: Uso del operador rest - Parámetros Rest");
const sumarTodo = (initialValue, ...numbers) => {
    let total = initialValue;

    numbers.forEach((number) => {
        total += number;
    });

    console.log(total);
}
sumarTodo(0, 10, 5, 3);
sumarTodo(10, 2, 8);
sumarTodo(100, 10, 5, 7, 3, 5);


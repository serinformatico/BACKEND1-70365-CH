/*
    Utilización de los métodos Object.values, Object.keys y Object.entries
*/

let client = {
    firstName: "Juan",
    lastName: "Peres",
    age: 25,
};

console.log("\nEJEMPLO N°1: Uso del método values");
const arrayOfValues = Object.values(client)
console.log(arrayOfValues);

console.log("\nEJEMPLO N°2: Uso del método keys");
const arrayOfKeys = Object.keys(client)
console.log(arrayOfKeys);

console.log("\nEJEMPLO N°3: Uso del método entries");
const arrayOfArraysKeyAndValue = Object.entries(client)
console.log(arrayOfArraysKeyAndValue);






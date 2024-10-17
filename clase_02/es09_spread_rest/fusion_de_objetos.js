const object1 = {
    a: 10,
    b: 20,
    c: 30
};

const object2 = {
    c: 100,
    d: 40
};

const object3 = {
    e: 50
};

console.log("\nEJEMPLO N°1: Uso del operador spread para fusionar objetos - Orden de sobre-escritura");
const object4 = { ...object1, ...object2, ...object3 }; // Observar el valor que toma la prop. "c"
console.log("Objeto 4:", object4);

console.log("\nEJEMPLO N°2: Uso del operador spread para fusionar objetos - Orden de sobre-escritura");
const object5 = { ...object2, ...object1, ...object3 }; // Observar el valor que toma la prop. "c"
console.log("Objeto 5:", object5);
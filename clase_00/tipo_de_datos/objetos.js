/*
    TIPO DE DATOS DE OBJETOS:
        - Array
        - Object

    Los tipos de datos de objetos son estructuras más complejas en los
    lenguajes de programación que pueden contener múltiples valores y
    propiedades. A diferencia de los tipos primitivos, los objetos
    pueden almacenar colecciones de datos y comportamientos (funciones).

    Cuando un objeto se asigna o se pasa a una variable, no se crea una
    copia del objeto, sino que se pasa una referencia al mismo. Esto
    significa que cualquier modificación realizada en el objeto a través
    de una variable afectará al objeto original, ya que ambas variables
    apuntan al mismo espacio en memoria.
*/

console.log("\nDeclaración de variables y asignación de valores");

let colors = ["rojo", "negro", "blanco"];
console.log("\tColores:", colors);

let pet = {
    name: "Bobbie",
    specie: "Perro",
    age: 5
};
console.log("\tMascota:", pet);

console.log("\nComprobación de asignación por referencia");
let newColors = colors;
newColors[1] = ("celeste"); // Modifica el valor del segundo elemento del array (negro)
newColors.push("azul");     // Inserta el elemento al final del array
newColors.unshift("verde"); // Inserta el elemento al inicio del array
console.log("\tNuevos Colores:", newColors);
console.log("\tColores Originales:", colors);

let newPet = pet;
pet.name = "Firulais";      // Modifica el valor de una propiedad del objeto
pet.country = "Argentina";  // Agrega una propiedad en el objeto
delete pet.age;             // Quita una propiedad del objeto
console.log("\tNueva Mascota:", newPet);
console.log("\tMascota Original:", pet);
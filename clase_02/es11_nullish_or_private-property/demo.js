/*
    - Explicación de asignación de variable a partir de un nullish (??) para
      entender su diferencia con el operador OR (||)
    - Explicación de una variable propiedad en una clase.

    El operador nullish reemplaza los valores null o undefined por valores
    por defecto.
    El operador OR reemplaza los valores null, undefined, 0, "", false por
    valores por defecto.
*/

console.log("\nEJEMPLO N°1: Uso de propiedades privadas dentro de las clases");
class Person {
    // Propiedades públicas
    firstName;
    lastName;

    // Propiedad privada: No se podrá ver o acceder desde afuera de la clase.
    #credit;

    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.#credit = 0;
    }

    // Método público: Setter
    setCredit = (credit) => {
        this.#credit = credit;
    };

    // Método público: Getter
    getCredit = () => {
        return this.#credit;
    };
}

const person1 = new Person("Juan", "Pérez");
person1.setCredit(1000.00);
console.log(person1);
console.log("Es mayor de edad: ", person1.getCredit());

console.log("\nEJEMPLO N°2: Uso del operador nullish");
const age = 0;
const color = "";
const country = null;
const greeting = "Buen día";
const quantity = 2 * "a"; // NaN
const isExpensive = false;
let price;

const valueA1 = age ?? 18;
const valueA2 = color ?? "blanco";
const valueA3 = country ?? "Argentina";
const valueA4 = greeting ?? "Hola Mundo";
const valueA5 = quantity ?? 5;
const valueA6 = isExpensive ?? "No";
const valueA7 = price ?? 100.00;
console.log("Resultados: ", valueA1, valueA2, valueA3, valueA4, valueA5, valueA6, valueA7);

console.log("\nEJEMPLO N°3: Uso del operador OR");
const valueB1 = age || 18;
const valueB2 = color || "blanco";
const valueB3 = country || "Argentina";
const valueB4 = greeting || "Hola Mundo";
const valueB5 = quantity || 5;
const valueB6 = isExpensive || "No";
const valueB7 = price || 100.00;
console.log("Resultados: ", valueB1, valueB2, valueB3, valueB4, valueB5, valueB6, valueB7);
/*
    CLASS:

    En JavaScript, una clase es una forma de definir una plantilla o molde
    para crear objetos.

    Una clase en JavaScript puede incluir:
        - Propiedades: Son características o datos que describen el objeto.
        - Métodos: Son funciones que definen el comportamiento del objeto.
        - Constructor: Es un método especial que se ejecuta cuando se crea
          una nueva instancia de la clase.

    La sentencia "new" se utiliza para crear instancias u objetos de la clase.
*/

// Declaración de la clase
class Person {

    // Propiedades públicas
    firstName;
    lastName;
    age;

    // Propiedad pública de clase (estática)
    static specie = "Humano";

    // Constructor de instancia
    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }

    // Método público de instancia
    greet = () => `¡Hola! Soy ${this.firstName} ${this.lastName} y soy ${Person.specie}`;

    // Método público de clase (estático)
    static eat = () => 'Estoy comiendo';
}

// Creación del objeto
let juan = new Person("Juan", "Pérez", 21);
let maria = new Person("maria", "Medina", 18);

console.log("\nEJEMPLO N°1: Instancias de la clase Persona");
console.log(juan);
console.log(maria);

console.log("\nEJEMPLO N°2: Uso de métodos de cada instancia de la clase Persona");
console.log(juan.greet());
console.log(maria.greet());

console.log("\nEJEMPLO N°3: Uso de miembros estáticos de la clase Persona");
console.log(Person.specie);
console.log(Person.eat());

console.log("\nEJEMPLO N°4: Mal uso de miembros estáticos de la clase Persona (ESTO ESTA MAL)");
console.log(juan.specie); // Imprime undefined
// console.log(juan.darBienvenida()); // Da error "is not a function"
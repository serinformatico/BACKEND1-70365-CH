/*
    HANDS ON LAB: Clases
    -> En esta instancia de la clase repasaremos cómo se crean las clases.
    -> Creación de una clase contador

    ¿Cómo lo hacemos?

    1. Definir clase Contador
    2. La clase se creará con un nombre, representando al responsable del
       contador.
    3. El contador debe inicializarse en 0
    4. Debe existir una variable estática que funcione como contador global
       de todas las instancias de contador creadas.
    5. Definir el método getResponsable, el cual debe devolver el responsable
       de dicho contador.
    6. Definir el método contar, el cual debe incrementar, tanto su cuenta
       individual, como la cuenta global.
    7. Definir el método getCuentaIndividual, el cual debe devolver sólo la
       cuenta individual del contador
    8. Definir el método getCuentaGlobal, el cual debe devolver la variable
       estática con el conteo global.
    9. Realizar prueba de individualidad entre las instancias.
*/

class Contador {

    // Propiedad pública de clase (estática)
    static contadorGlobal = 0;

    // Constructor de instancia
    constructor(nombre) {
        // Propiedades públicas de instancia
        this.nombre = nombre;
        this.contador = 0;
    }

    getResponsable = () => this.nombre;

    contar = () => {
        Contador.contadorGlobal++;
        this.contador++;
    };

    getCuentaIndividual = () => this.contador;

    getCuentaGlobal = () => Contador.contadorGlobal;
}

// Creación del objeto
let contadorA = new Contador("Contador A");
let contadorB = new Contador("Contador B");
let contadorC = new Contador("Contador C");

console.log("\nEJEMPLO N°1:");
contadorA.contar();
contadorA.contar();
console.log(`${contadorA.getResponsable()}, Cuenta individual: ${contadorA.getCuentaIndividual()}, Cuenta global: ${contadorA.getCuentaGlobal()}`);

console.log("\nEJEMPLO N°2:");
contadorB.contar();
contadorB.contar();
contadorB.contar();
console.log(`${contadorB.getResponsable()}, Cuenta individual: ${contadorB.getCuentaIndividual()}, Cuenta global: ${contadorB.getCuentaGlobal()}`);

console.log("\nEJEMPLO N°3:");
console.log(`${contadorC.getResponsable()}, Cuenta individual: ${contadorC.getCuentaIndividual()}, Cuenta global: ${contadorC.getCuentaGlobal()}`);

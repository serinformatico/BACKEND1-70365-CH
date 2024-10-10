console.log("\nUso de 'const' para declarar variables");

function getFrontendCourse() {
    // No se podrá cambiar el valor en tiempo de ejecución
    const COURSE = "Programación Frontend I";

    const numbers = [ 10, 20, 50];
    numbers.shift();
    numbers.push(100);

    const pet = {
        name: "Bobbie",
        specie: "Perro",
        age: 5
    };

    pet.country = "Argentina";  // Agrega una propiedad en el objeto
    delete pet.age;             // Quita una propiedad del objeto

    // No se permite re-declaraciones dentro de un mismo ámbito
    // por ejemplo: const course = "Testing";

    console.log("\tAlcance de bloque:", COURSE, numbers);
}

getFrontendCourse();    // Ejecuta la función getFrontendCourse

// Aquí un console.log(course) daría error porque no tiene alcance la variable.

if (1 == "1") {
    // Declara la variable 'course'
    const COURSE = "Programación Backend I";

    // No se puede cambiar el valor en tiempo de ejecución
    // course = "Programación Frontend II";

    console.log("\tAlcance de bloque:", COURSE);
}

// Aquí un console.log(course) daría error porque no tiene alcance la variable.

const course = "Base de datos I";
console.log("\tAlcance global:", course);
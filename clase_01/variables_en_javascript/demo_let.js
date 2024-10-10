console.log("\nUso de 'let' para declarar variables");

function getFrontendCourse() {
    let course = "Programación Frontend I";
    course += " I";

    // No se permite re-declaraciones dentro de un mismo ámbito
    // por ejemplo: let course = "Testing";

    console.log("\tAlcance de bloque:", course);
}

getFrontendCourse();    // Ejecuta la función getFrontendCourse

// Aquí un console.log(course) daría error porque no tiene alcance la variable.

if (1 == "1") {
    let course = "Programación Backend I";
    course += " II";
    console.log("\tAlcance de bloque:", course);
}

// Aquí un console.log(course) daría error porque no tiene alcance la variable.

let course = "Base de datos I";
console.log("\tAlcance global:", course);
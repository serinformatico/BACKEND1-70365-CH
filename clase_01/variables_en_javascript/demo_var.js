console.log("\nUso de 'var' para declarar variables");

function getFrontendCourse() {
    var course = "Testing";                 // Declara la variable 'course'
    var course = "Programación Frontend";   // Re-declara la variable 'course'

    console.log("\tAlcance de función:", course);
}

getFrontendCourse();                        // Ejecuta la función getFrontendCourse

if (1 == "1") {
    var course = "Programación Backend";    // Declara la variable 'course'
    course = "Programación Backend I";      // Re-asignación del valor de la variable
}

console.log("\tAlcance global:", course);

var course = "Base de datos I";
console.log("\tAlcance global:", course);
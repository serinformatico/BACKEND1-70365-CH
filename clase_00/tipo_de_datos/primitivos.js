/*
    TIPO DE DATOS PRIMITIVOS:
        - String
        - Number
        - Boolean
        - Null
        - Undefined

    Los tipos de datos primitivos son los tipos más fundamentales
    y simples en un lenguaje de programación. Se trata de unidades
    básicas de información que no pueden descomponerse en componentes
    más pequeños.

    Cuando un valor primitivo se asigna o se pasa a una variable, se
    realiza una copia independiente de dicho valor. Esto significa que
    cualquier modificación aplicada a la nueva variable no afectará al
    valor original.
*/

console.log("\nDeclaración de variables y asignación de valores");

let course;                         // Declaración de variable
course = "Programación Backend";    // Asignación de valor
console.log("\tCurso:", course);

let classes = 17;                   // Declaración de variable y asignación de valor
console.log("\tClases:", classes);

let price = 125.70;
console.log("\tPrecio:", price);

let theProgrammingIsGood = true;
console.log("\tLa programación es buena:", theProgrammingIsGood);

let myProjectRating = null;
console.log("\tCalificación de mi proyecto:", myProjectRating);

let myProject; // undefined
console.log("\tMi proyecto:", myProject);

console.log("\nComprobación de asignación por valor");
let newCourse = course;
newCourse = "Programación Frontend";
console.log("\tNuevo Curso:", newCourse);
console.log("\tCurso Original:", course);

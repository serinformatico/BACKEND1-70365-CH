/*
    TEMPLATE STRING:

    En JavaScript las template strings en JavaScript son una forma fácil y flexible de crear
    cadenas de texto. Se usan comillas invertidas (`) en lugar de comillas simples o dobles,
    y permiten insertar variables o expresiones directamente dentro de la cadena usando ${ }.
        ● Interpolación de expresiones: Permite insertar variables, funciones o cualquier
        expresión JS dentro de una cadena.
        ● Multilínea: Facilita escribir cadenas de texto que abarcan varias líneas sin necesidad
        de concatenación o caracteres especiales.

    Las comillas invertidas también son denominadas "acentos graves" o "backticks".
*/

let firstName = "Carlos";
let course = "Programación Backend";
let message = `Hola, ${firstName}. Bienvenido al curso de ${course}.`;
console.log("\tMensaje Concatenado:", message);

let multiline = `
    Esta es una línea.
    Esta es otra línea.
    Y esta es la última línea.
`;
console.log("\tMensaje Multilínea:", multiline);
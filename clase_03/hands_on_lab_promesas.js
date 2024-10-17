/*
    HANDS ON LAB: Calculadora positiva con promesas

    ¿Cómo lo hacemos? Se crearán un conjunto de funciones gestionadas
    por promesas y un entorno ASÍNCRONO donde podremos ponerlas a
    prueba.

        • Definir función suma:
            -> Debe devolver una promesa que se resuelva siempre que ninguno de
               los dos sumados sea 0
            -> En caso de que algún sumando sea 0, rechazar la promesa indicando
               “Operación innecesaria”.
            -> En caso de que la suma sea negativa, rechazar la promesa indicando
               “La calculadora sólo debe devolver valores positivos
        • Definir función resta:
            -> Debe devolver una promesa que se resuelva siempre que ninguno de
               los dos valores sea 0
            -> En caso de que el minuendo o sustraendo sea 0, rechazar la promesa
               indicando “Operación inválida
            -> En caso de que el valor de la resta sea menor que 0, rechazar la
               promesa indicando “La calculadora sólo puede devolver valores
               positivos”
        • Definir una función multiplicación:
            -> Debe devolver una promesa que se resuelva siempre que ninguno de
               los dos factores sea negativo
            -> Si el producto es negativo, rechazar la oferta indicando “La
               calculadora sólo puede devolver valores positivos
        • Definir la misma función división utilizada en esta clase.
        • Definir una función asíncrona “cálculos”, y realizar pruebas utilizando
          async/await y try/catch.
*/

const suma = (numero1, numero2) => new Promise((resolve, reject) => {
    let resultado = numero1 + numero2;

    if (numero1 === 0 || numero2 === 0) {
        reject(new Error("Operación innecesaria"));
    }

    if (resultado < 0) {
        reject(new Error("La calculadora sólo debe devolver valores positivos"));
    }

    resolve(resultado);
});

const resta = (minuendo, sustraendo) => new Promise((resolve, reject) => {
    let resultado = minuendo - sustraendo;

    if (minuendo === 0 || sustraendo === 0) {
        reject(new Error("Operación inválida"));
    }

    if (resultado < 0) {
        reject(new Error("La calculadora sólo debe devolver valores positivos"));
    }

    resolve(resultado);
});

const multiplicacion = (numero1, numero2) => new Promise((resolve, reject) => {
    let producto = numero1 * numero2;

    if (producto < 0) {
        reject(new Error("La calculadora sólo debe devolver valores positivos"));
    }

    resolve(producto);
});

const division = (numero1, numero2) => new Promise((resolve, reject) => {
    let resultado = numero1 / numero2;

    if (resultado < 0) {
        reject(new Error("La calculadora sólo debe devolver valores positivos"));
    }

    resolve(resultado);
});

const calculos = async () => {
    const numero1 = 5;
    const numero2 = 3;

    try {
        let resultadoSuma = await suma(numero1, numero2);
        console.log(resultadoSuma);

        let resultadoResta = await resta(numero1, numero2);
        console.log(resultadoResta);

        let resultadoMultiplicacion = await multiplicacion(numero1, numero2);
        console.log(resultadoMultiplicacion);

        let resultadoDivision = await division(numero1, numero2);
        console.log(resultadoDivision);
    } catch (error) {
        console.error(error);
    }
};

calculos();
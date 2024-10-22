/*
    Instalando nuestra primera dependencia

    La dependencia "moment" es una herramienta utilizada para manipular, validar
    y mostrar fechas y horas en JavaScript. La misma, facilita la gestión de
    fechas y horas, lo que puede ser un área complicada en JavaScript debido a
    la variedad de formatos y comportamientos de las fechas en diferentes entornos
    y zonas horarias. Página oficial: https://momentjs.com/
*/

import moment from "moment";

const currentDate = moment();
const specificDate = moment("2022-01-17");

const currentSingleDate = moment().format('DD-MM-YYYY');
const currentSingleTime = moment().format('HH:mm:ss');

const currentDateMinusOneDay = moment().subtract(1, "day");
const currentDatePlusTwoDays = moment().add(2, "day");
const differenceInDaysBetweenDates = currentDate.diff(specificDate, 'days');
const differenceInYearsBetweenDates = currentDate.diff(specificDate, 'years');

console.log("Fecha y hora actual (object)", currentDate);
console.log("Fecha y hora específica (object)", specificDate);

console.log("Fecha actual formateada (string)", currentSingleDate);
console.log("Hora actual formateada (string)", currentSingleTime);

console.log("Fecha y hora actual menos un día (object)", currentDateMinusOneDay);
console.log("Fecha y hora actual más dos días (object)", currentDatePlusTwoDays);
console.log("Diferencia en días entre fechas (number)", differenceInDaysBetweenDates);
console.log("Diferencia en años entre fechas (number)", differenceInYearsBetweenDates);
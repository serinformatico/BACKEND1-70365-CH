const numbers = [10, 20, 30];

Array.prototype.myMap = function (callback) {
    const newArray = [];

    for (let i = 0; i < this.length; i++) {
        const currentValue = this[i];
        let newValue = callback(currentValue);
        newArray.push(newValue);
    }

    return newArray;
}

const numbersIncreasedByTwo = numbers.myMap((number) => number + 2);

console.log("\nEJEMPLO: Descomposición de la función map de JS");
console.log(numbersIncreasedByTwo);
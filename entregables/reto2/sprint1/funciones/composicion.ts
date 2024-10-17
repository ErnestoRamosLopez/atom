//no se usaron funciones de composicion en el proyecto

const compose = (f1: (x: any) => any, f2: (x: any) => any) => value => f2( f1(value) );

const wrapText = (text: string) => `|${text}|`;

//expected output ||holaaa||
console.log(compose(wrapText, wrapText)('holaaa'));
 

const carConsumption = (distance) => distance * 1.5;

const fuelLeft = (carName: string) => (fuelConsumption) => {
    const car = [{name: 'ford', totalFuel: 400}].find(it => it.name === carName)!.totalFuel;
    return car - fuelConsumption;
};

//expected output 392.5
console.log(compose(fuelLeft('ford'), carConsumption)(5));

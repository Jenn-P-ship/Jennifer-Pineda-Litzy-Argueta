// Integrantes: Jennifer Rebeca Guevara Pineda, Litzy Yudany Argueta Manzanares.
// Laboratorio 2: Calculadora de nómina recursiva 

//Aca las definiciones de los tipos
// Tipado del callback para calcular el bono
type BonoCallback = (antiguedad: number) => number;

//Estas son las funciones
//Calcula el pago por horas extra.
 
function calcularPagoHorasExtra(tarifa: number = 4.00, ...registrosHoras: number[]): number {
    // Si no hay registros de horas extra, devuelve 0
    if (registrosHoras.length === 0) {
        return 0;
    }

    let totalHoras: number = 0;
    for (const horas of registrosHoras) {
        totalHoras += horas;
    }
    
    return totalHoras * tarifa;
}


//Calcula el salario bruto sumando la base y las horas extra.
function calcularSalarioBruto(salarioBase: number, pagoHorasExtra: number): number {
    return salarioBase + pagoHorasExtra;
}

//Función que determina el bono según la regla de negocio.

function determinarBono(antiguedad: number): number {
    if (antiguedad >= 3) {
        return 20.00;
    }
    return 0.00;
}

//Aplica el bono recibiendo la antigüedad y ejecutando el callback tipado
function aplicarBono(antiguedad: number, callback: BonoCallback): number {
    return callback(antiguedad);
}

//Calcula el salario neto
function calcularSalarioNeto(salarioBruto: number, bono: number, descuento?: number): number {
    // Si se omite el descuento vaa a ser undefined
    let descuentoAplicado: number = 0;
    if (descuento !== undefined) {
        descuentoAplicado = descuento;
    }
    
    return salarioBruto + bono - descuentoAplicado;
}

//Función recursiva para acumular el total de la nómina.
function calcularTotalNomina(salariosNetos: number[]): number {
    // Caso base: Si el arreglo está vacío, la suma va a ser 0
    if (salariosNetos.length === 0) {
        return 0;
    }

    //Caso recursivo: Primer elemento y suma del resto del arreglo
    // Se usa slice(1) para no modificar el arreglo original 
    return salariosNetos[0] + calcularTotalNomina(salariosNetos.slice(1));
}

//Aca vaqmos a probar 

console.log("--- NÓMINA DE EMPLEADOS ---");

//Ana empleada ella tiene horas extra, con bono, con descuento
const pagoExtraAna: number = calcularPagoHorasExtra(undefined, 5, 2); 
const brutoAna: number = calcularSalarioBruto(450.00, pagoExtraAna);
const bonoAna: number = aplicarBono(4, determinarBono);
const netoAna: number = calcularSalarioNeto(brutoAna, bonoAna, 46.16);

console.log(`Ana   -> Salario Neto: $${netoAna.toFixed(2)}`);

//Luis empleado él no tiene horas extra, sin bono, con descuento
const pagoExtraLuis: number = calcularPagoHorasExtra(undefined); 
const brutoLuis: number = calcularSalarioBruto(550.00, pagoExtraLuis);
const bonoLuis: number = aplicarBono(1, determinarBono);
const netoLuis: number = calcularSalarioNeto(brutoLuis, bonoLuis, 56.38);

console.log(`Luis  -> Salario Neto: $${netoLuis.toFixed(2)}`);

//Marta esta vez ella si tiene horas extra, con bono, con descuento
const pagoExtraMarta: number = calcularPagoHorasExtra(undefined, 2); 
const brutoMarta: number = calcularSalarioBruto(480.00, pagoExtraMarta);
const bonoMarta: number = aplicarBono(5, determinarBono);
const netoMarta: number = calcularSalarioNeto(brutoMarta, bonoMarta, 49.20);

console.log(`Marta -> Salario Neto: $${netoMarta.toFixed(2)}`);

// Aca realizo una llamada sin descuento para comprobar mejor
// Empleado ficticio para validar el parámetro opcional omitido
const brutoPrueba: number = calcularSalarioBruto(300.00, 0);
const netoPruebaSinDescuento: number = calcularSalarioNeto(brutoPrueba, 0); 
console.log(`\n[Prueba extra] Empleado sin descuento -> Salario Neto: $${netoPruebaSinDescuento.toFixed(2)}`);

//Calculo del total
const listaSalarios: number[] = [netoAna, netoLuis, netoMarta];

console.log("\n--- TOTAL DE LA NÓMINA ---");
const totalNomina: number = calcularTotalNomina(listaSalarios);
console.log(`Total a desembolsar: $${totalNomina.toFixed(2)}`);

// Aqui hago una comprobacion extra con arreglo vacío
const totalVacio: number = calcularTotalNomina([]);
console.log(`[Prueba extra] Total con arreglo vacío: $${totalVacio.toFixed(2)}`);
// var se crea de forma global
// let solo para una sola variable
// const para valores inmutables mas ligeros

const nombre="Mario" 

if (true) {
    const nombre="Alejandro"
    console.log(nombre);
}

console.log(nombre);
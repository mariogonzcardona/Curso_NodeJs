// Funciones Tradicionales
function sumar(a,b=10){
    return a+b;
}

console.log(sumar(5));


// Funciones de Flecha

// const sumar2 =(a,b)=>{
//     return a+b
// };

const sumar2=(a,b)=>a+b;
console.log(sumar2(5,15));

const saludar=()=>"Saludar";
console.log(saludar());
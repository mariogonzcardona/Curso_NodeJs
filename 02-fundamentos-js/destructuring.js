const superman={
    nombre:'Clark',
    apellido:'Kent',
    poder:'Super fuerza',
    edad:26,
    getName:function(){
        return `${this.nombre} ${this.apellido} ${this.poder} `
    }
}
console.log(superman.getName());

// const nombre=superman.nombre
// const apellido=superman.apellido
// const poder=superman.poder

// Desestructuracion
// const {nombre,apellido,poder,edad=25}=superman;
// console.log(nombre,apellido,poder,edad);

// function imprimirHeroe(heroe){
//     const {nombre,apellido,poder,edad=25}=heroe;
//     console.log(nombre,apellido,poder,edad);
// }

function imprimirHeroe({nombre,apellido,poder,edad=25}){
    nombre="Mario"
    console.log(nombre,apellido,poder,edad);
}

imprimirHeroe(superman);

const herores=["Superman","Ironman","Cap America"]

// const h1=herores[0]
// const h2=herores[1]
// const h3=herores[2]

// console.log(h1,h2,h3);

// const [h1,h2,h3]=herores;
// console.log(h1,h2,h3);

const [,,h3]=herores;
console.log(h3);
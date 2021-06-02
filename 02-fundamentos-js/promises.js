const empleados=[
    {
        id:1,
        nombre:"Mario"
    },
    {
        id:2,
        nombre:"Alejandro"
    },
    {
        id:3,
        nombre:"Hunter"
    }
]

const salarios=[
    {
        id:1,
        salario:1500
    },
    {
        id:2,
        salario:1500
    }
]


const getEmpleadoById=(id)=>{
    const empleado=empleados.find(e => e.id===id)?.nombre;
    return promesa=new Promise((resolve,reject)=>{
        empleado ? resolve(empleado) : reject(`No existe empleado con id ${id}`);
    }); 
};
const getSalarioById=(id)=>{
    const salario=salarios.find(s => s.id===id)?.salario;
    return promesa=new Promise((resolve,reject)=>{
        salario ? resolve(salario) : reject(`No existe salario con id ${id}`);
    }); 
};
const id=3;
// getEmpleadoById(id).then(empleado=>console.log(empleado)).catch(err=>{console.log(err);});
// getSalarioById(id).then(salario=>console.log(salario)).catch(err=>{console.log(err);});

let nombre="";
getEmpleadoById(id)
.then(empleado=>{
    nombre=empleado;
    return getSalarioById(id)
})
.then(salario=>console.log(`El empleado: ${nombre} tiene un salario de: ${salario}`)).catch(err=>console.log(err));
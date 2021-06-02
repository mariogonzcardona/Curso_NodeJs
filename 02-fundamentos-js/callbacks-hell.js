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

const getEmpleadoById=(id,callback)=>{
    const empleado=empleados.find(e => e.id===id)?.nombre
    if(empleado) {
        callback(null,empleado)
    }
    else{
        callback(`Empleado con el id: ${id}, no existe.`)
    }
};

const getSalario=(id,callback)=>{
    const salario=salarios.find(e => e.id===id)?.salario;
    if(salario) {
        callback(null,salario)
    }
    else{
        callback(`Salario para el id: ${id}, no existe.`)
    }
};

const id=3;
getEmpleadoById(id,(err,empleado)=>{
    if(err){
        return console.log(err);
    }
    
    getSalario(id,(err,salario)=>{
        if(err){
            return console.log(err);
        }
        console.log(`El empleado: ${empleado} tiene un salario de: ${salario}`);
    })
});


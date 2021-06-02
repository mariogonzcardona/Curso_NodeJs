const fs=require('fs');
const colors=require('colors');

const crearArchivo= async(base=5,limit=false,list=10)=>{
    try {
        let salida="";
        let consola="";
        if(list){
            console.clear();
            console.log("=====================".green);
            console.log(`     Tabla del: ${colors.blue(base)}`.green);
            console.log("=====================".green);
            for (let i = 1; i <= limit; i++) {
                salida +=`${base} x ${i} = ${base*i}\n`;
                consola +=`${base} ${'x'.green} ${i} ${'='.green} ${base*i}\n`;
            }
            console.log(consola);
        }
        
        fs.writeFileSync(`./salida/Tabla-${base}.txt`,salida);
        return `Tabla-${base}.txt`;
    } catch (err) {
        throw err
    }
};
module.exports={
    crearArchivo
};
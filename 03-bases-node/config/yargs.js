const argv=require('yargs')
    .options({"b":{
        alias:"base",
        type:'number',
        demandOption:true,
        describe: 'Es la base de la tabla de multiplicar',
        },
        "h":{
            alias:"hasta",
            type:'number',
            default:10,
            describe: 'Es el limite para hacer la tabla de multiplicar',
            },
        "l":{
            alias:"list",
            type:'boolean',
            default:false,
            describe: 'Muestra la tabla en consola',
            }
    })
    .check((argv,options)=>{
        if( isNaN(argv.b)){
            throw "La base tiene que ser un numero"
        }
        return true;
    }) 
    .argv;

module.exports=argv;
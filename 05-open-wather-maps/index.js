require('dotenv').config();
const { inquirerMenu, pausa, leerInput,listarLugares } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');


const main=async()=>{
    const busquedas=new Busquedas();
    let opt="";

    do {
        // Imprimir el menu
        opt=await inquirerMenu();
        switch (opt) {
            case 1:
                //Mostrar mensaje
                const termino=await leerInput("Ciudad:")
                // Buscar los lugares
                const lugares=await busquedas.ciudad(termino);

                // Seleccionar lugar
                const id=await listarLugares(lugares);
                if(id==='0'){
                    continue;
                }
                const lugarSelec=lugares.find(l=>l.id===id);
                busquedas.agregarHistorial(lugarSelec.nombre);
                
                const {nombre,lon,lat}=lugarSelec
                
                const clima=await busquedas.climaLugar(lat,lon)
                const {desc,temp,temp_min,temp_max}=clima
                
                // Mostrar Resultados
                console.clear();
                console.log("\nInformacion de la ciudad\n".green);
                console.log("Ciudad:",nombre.green);
                console.log("Lat:",lat);
                console.log("Long:",lon);
                console.log("Temperatura:",temp);
                console.log("Mínima:",temp_min);
                console.log("Máxima:",temp_max);
                console.log("Como esta el clima:",desc.green);
                break;
            case 2:
                busquedas.historialCapitalizado.forEach((lugar,i)=>{
                    const idx=`${i+1}.`.green;
                    console.log(`${idx} ${lugar} `);
                });
                break;
        }
        if(opt!==0) await pausa();
    } while (opt!==0);
}

main();
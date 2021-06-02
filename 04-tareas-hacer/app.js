require('colors');
const {guardarDB,leerDB}=require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput,listadoTareasBorrar,confirmar,mostrarListadoCheckList } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');


const main=async()=>{
    let opt="";
    const tareas=new Tareas()
    const tareasDB=leerDB();
    
    if(tareasDB){
        // Establecer las tareas
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        // Imprimir el menu
        opt=await inquirerMenu();
        switch (opt) {
            case "1":
                const desc=await leerInput("Descripción:")
                tareas.crearTarea(desc);
                break;
            case "2":
                tareas.listadoCompleto()
                break;
            case "3":
                tareas.listarPendientesCompletadas()
                break;
            case "4":
                tareas.listarPendientesCompletadas(false)
                break;
            case "5":
                const ids= await mostrarListadoCheckList(tareas.listadoArr)
                tareas.toggleCompletadas(ids);
                break;
            case "6":
                const id=await listadoTareasBorrar(tareas.listadoArr)
                if(id!=='0'){
                    const confirm=await confirmar("¿Estas segudo?")
                    if(confirm){
                        tareas.borrarTarea(id);
                        console.log("La tarea se ha borrado.");
                    }
                }
                break;
        }
        guardarDB(tareas.listadoArr);
        await pausa();
    } while (opt!=='0');
}

main();
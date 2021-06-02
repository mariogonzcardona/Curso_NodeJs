const fs=require('fs');
const axios=require('axios');
class Busquedas{
    historial=[];
    dbPath='./db/database.json';
    constructor(){
        // TODO:leed DB si existe
        this.leerDB();
    }

    get historialCapitalizado(){
        return this.historial.map(lugar=>{
            let palabras=lugar.split(' ');
            palabras=palabras.map(p=>p[0].toUpperCase()+p.substring(1));
            return palabras.join(' ');
        });
    }

    get paramsMapbox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit':6,
            'language':'es'
        }
    }
    get paramOpenWeather(){
        return {
            appid:process.env.OPENWEATHER_KEY,
            units:'metric',
            lang:'es',
        }
    }

    async ciudad(lugar=""){
       try {
            // Realizar peticion http
            const instance =axios.create({
                baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params:this.paramsMapbox
            });
            const response=await instance.get();
            return response.data.features.map(lugar=>({
                id:lugar.id,
                nombre:lugar.place_name,
                lon:lugar.center[0],
                lat:lugar.center[1],
            }));
       } catch (error) {
        //    console.log();
           return [];
       }
    }
    async climaLugar(lat,lon){
        try {
            // Realizar peticion http
            const instance =axios.create({
                baseURL:`https://api.openweathermap.org/data/2.5/weather`,
                params:{...this.paramOpenWeather,lat,lon}
            });
            const response=await instance.get();
            const {weather,main}=response.data;
            return {
                desc:weather[0].description,
                temp:main.temp,
                temp_min:main.temp_min,
                temp_max:main.temp_max,
            }
            
        } catch (error) {
            console.log(error);
        }
    }
    agregarHistorial(lugar=''){
        if(this.historial.includes(lugar.toLowerCase())){
            return;
        }
        this.historial=this.historial.splice(0,5);

        // TODO: prevenir duplicados
        this.historial.unshift(lugar.toLowerCase());
        // grabar en DB o file
        this.guardarDB();
    }
    guardarDB(){
        const payload={
            historial:this.historial
        }
        fs.writeFileSync(this.dbPath,JSON.stringify(payload));
    }
    leerDB(){
        if(!fs.existsSync(this.dbPath)) null;
        
        const info=fs.readFileSync(this.dbPath,{encoding:'utf-8'});
        const data=JSON.parse( info );
        this.historial=data.historial;
    }
}
module.exports=Busquedas;
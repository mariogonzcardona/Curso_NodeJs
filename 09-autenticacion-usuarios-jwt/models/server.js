const express = require('express');
const app = express();
var cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath='/api/users';
        this.authPath='/api/auth';

        // Conectar a DB
        this.conectarDB();

        // Middlewares
        this.middlewares();
        // Rutas de mi aplicacion
        this.routes();
    }

    
    async conectarDB(){
        await dbConnection()
    }

    middlewares() {
        //  CORS
        app.use(cors())

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio Publico
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.authPath,require('../routes/auth'))
        this.app.use(this.usersPath,require('../routes/user'))
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto:", process.env.PORT);
        });
    }
}
module.exports = Server;
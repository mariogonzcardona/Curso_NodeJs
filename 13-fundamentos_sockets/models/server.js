const express = require('express');
const app = express();
var cors = require('cors');
const { socketController } = require('../sockets/controller');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server=require('http').createServer(this.app);
        this.io=require('socket.io')(this.server);
        this.paths={}

        // Middlewares
        this.middlewares();
        // Rutas de mi aplicacion
        this.routes();

        // Sockets
        this.socket();
    }

    middlewares() {
        //  CORS
        app.use(cors())

        // Directorio Publico
        this.app.use(express.static('public'))
    }

    routes() {
        // this.app.use(this.paths.auth,require('../routes/auth'))
    }

    socket() {
        this.io.on('connection', socketController);
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log("Servidor corriendo en puerto:", process.env.PORT);
        });
    }
}
module.exports = Server;
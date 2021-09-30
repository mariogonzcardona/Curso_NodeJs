const express = require('express');
var cors = require('cors');
const fileupload = require('express-fileupload');
const {socketController} = require('../sockets/controller');
const {createServer}=require('http');

const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.paths = {
            auth: '/api/auth',
            search: '/api/search',
            categories: '/api/categories',
            products: '/api/products',
            users: '/api/users',
            uploads: '/api/uploads',
        }

        this.usersPath = '/api/users';
        this.authPath = '/api/auth';

        // Conectar a DB
        this.conectarDB();

        // Middlewares
        this.middlewares();
        // Rutas de mi aplicacion
        this.routes();

        // Sockets
        this.sockets();
    }


    async conectarDB() {
        await dbConnection()
    }

    middlewares() {
        //  CORS
        this.app.use(cors())

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio Publico
        this.app.use(express.static('public'))

        // Fileupload- Carga de archivos
        this.app.use(fileupload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.search, require('../routes/search'))
        this.app.use(this.paths.categories, require('../routes/categories'))
        this.app.use(this.paths.products, require('../routes/products'))
        this.app.use(this.paths.users, require('../routes/user'))
        this.app.use(this.paths.uploads, require('../routes/uploads'))
    }

    sockets() {
        this.io.on('connection',(socket)=> socketController(socket,this.io));
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log("Servidor corriendo en puerto:", process.env.PORT);
        });
    }
}
module.exports = Server;
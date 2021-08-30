const express = require('express');
const app = express();
var cors = require('cors');
const fileupload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths={
            auth:'/api/auth',
            search:'/api/search',
            categories:'/api/categories',
            products:'/api/products',
            users:'/api/users',
            uploads:'/api/uploads',
        }

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

        // Fileupload- Carga de archivos
        this.app.use(fileupload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.paths.auth,require('../routes/auth'))
        this.app.use(this.paths.search,require('../routes/search'))
        this.app.use(this.paths.categories,require('../routes/categories'))
        this.app.use(this.paths.products,require('../routes/products'))
        this.app.use(this.paths.users,require('../routes/user'))
        this.app.use(this.paths.uploads,require('../routes/uploads'))
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto:", process.env.PORT);
        });
    }
}
module.exports = Server;
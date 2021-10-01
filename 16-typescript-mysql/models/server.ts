import express,{Application} from 'express';
import userRoutes from '../routes/user';
import cors from 'cors'

import db from '../db/connection';

class Server{
    private app: Application;
    private port: string;
    private apiPaths={
        users:"/api/users"
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || "8000";

        // Define db connection
        this.dbConnection();

        //Define middleware
        this.middleware();

        //Define routes
        this.routes();
    }

    //TODO: Connect to the database
    async dbConnection(){
        try {
            await db.authenticate();
            console.log('Connection has been established successfully.');
            
        } catch (error:any) {
            throw new Error( error );
        }
    }

    middleware(){
        //CORS
        this.app.use(cors());
        //Read body
        this.app.use(express.json());
        //Public File
        this.app.use(express.static('public'));
    }

    routes(){
       this.app.use(this.apiPaths.users, userRoutes); 
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server on port', this.port);
        });
    }
}
export default Server;
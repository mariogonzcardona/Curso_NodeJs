import dotenv from 'dotenv';
import Server from './models/server';

//Configure dotenv
dotenv.config();

const server=new Server();
server.listen();

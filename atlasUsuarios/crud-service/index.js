import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
//importo los paquetes y los ficheros
import Routes from './server/route.js';
import Connection from './database/db.js';

const app = express();





app.use(bodyParser.json({extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());//uso cors

app.use('/', Routes);//la ruta principal es localhost:8080/



const PORT = '8080';

Connection();
 //escucho en el puerto
app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));
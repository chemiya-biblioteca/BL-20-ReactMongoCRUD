import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";

const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/fullstack_db',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});//conecto con mongo
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database Connected...'));//error o conexion

app.use(cors());//uso cors
app.use(express.json());
app.use(UserRoute);//para las rutas

app.listen(5000, ()=> console.log('Server up and running...'));//escuchando en el puerto
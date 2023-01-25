const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoute = require("./routes/user");//importo los paquetes

// settings
const app = express();//llamo a express
const port =  9000;

// middlewares
app.use(express.json());
app.use("/api", userRoute);//llamo las rutas de los usuarios

// routes
app.get("/", (req, res) => {
  res.send("Welcome to my API");//puedes acceder a esta ruta
});

const database=module.exports=()=>{
  const connectionParams={
      useNewUrlParser:true,
      useUnifiedTopology:true
  }//parametros de la conexion
  try{
      mongoose.connect("mongodb+srv://admin:Pf2BfzKRkY75bMMP@cluster0.5eb72n0.mongodb.net/mongo-conexion?retryWrites=true&w=majority",
      connectionParams)
      console.log("conectado mongo")//conecto con mongo
  }catch(error){
      console.log(error)
  }
}
database()//inicio la database
app.listen(9000,()=>{//escuchando en el puerto
  console.log("servidor en el 9000")
})

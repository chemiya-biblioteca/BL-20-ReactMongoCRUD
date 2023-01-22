const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoute = require("./routes/user");

// settings
const app = express();
const port = process.env.PORT || 9000;

// middlewares
app.use(express.json());
app.use("/api", userRoute);

// routes
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

const database=module.exports=()=>{
  const connectionParams={
      useNewUrlParser:true,
      useUnifiedTopology:true
  }
  try{
      mongoose.connect("mongodb+srv://admin:Pf2BfzKRkY75bMMP@cluster0.5eb72n0.mongodb.net/mongo-conexion?retryWrites=true&w=majority",
      connectionParams)
      console.log("conectado mongo")
  }catch(error){
      console.log(error)
  }
}
database()
app.listen(9000,()=>{
  console.log("servidor en el 9000")
})

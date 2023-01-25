const express = require("express");
const cors = require("cors");
//importo los paquetes
const app = express();



app.use(cors());//uso cors


app.use(express.json());


app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");//hago la conexion con mongo
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,//parametros de la conexion
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");//correcto o fallo
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


app.get("/", (req, res) => {//ruta principal, puedes acceder con localhost:8080/
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/turorial.routes")(app);


const PORT =  8080;
app.listen(PORT, () => {//pongo a escuchar en el puerto
  console.log(`Server is running on port ${PORT}.`);
});

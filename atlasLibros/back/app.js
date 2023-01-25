var express = require("express");//importo paquetes. primero descargarlos con npm i 
var path = require("path");
var logger = require("morgan");
var cors = require('cors');
var bodyParser = require("body-parser");

require("./config/db");//llamo el fichero con la conexion

var book = require("./routes/book");//llamo el que tiene las rutas

var app = express();//creo express y aplico cors
app.use(cors());

const port = parseInt( 8080);//asigno puerto

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "true" }));
app.use(express.static(path.join(__dirname, "build")));

app.use("/api/book", book);//ruta base, puedes buscar en el navegador localhost:8080/api/book

app.listen(port, () => {//me pongo a esperar en el puerto
  console.log("connected to localhost port:" + port);
});

const mongoose = require("mongoose");
//conexion con mongo
const uri =
  "mongodb+srv://admin:2vjflKglLelzrcgv@cluster0.ldjx5vo.mongodb.net/completoAtlas1?retryWrites=true&w=majority";

mongoose
  .connect(
    uri,//parametros de la conexion
    { useNewUrlParser: true }
  )
  .then(
    () => {
      console.log("connected to database");//si conecta correcto o eerror
    },
    err => {
      console.log("error on connecting to databse");
    }
  );

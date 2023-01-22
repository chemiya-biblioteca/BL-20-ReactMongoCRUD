const mongoose = require("mongoose");

const uri =
  "mongodb+srv://admin:2vjflKglLelzrcgv@cluster0.ldjx5vo.mongodb.net/completoAtlas1?retryWrites=true&w=majority";

mongoose
  .connect(
    uri,
    { useNewUrlParser: true }
  )
  .then(
    () => {
      console.log("connected to database");
    },
    err => {
      console.log("error on connecting to databse");
    }
  );

const express = require("express");
const userSchema = require("../models/user");

const router = express.Router();//llamo el router de express

// create user
router.post("/users", (req, res) => {//aceder a /api/users para ver datos
  const user = userSchema(req.body);//cojo el cuerpo de la peticion, lo guardo y mando mensaje
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get all users
router.get("/users", (req, res) => {
  userSchema
    .find()
    .then((data) => res.json(data))//busco todos en la base de datos y los devuelvo
    .catch((error) => res.json({ message: error }));
});

// get a user
router.get("/users/:id", (req, res) => {
  const { id } = req.params;//cojo id de la ruta y lo busco en la base de datso y lo devuelvo
  userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// delete a user
router.delete("/users/:id", (req, res) => {
  const { id } = req.params;//cojo id de la ruta y lo elimino y devuelvo datos
  userSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// update a user
router.put("/users/:id", (req, res) => {
  const { id } = req.params;//cojo id de la ruta
  const { name, age, email } = req.body;//cojo del cuerpo los datos
  userSchema
    .updateOne({ _id: id }, { $set: { name, age, email } })//actualizo poniendo los datos y lo devuelvo
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;//lo exporto

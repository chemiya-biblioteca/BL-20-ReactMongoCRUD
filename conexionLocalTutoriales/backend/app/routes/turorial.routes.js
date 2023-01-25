module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();//creo el router de express

  // Create a new Tutorial
  router.post("/", tutorials.create);//por cada ruta llamo al controlador su metodo

  // Retrieve all Tutorials
  router.get("/", tutorials.findAll);

  // Retrieve all published Tutorials
  router.get("/published", tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", tutorials.findOne);

  // Update a Tutorial with id
  router.put("/:id", tutorials.update);

  // Delete a Tutorial with id
  router.delete("/:id", tutorials.delete);

  // Create a new Tutorial
  router.delete("/", tutorials.deleteAll);

  app.use("/api/tutorials", router);//ruta principal localhost:8080/api/users donde se muestran los datos
};

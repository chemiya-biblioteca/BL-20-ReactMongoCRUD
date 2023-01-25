const db = require("../models");
const Tutorial = db.tutorials;//aqui estas cogiendo el modelo de tutorial que lo utilizas para hacer las operaciones en la base de datos

//exportas los metodos para que pueda acceder
// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {//compruebo si hay titulo y si no hay mando fallo
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Tutorial
  const tutorial = new Tutorial({//creo tutorial con los datos del body
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  // Save Tutorial in the database
  tutorial
    .save(tutorial)//lo guardo en la base de datos
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({//mando error si no funciona
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;//cojo el titulo de la peticion
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  //si hay un titulo busco los que tienen el mismo titulo si no, busco todos
  Tutorial.find(condition)
    .then(data => {
      res.send(data);//envio todos los datos 
    })
    .catch(err => {
      res.status(500).send({//envio error
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;//cojo el id de la peticion

  Tutorial.findById(id)//busco ese en la base de datos y devuelvo los datos o error
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  if (!req.body) {//compruebo que no esta vacio
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;//cojo el id de la peticion

  Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {//actualizo pasandoe l id y el body
      if (!data) {//si no devuelve nada error 
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else res.send({ message: "Tutorial was updated successfully." });// si no se actualiza corrrectamente
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;//cojo el id de la ruta

  Tutorial.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {//le digo que lo borre
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else {
        res.send({//si lo borra correctamente
          message: "Tutorial was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.deleteMany({})//borras muchos
    .then(data => {
      res.send({//dices cuantos borrados
        message: `${data.deletedCount} Tutorials were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Tutorial.find({ published: true })//buscas todos con la condicion
    .then(data => {
      res.send(data);//devulves los datos
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

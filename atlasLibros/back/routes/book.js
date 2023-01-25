var express = require("express");//importo los paquetes
var router = express.Router();//llamo al router
var mongoose = require("mongoose");
var Book = require("../models/Book");

//get all books
router.get("/", (req, res) => {//cuando vayas a /
  Book.find((err, books) => {//del esquema de book buscas
    if (err) {//si error, mandas status 500 con error
      res.status(500).send(err);
    }
    res.status(200).json(books);//si no 200 con los libros en json
  });
});

//get single book
router.get("/:id", (req, res) => {//ruta con el id
  Book.findById(//buscar por el id en mongo
    {
      _id: req.params.id//parametro _id que te lleha
    },
    (err, book) => {
      if (err) {
        res.status(500).send(err);//si error lo mandas
      }
      res.status(200).json(book);//si no lo conviertes a json
    }
  );
});

//save book
router.post("/", (req, res) => {//post en /
  Book.create(req.body, (err, book) => {//creas en la base con lo del body
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json(book);//devuelves error o 201 en json
  });
});

router.put("/:id", (req, res) => {
  Book.findByIdAndUpdate(//recibes id para actualizar
    {
      _id: req.params.id//coges el id de la peticion
    },
    req.body,//mandas el nuevo
    (err, book) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(book);//error o respuesta en json
    }
  );
});

router.delete("/:id", (req, res) => {
  Book.findByIdAndDelete(//recibes el id, mandas el id
    {
      _id: req.params.id
    },
    (err, book) => {
      if (err) {
        res.status(404).send(err);//mandas error o mensaje correcto
      }
      res.status(200).json({ message: "Task successfully deleted" });
    }
  );
});

module.exports = router;

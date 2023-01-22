var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Book = require("../models/Book");

//get all books
router.get("/", (req, res) => {
  Book.find((err, books) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(books);
  });
});

//get single book
router.get("/:id", (req, res) => {
  Book.findById(
    {
      _id: req.params.id
    },
    (err, book) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(book);
    }
  );
});

//save book
router.post("/", (req, res) => {
  Book.create(req.body, (err, book) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json(book);
  });
});

router.put("/:id", (req, res) => {
  Book.findByIdAndUpdate(
    {
      _id: req.params.id
    },
    req.body,
    (err, book) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(book);
    }
  );
});

router.delete("/:id", (req, res) => {
  Book.findByIdAndDelete(
    {
      _id: req.params.id
    },
    (err, book) => {
      if (err) {
        res.status(404).send(err);
      }
      res.status(200).json({ message: "Task successfully deleted" });
    }
  );
});

module.exports = router;

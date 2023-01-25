var mongoose = require("mongoose");

var BookSchema = new mongoose.Schema({
  isbn: String,
  title: String,
  author: String,
  description: String,
  published_year: Number,
  publisher: String,
  updated_date: { type: Date, default: Date.now }
});//creas el esquema de mongo y lo exportas para que lo puedan utilizar

module.exports = mongoose.model("Book", BookSchema);

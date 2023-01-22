var express = require("express");
var path = require("path");
var logger = require("morgan");
var cors = require('cors');
var bodyParser = require("body-parser");

require("./config/db");

var book = require("./routes/book");

var app = express();
app.use(cors());

const port = parseInt(process.env.PORT || 8080);

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "true" }));
app.use(express.static(path.join(__dirname, "build")));

app.use("/api/book", book);

app.listen(port, () => {
  console.log("connected to localhost port:" + port);
});

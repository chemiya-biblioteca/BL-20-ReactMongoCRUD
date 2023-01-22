import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Create from "./components/create";
import Show from "./components/show";
import Edit from "./components/edit";


ReactDOM.render(
  <Router>
  <div>
    <Route exact path="/" component={App} />
    <Route path="/create" component={Create} />
    <Route path="/show/:id" component={Show} />
    <Route path="/edit/:id" component={Edit} />
  </div>
</Router>,

  document.getElementById("root")
);



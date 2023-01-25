import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Show extends Component {
  constructor(props) {
    super(props);//creo las props y el libro concreto
    this.state = {
      book: {}
    };
  }

  componentDidMount() {//al montar, llamo a la api por el libro concreto que viene en la ruta
    axios
      .get("http://localhost:8080/api/book/" + this.props.match.params.id)
      .then(res => {
        this.setState({ book: res.data }, () => {
          console.log(this.state.book);
        });//lo guardo en la variable de estado
      });
  }

  delete(id) {
    console.log(id);//si da en eliminar, llamo a la api para que lo borre y viajo a la ruta /
    axios.delete("http://localhost:8080/api/book/" + id).then(result => {
      this.props.history.push("/");
    });
  }

  render() {
    const { book } = this.state;//cojo la variable de los libros

    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">{book.title}</h3>{/*muestro el titulo */}
          </div>
          <div className="panel-body">
            <h4>
              <Link to="/">
                <span
                  className="glyphicon glyphicon-th-list"
                  aria-hidden="true"
                />{" "}
                Book List
              </Link>{/**enlace para ir a la lista */}
            </h4>
            <dl>
              <dt>ISBN:</dt>
              <dd>{book.isbn}</dd>
              <dt>Author:</dt>
              <dd>{book.author}</dd>
              <dt>Description:</dt>
              <dd>{book.description}</dd>
              <dt>Publish Date:</dt>
              <dd>{book.published_year}</dd>
              <dt>Publisher:</dt>
              <dd>{book.publisher}</dd>{/**muestro los datos de los libros */}
            </dl>
            <Link to={`/edit/${book._id}`} className="btn btn-success">
              Edit
            </Link>{/**enlace para editarlo, voy a la ruta con el id */}
            &nbsp;
            <button
              onClick={this.delete.bind(this, book._id)}
              className="btn btn-danger"
            >{/**para enlazar con el evento hay que hacer bind y le pasamos this y el id */}
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

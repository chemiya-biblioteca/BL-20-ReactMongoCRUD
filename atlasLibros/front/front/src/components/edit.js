import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Edit extends Component {
  constructor(props) {//recibo en props el id
    super(props);
    this.state = {//creamos el stado con el libro
      book: {}
    };
    this.onChange = this.onChange.bind(this);//podemos poner aqui el bind en vez de abajo
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {//al montar, llamamo a la api con el id de la ruta y guardamos el libro en el state
    axios
      .get("http://localhost:8080/api/book/" + this.props.match.params.id)
      .then(res => {
        this.setState({ book: res.data }, () => {
          console.log(this.state.book);
        });
      });
  }

  onChange(e) {//cuando se cambien un campo, cogemos el estado y le asignamos el nuevo valor y volvemos a asignar
    const state = this.state.book;
    state[e.target.name] = e.target.value;
    this.setState({ book: state });
  }

  onSubmit(e) {
    e.preventDefault();
    const {
      isbn,
      title,
      author,
      description,
      published_year,
      publisher
    } = this.state.book;//cogemos del estado el libro

    axios//actaulizamo pasando el id a la api con los nuevos datos del libro
      .put("http://localhost:8080/api/book/" + this.props.match.params.id, {
        isbn,
        title,
        author,
        description,
        published_year,
        publisher
      })
      .then(result => {//si es correcto volvemos a la ruta donde se muestra
        this.props.history.push("/show/" + this.props.match.params.id);
        console.log("edited...");
      });
  }

  render() {
    const {
      isbn,
      title,
      author,
      description,
      published_year,
      publisher
    } = this.state.book;//cogemos el libro del estado

    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">EDIT BOOK</h3>
          </div>
          <div className="panel-body">
            <h4>
              <Link to={`/show/${this.state.book._id}`}>
                <span
                  className="glyphicon glyphicon-eye-open"
                  aria-hidden="true"
                />{" "}
                Book List
              </Link>{/**enlace para volver a mostrar los datos */}
            </h4>
            <form onSubmit={this.onSubmit}>{/**evento se sube el formulario */}
              <div className="form-group">
                <label htmlFor="isbn">ISBN:</label>
                <input
                  type="text"
                  className="form-control"
                  name="isbn"
                  value={isbn}
                  onChange={this.onChange}
                  placeholder="ISBN"
                />{/**enlazo con el campo del libro y evento para manejar el cambio */}
              </div>
              <div class="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={title}
                  onChange={this.onChange}
                  placeholder="Title"
                />
              </div>
              <div class="form-group">
                <label htmlFor="author">Author:</label>
                <input
                  type="text"
                  className="form-control"
                  name="author"
                  value={author}
                  onChange={this.onChange}
                  placeholder="Author"
                />
              </div>
              <div class="form-group">
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  value={description}
                  onChange={this.onChange}
                  placeholder="Description"
                />
              </div>
              <div class="form-group">
                <label htmlFor="published_date">Published Date:</label>
                <input
                  type="number"
                  className="form-control"
                  name="published_year"
                  value={published_year}
                  onChange={this.onChange}
                  placeholder="Published Year"
                />
              </div>
              <div class="form-group">
                <label htmlForN="publisher">Publisher:</label>
                <input
                  type="text"
                  className="form-control"
                  name="publisher"
                  value={publisher}
                  onChange={this.onChange}
                  placeholder="Publisher"
                />
              </div>
              <button type="submit" className="btn btn-default">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

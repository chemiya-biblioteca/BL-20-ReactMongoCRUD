import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };//creo las rpops y en el stado guardo los libros
  }

  componentDidMount() {//nada mas montar el componente
    axios.get("http://localhost:8080/api/book").then(res => {
      this.setState({ books: res.data }, () => {
        console.log(this.state.books);
      });//mando la peticion a la api y guardo los libros en el estado
    });
  }

  render() {
    const { books } = this.state;//cojo los libros del estado
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Book Catalog</h3>
          </div>
          <div className="panel-body">
            <h4>
              <Link to="/create">{/**enlace ruta crear */}
                <span
                  className="glyphicon glyphicon-plus-sign"
                  aria-hidden="true"
                />
                Add Book
              </Link>
            </h4>
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>ISBN</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Publisher</th>
                </tr>
              </thead>
              <tbody>{/**muestro los libros, del array, enlace para acceder a uno concreto y muestro sus atributos */}
                {books.map(book => (
                  <tr key={book.title}>
                    <td>
                      <Link to={`/show/${book._id}`}>{book.isbn}</Link>
                    </td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.publisher}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

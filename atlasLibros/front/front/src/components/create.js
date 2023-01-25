import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


class Create extends Component {
  constructor() {
    super();
    this.state = {
      isbn: "",
      title: "",
      author: "",
      description: "",
      published_year: "",
      publisher: ""
    };//creo un libro vacio en el estado
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);//enlazo los evnetos
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value }, () => {
      console.log(this.state);
    });//asigno el campo que he cambiado del liibro y lo guardo
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
    } = this.state;//cojo el estado
    axios
      .post("http://localhost:8080/api/book", {
        isbn,
        title,
        author,
        description,
        published_year,
        publisher
      })
      .then(result => {//llamo la api para que lo guarde y vuelvo a la ruta principal
        this.props.history.push("/");
        console.log("submitted...");
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
    } = this.state;//cojo la variable

    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">ADD BOOK</h3>
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
            <form onSubmit={this.onSubmit}>{/**evento para anejar el envio */}
              <div className="form-group">
                <label htmlFor="isbn">ISBN:</label>
                <input
                  type="text"
                  className="form-control"
                  name="isbn"
                  value={isbn}
                  onChange={this.onChange}
                  placeholder="ISBN"
                />{/**enlazo con el atribuo y evento para cuiando cambie */}
              </div>
              <div className="form-group">
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
              <div className="form-group">
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
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  className="form-control"
                  name="description"
                  onChange={this.onChange}
                  placeholder="Description"
                  cols="80"
                  rows="3"
                  value={description}
                >
                  {description}
                </textarea>
              </div>
              <div className="form-group">
                <label htmlFor="published_date">Published Year:</label>
                <input
                  type="number"
                  className="form-control"
                  name="published_year"
                  value={published_year}
                  onChange={this.onChange}
                  placeholder="Published Year"
                />
              </div>
              <div className="form-group">
                <label htmlFor="publisher">Publisher:</label>
                <input
                  type="text"
                  className="form-control"
                  name="publisher"
                  value={publisher}
                  onChange={this.onChange}
                  placeholder="Publisher"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Create;

import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {}
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/api/book/" + this.props.match.params.id)
      .then(res => {
        this.setState({ book: res.data }, () => {
          console.log(this.state.book);
        });
      });
  }

  delete(id) {
    console.log(id);
    axios.delete("http://localhost:8080/api/book/" + id).then(result => {
      this.props.history.push("/");
    });
  }

  render() {
    const { book } = this.state;

    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">{book.title}</h3>
          </div>
          <div className="panel-body">
            <h4>
              <Link to="/">
                <span
                  className="glyphicon glyphicon-th-list"
                  aria-hidden="true"
                />{" "}
                Book List
              </Link>
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
              <dd>{book.publisher}</dd>
            </dl>
            <Link to={`/edit/${book._id}`} className="btn btn-success">
              Edit
            </Link>
            &nbsp;
            <button
              onClick={this.delete.bind(this, book._id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/TutorialService";
import { Link } from "react-router-dom";

const TutorialsList = () => {
  const [tutorials, setTutorials] = useState([]);//creo variable para todos los tutoriales, par auno concreto y title y el index
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveTutorials();
  }, []);//al cargar traer todos

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;//coges el valor que te lelga y lo guardas
    setSearchTitle(searchTitle);
  };

  const retrieveTutorials = () => {
    TutorialDataService.getAll()//llamas a la api que los traiga y los guardas en la variable
      .then(response => {
        setTutorials(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {//recoges todos e inicias campos
    retrieveTutorials();
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };

  const setActiveTutorial = (tutorial, index) => {//guardas en las variables los argumentos
    setCurrentTutorial(tutorial);
    setCurrentIndex(index);
  };

  const removeAllTutorials = () => {
    TutorialDataService.removeAll()//llamas a la api para que los borre y actualizas lista
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    TutorialDataService.findByTitle(searchTitle)//llamas a la api con el titulo de la variable
      .then(response => {
        setTutorials(response.data);//asignas el resutlado
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >{/**enlazas con elt itulo y evento para gestioanrlo y buscar  */}
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Tutorials List</h4>

        <ul className="list-group">
          {tutorials &&
            tutorials.map((tutorial, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveTutorial(tutorial, index)}
                key={index}
              >
                {tutorial.title}
              </li>
            ))}{/**muestras todos los tutoriales y enlazas con boton para activar uno y al que tenga el index le das estilo css */}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllTutorials}
        >{/**bton para borrar todos */}
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentTutorial ? (
          <div>
            <h4>Tutorial</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentTutorial.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentTutorial.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentTutorial.published ? "Published" : "Pending"}
            </div>
            <button>{/**si hay algun tutorial seleccinado muestras sus datos enlazandolos */}
            <Link
              to={"/tutorials/" + currentTutorial.id}
              className=""
            >
              Edit
            </Link>{/**boton para editarlo */}
            </button>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}{/**si no hay ninguno seleccionado */}
      </div>
    </div>
  );
};

export default TutorialsList;

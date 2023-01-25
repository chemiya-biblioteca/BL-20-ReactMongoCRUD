import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import TutorialDataService from "../services/TutorialService";

const Tutorial = props => {
  const { id }= useParams();//para los paramteros
  let navigate = useNavigate();//pars navegar

  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false
  };//creo uno inicial
  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);//creo variables con estado inicial
  const [message, setMessage] = useState("");

  const getTutorial = id => {//busco tutorial por id y lo asigno a la variable inicial
    TutorialDataService.get(id)
      .then(response => {
        setCurrentTutorial(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getTutorial(id);
  }, [id]);//cada vez que se actualice el id hay que buscarlo de nuevo

  const handleInputChange = event => {//cada cambio cojo los campos de antes y cambio el nuevo
    const { name, value } = event.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentTutorial.id,
      title: currentTutorial.title,
      description: currentTutorial.description,
      published: status
    };//cojo los datos de la variable y el status que me llega

    TutorialDataService.update(currentTutorial.id, data)//llamo al servicio para que actualice y le paso el id
      .then(response => {
        setCurrentTutorial({ ...currentTutorial, published: status });
        console.log(response.data);//guardo en la variable 
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateTutorial = () => {
    TutorialDataService.update(currentTutorial.id, currentTutorial)//cojo el id y el uttorial y se lo mando
      .then(response => {
        console.log(response.data);
        setMessage("The tutorial was updated successfully!");//asigno el mensaje
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteTutorial = () => {
    TutorialDataService.remove(currentTutorial.id)//le digo que borre por el id
      .then(response => {
        console.log(response.data);
        navigate("/tutorials");//navego a la principal
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentTutorial ? (
        <div className="edit-form">
          <h4>Tutorial</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentTutorial.title}
                onChange={handleInputChange}
              />{/**enlazo con su variable y evento para menajrlo */}
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentTutorial.description}
                onChange={handleInputChange}
              />
            </div>{/**enlazo con su variable y evento para menajrlo */}

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentTutorial.published ? "Published" : "Pending"}
            </div>{/**segune el status true o false */}
          </form>{/**si esta publicado boton para cambiarlo, si no otro boton */}

          {currentTutorial.published ? (
            <button
              className=""
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className=""
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="" onClick={deleteTutorial}>
            Delete
          </button>{/**boton para borrar y su evento */}

          <button
            type="submit"
            className=""
            onClick={updateTutorial}
          >
            Update
          </button>{/**boton para ctualizar y su evento y enlazo con el mensaje */}
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}{/**si no tengo ninguno seleccioando */}
    </div>
  );
};

export default Tutorial;

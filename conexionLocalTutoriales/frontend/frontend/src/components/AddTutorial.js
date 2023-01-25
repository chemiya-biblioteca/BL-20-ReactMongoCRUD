import React, { useState } from "react";
import TutorialDataService from "../services/TutorialService";

const AddTutorial = () => {
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
    published: false
  };//creo uno vacio
  const [tutorial, setTutorial] = useState(initialTutorialState);//creo variable con valor inicial
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTutorial({ ...tutorial, [name]: value });//al cambiar dejo los campos anterior y actualizo el nuevo
  };

  const saveTutorial = () => {
    var data = {
      title: tutorial.title,
      description: tutorial.description
    };//cojo los datos

    TutorialDataService.create(data)//se los mando para que los cree
      .then(response => {
        setTutorial({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published//lo que recibo lo asigno
        });
        setSubmitted(true);//ya esta enviado
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTutorial = () => {//pongo valores iniciales
    setTutorial(initialTutorialState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">{/**si esta enviado, pongo boton para que reinicie los campos */}
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTutorial}>
            Add
          </button>
        </div>
      ) : (
        <div>{/**si no enlazo el campo con la variable y evento para manjear el cambio */}
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={tutorial.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={tutorial.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveTutorial} className="btn btn-success">
            Submit
          </button>{/**evento para enviar los datos */}
        </div>
      )}
    </div>
  );
};

export default AddTutorial;

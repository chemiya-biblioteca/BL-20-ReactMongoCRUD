import http from "../http-common";//llamo la api

const getAll = () => {
  return http.get("/tutorials");//traer todos
};

const get = id => {
  return http.get(`/tutorials/${id}`);//traer concreto con el id
};

const create = data => {
  return http.post("/tutorials", data);//crear pasando los datos
};

const update = (id, data) => {
  return http.put(`/tutorials/${id}`, data);//actualizar con el id y pansado los datos
};

const remove = id => {
  return http.delete(`/tutorials/${id}`);//borrar pasando el id
};

const removeAll = () => {
  return http.delete(`/tutorials`);//borrar
};

const findByTitle = title => {
  return http.get(`/tutorials?title=${title}`);//buscar poasando el titulo
};

const TutorialService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};//exporot todos

export default TutorialService;

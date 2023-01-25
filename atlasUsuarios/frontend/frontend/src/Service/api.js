import axios from 'axios';

// const usersUrl = 'http://localhost:3003/users';
const usersUrl = 'http://localhost:8080';

export const getUsers = async (id) => {//puedo recibir id o no
    id = id || '';
    return await axios.get(`${usersUrl}/${id}`);//llamo a la api con la ruta
}

export const addUser = async (user) => {//reibo el user, y lo guardo y se lo paso
    return await axios.post(`${usersUrl}/add`, user);
}

export const deleteUser = async (id) => {//recibo el id y lo pongo en la ruta
    return await axios.delete(`${usersUrl}/${id}`);
}

export const editUser = async (id, user) => {//recibo el id que lo pongo en la ruta y el usuario se lo paso
    return await axios.put(`${usersUrl}/${id}`, user)
}
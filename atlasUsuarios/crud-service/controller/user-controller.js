import User from '../model/user.js';

// Get all users
export const getUsers = async (request, response) => {
    try{
        const users = await User.find();//busco del usuario todos
        response.status(200).json(users);//devuelvo codigo 200 y en json si no error
    }catch( error ){
        response.status(404).json({ message: error.message })
    }
}

// Save data of the user in database
export const addUser = async (request, response) => {
    const user = request.body;
    
    const newUser = new User(user);//creo usuario a partir del body
    try{
        await newUser.save();//lo guardo y lo devuelvo en json
        response.status(201).json(newUser);
    } catch (error){
        response.status(409).json({ message: error.message});     //si no error
    }
}

// Get a user by id
export const getUserById = async (request, response) => {
    try{
        const user = await User.findById(request.params.id);//busco el usuario por id, y lo devuelvo en json
        response.status(200).json(user);
    }catch( error ){
        response.status(404).json({ message: error.message })// si no error
    }
}

// Save data of edited user in the database
export const editUser = async (request, response) => {
    let user = request.body;

    const editUser = new User(user);//creo nuevo usuario a parit del cuerpo de la peticion
    try{
        await User.updateOne({_id: request.params.id}, editUser);//lo actualizo buscando el id y lo devuelvo
        response.status(201).json(editUser);
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}

// deleting data of user from the database
export const deleteUser = async (request, response) => {
    try{
        await User.deleteOne({_id: request.params.id});//lo borro buscando el id y devuelvo texto
        response.status(201).json("User deleted Successfully");
    } catch (error){
        response.status(409).json({ message: error.message});     
    }
}
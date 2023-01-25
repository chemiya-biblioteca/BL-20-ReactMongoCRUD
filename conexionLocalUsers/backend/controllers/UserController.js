import User from "../models/UserModel.js";//llamo al modelo

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();//busco en el esquema y lo devuelvo en json
        res.json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);//busco segun el id que me llega en la ruta y lo devuelvo
        res.json(user);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const saveUser = async (req, res) => {
    const user = new User(req.body);//cojo el usuario de la peticion
    try {
        const inserteduser = await user.save();//guardo el usuario y lo devuelvo
        res.status(201).json(inserteduser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const updateUser = async (req, res) => {
    try {//actualizo en la base de datos segun el id que recibo y el cuertpo
        const updateduser = await User.updateOne({_id:req.params.id}, {$set: req.body});
        res.status(200).json(updateduser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const deleteUser = async (req, res) => {
    try {//borron segun el ide que recibo
        const deleteduser = await User.deleteOne({_id:req.params.id});
        res.status(200).json(deleteduser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
import express from "express";
import { 
    getUsers, 
    getUserById,
    saveUser,
    updateUser,
    deleteUser
} from "../controllers/UserController.js";//importo del controlador las funciones

const router = express.Router();//llamo al router

router.get('/users', getUsers);//por cada ruta llamo a su fncion
router.get('/users/:id', getUserById);
router.post('/users', saveUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
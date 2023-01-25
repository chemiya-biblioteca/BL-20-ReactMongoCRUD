import express from 'express';
import { getUsers, addUser, getUserById, editUser, deleteUser } from '../controller/user-controller.js';

const router = express.Router();//llamo al router de express

router.get('/', getUsers);//cada ruta llama un archivo del controlador
router.post('/add', addUser);
router.get('/:id', getUserById);
router.put('/:id', editUser);
router.delete('/:id', deleteUser);

export default router;
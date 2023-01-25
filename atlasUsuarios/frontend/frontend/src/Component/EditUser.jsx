import { useState, useEffect } from 'react';

import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getUsers, editUser } from '../Service/api';

const initialValue = {
    name: '',
    username: '',
    email: '',
    phone: ''
}//creo uno vacio

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px
`;//creo conetnedor con estilo

const EditUser = () => {
    const [user, setUser] = useState(initialValue);//creo variable con el estado inicial vacio
    const { name, username, email, phone } = user;//guardo los campos del usuario
    const { id } = useParams();//cojo los parametros de la ruta
    
    let navigate = useNavigate();//para navegar

    useEffect(() => {
        loadUserDetails();
    }, []);//al iniciar cargo los detalles

    const loadUserDetails = async() => {
        const response = await getUsers(id);//llamo a la api para que traiga al usuario y lo guardo en la variable
        setUser(response.data);
    }

    const editUserDetails = async() => {
        const response = await editUser(id, user);//llamo a la api para editarlo y le paso el usuario
        navigate('/all');//navego a la principal
    }

    const onValueChange = (e) => {
        console.log(e.target.value);
        setUser({...user, [e.target.name]: e.target.value})//cuando cambien, dejo los campos de antes y pongo el nuevo
    }

    return (
        <Container injectFirst>{/**llamo al contenedor con estilo */}
            <Typography variant="h4">Edit Information</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Name</InputLabel>{/**enlazo con el campo que sea y evento al cambiar */}
                <Input onChange={(e) => onValueChange(e)} name='name' value={name} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Username</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='username' value={username} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Email</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='email' value={email} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Phone</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='phone' value={phone} id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl>{/**llamo al evento qpara que actualice la api */}
                <Button variant="contained" color="primary" onClick={() => editUserDetails()}>Edit User</Button>
            </FormControl>
        </Container>
    )
}

export default EditUser;
import react, { useState } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, styled, Typography } from '@mui/material';
import { addUser } from '../Service/api';
import { useNavigate } from 'react-router-dom';

const initialValue = {
    name: '',
    username: '',
    email: '',
    phone: ''
}//creo usuario vacio

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px;
`;//creo elemento con estilo
//& es selector del padre y > los hijos directos

const AddUser = () => {
    const [user, setUser] = useState(initialValue);//creo vairable con el estado inicial
    const { name, username, email, phone } = user;//guardo los campos del usuario
    
    let navigate = useNavigate();//para navegacion

    const onValueChange = (e) => {//al cambiar actualizo el campo y los demas los dejo igual
        setUser({...user, [e.target.name]: e.target.value})
    }

    const addUserDetails = async() => {//llamo a la api para que lo guarde y navego a la ruta
        await addUser(user);
        navigate('/all');
    }

    return (
        <Container>
            <Typography variant="h4">Add User</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Name</InputLabel>{/**enlazo con el campo y evento para manejar cambios */}
                <Input onChange={(e) => onValueChange(e)} name='name' value={name} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Username</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='username' value={username} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Email</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='email' value={email} id="my-input"/>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Phone</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='phone' value={phone} id="my-input" />
            </FormControl>
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => addUserDetails()}>Add User</Button>
            </FormControl>{/**llamo al evento para que lo guarde */}
        </Container>
    )
}

export default AddUser;
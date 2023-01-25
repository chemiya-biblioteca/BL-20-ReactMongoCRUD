import react, { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, Paper, TableRow, TableBody, Button, styled } from '@mui/material'
import { getUsers, deleteUser } from '../Service/api';
import { Link } from 'react-router-dom';

const StyledTable = styled(Table)`
    width: 90%;
    margin: 50px 0 0 50px;
`;//creo tabla con estilo 

const THead = styled(TableRow)`
    & > th {
        font-size: 20px;
        background: #000000;
        color: #FFFFFF;
    }
`;//creo encabezado con estilo

const TRow = styled(TableRow)`
    & > td{
        font-size: 18px
    }
`;//creo fila con estilo

const AllUsers = () => {
    const [users, setUsers] = useState([]);//creo variable con los usuarios
    
    useEffect(() => {
        getAllUsers();//al iniair lo lleno de usuarios
    }, []);

    const deleteUserData = async (id) => {//me llega el id y llamo a la api y vuelvo a mostrar
        await deleteUser(id);
        getAllUsers();
    }

    const getAllUsers = async () => {
        let response = await getUsers();//llamo a la api para que nos traiga y los guardo en el estado
        setUsers(response.data);
    }

    return (
        <StyledTable>{/**llamo componente de arriba de la tabla con estilo */}
            <TableHead>
                <THead>
                    <TableCell>Id</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell></TableCell>
                </THead>
            </TableHead>
            <TableBody>{/**mapeo del estado y por cada uno muestro sus atributos */}
                {users.map((user) => (
                    <TRow key={user.id}>
                        <TableCell>{user._id}</TableCell> 
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>{/**pongo boton para editarlo que dirige a la ruta con su ide */}
                            <Button color="primary" variant="contained" style={{marginRight:10}} component={Link} to={`/edit/${user._id}`}>Edit</Button> {/* change it to user.id to use JSON Server */}
                            <Button color="secondary" variant="contained" onClick={() => deleteUserData(user._id)}>Delete</Button> {/* change it to user.id to use JSON Server */}
                        </TableCell>{/**boton para borrarlo que llama el evento con el id */}
                    </TRow>
                ))}
            </TableBody>
        </StyledTable>
    )
}

export default AllUsers;
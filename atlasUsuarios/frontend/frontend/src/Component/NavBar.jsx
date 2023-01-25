
import { AppBar, Toolbar, styled } from '@mui/material';

import { NavLink } from 'react-router-dom';


const Header = styled(AppBar)`
    background: #111111;
`;//creo header con estilo
    
const Tabs = styled(NavLink)`
    color: #FFFFFF;
    margin-right: 20px;
    text-decoration: none;
    font-size: 20px;
`;//creo elemento

const NavBar = () => {
    return (
        <Header position="static">{/**llamo al elemento creado */}
            <Toolbar>
                <Tabs to="./" exact>Code for Interview</Tabs>{/**pongo rutas de navegacion */}
                <Tabs to="all" exact>All Users</Tabs>
                <Tabs to="add" exact>Add User</Tabs>
            </Toolbar>
        </Header>
    )
}

export default NavBar;
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar } from 'react-bootstrap'
import { Person, ExitToApp } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import './infobar.css'


const Infobar = (props) => {
    const history = useHistory()
    return (
        <Navbar className="navbar nvbr">
            <Person style={{ fontSize: 40, color: "grey" }} />
            <Navbar.Brand className="user">{props.username}</Navbar.Brand>
            <ExitToApp
                className="logout"
                style={{ float: "right", marginLeft: "500px", fontSize: 30 }}
                onClick={() => { props.logOut(); history.push('/signin') }}
            />
        </Navbar>
    )
};

export default Infobar;
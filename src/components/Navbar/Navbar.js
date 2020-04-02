import React from 'react';
import {
    Link
  } from "react-router-dom";

import logo from './../../images/Logo.png'

const Navbar = () =>{
    return (
        <React.Fragment>
            <nav className="navbar navbar-custom-style">                
                <ul>
                    <li className="navbar-brand navbar-band-style">
                        <Link to="/"><img src={logo} alt="Logo" width="42px" height="36px"/></Link>
                    </li>
                    <li className="nav-link">
                        <Link to="/Dashboard">Dashboard</Link>
                    </li>
                    <li className="nav-link">
                        <Link to="/Search">Search</Link>
                    </li>
                </ul>
            </nav>
        </React.Fragment>
    );
}

export default Navbar;

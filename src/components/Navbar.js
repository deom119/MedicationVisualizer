import React from 'react';

const Navbar = (props) =>{
    return (
        <React.Fragment>
            <nav className="navbar navbar-custom-style">
                <a className="navbar-brand navbar-band-style">Medication Visualizer</a>
                <ul className="nav navbar-nav navbar-right">
                    <li className="nav-item dropdown">
                        <a className="nav-link" href="#" id="navbardrop" data-toggle="dropdown">
                            <i className="fas fa-user-circle fa-2x"></i>
                        </a>
                    </li>
                </ul>
            </nav>
        </React.Fragment>
    );
}

export default Navbar;

import React from 'react';

const Navbar = (props) =>{
    return (
        <React.Fragment>
            <nav className="navbar navbar-custom-style">
                <a href="https://apps.hdap.gatech.edu/medviz2-frontend/" className="navbar-brand navbar-band-style">Medication Visualizer</a>
            </nav>
        </React.Fragment>
    );
}

export default Navbar;

import React from 'react';
import header from './header-img.png';
import './home.css';

const Home = () => {
    return (
        
        <div className="landingpage">
            <div className="banner-area" id="home"> 
                    <div className="pos"><img src={header} alt="" className="image-size"/></div>                                           
                    <h1 className="text-uppercase">We are the team <br></br>of excellence </h1>
                    <p>Medication Visualizer is an intuitive web-based visualization application, which aims to provide healthcare professionals with a visual representation of all available medications to make it easier to sort through the appropriate products with more meaningful groupings.</p>                        
            </div>


            <div className="feature-area" id="service">
                <div className="feature-detail">
                    <div className="item">
                        <div className="icon"><i class="fab fa-github"></i></div>
                        <div>
                            <h4 className="header">Dashboard</h4>
                            <p className="detail">Important aspect of medications visualized as charts</p>
                        </div>
                    </div>
  
                    <div className="item">
                        <div className="icon"><i class="fab fa-github"></i></div>
                        <div>
                            <h4 className="header">Dashboard</h4>
                            <p className="detail">Important aspect of medications visualized as charts</p>
                        </div>
                    </div>

                    <div className="item">
                        <div className="icon"><i class="fab fa-github"></i></div>
                        <div>
                            <h3 className="header">Dashboard</h3>
                            <p className="detail">Important aspect of medications visualized as charts</p>
                        </div>
                    </div>

                    <div className="item">
                        <div className="icon"><i class="fab fa-github"></i></div>
                        <div>
                            <h3 className="header">Dashboard</h3>
                            <p className="detail">Important aspect of medications visualized as charts</p>
                        </div>
                    </div>

                    <div className="item">
                        <div className="icon"><i class="fab fa-github"></i></div>
                        <div>
                            <h3 className="header">Dashboard</h3>
                            <p className="detail">Important aspect of medications visualized as charts</p>
                        </div>
                    </div>

                    <div className="item">
                        <div className="icon"><i class="fab fa-github"></i></div>
                        <div>
                            <h3 className="header">Dashboard</h3>
                            <p className="detail">Important aspect of medications visualized as charts</p>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Home;

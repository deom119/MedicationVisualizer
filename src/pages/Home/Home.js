import React from 'react';
import header from './header-img.png';
import './home.css';

const Home = () => {
    return (
        
        <div className="landingpage">
            <div className="banner-area" id="home"> 
                    <div className="banner-content">
                        <div className="pos"><img src={header} alt="" className="image-size"/></div>
                        <div className="tag"><h1 className="text-uppercase">A center of <br></br>Rx visualization </h1></div>                                           
                        <div className="tag-line"><p>Medication Visualizer is an intuitive web-based visualization application, which aims to provide healthcare professionals with a visual representation of all available medications to make it easier to sort through the appropriate products with more meaningful groupings.</p></div>                        
                    </div>
            </div>


            <div className="feature-area" id="service">
                <div className="feature-detail">
                    <div className="item">
                        <div className="icon"><i class="fas fa-search-location"></i></div>
                        <div>
                            <h4 className="header">Search</h4>
                            <p className="detail">Users can search the medication database by medication name</p>
                            <p className="detail">Users can search the medication database by medication ID</p>
                            <p className="detail">Users can search the medication database by medication code system</p>
                        </div>
                    </div>
  
                    <div className="item">
                        <div className="icon"><i class="far fa-chart-bar"></i></div>
                        <div>
                            <h4 className="header">Dashboard</h4>
                            <p className="detail">Important aspect of medications visualized as charts</p>
                            <p className="detail">Bar graph displaying the number of medications expiring for a certain year</p>
                            <p className="detail">Doughnut graph displaying the quantity of medications that belong to a particular batch</p>
                        </div>
                    </div>
        
                    <div className="item">
                        <div className="icon"><i class="fas fa-search-plus"></i></div>
                        <div>
                            <h4 className="header">Search</h4>
                            <p className="detail">Users can search the medication database by medication code</p>
                            <p className="detail">Users can search the medication database by medication ingredient</p>
                            <p className="detail">Users can search the medication database by medication form</p>
                        </div>
                    </div>
                    
                    <div className="item">
                        <div className="icon"><i class="fas fa-chart-pie"></i></div>
                        <div>
                            <h4 className="header">Dashboard</h4>
                            <p className="detail">Doughnut graph of the ingredients of all medications</p>
                            <p className="detail">Pie chart of the quantity of medications for each medication form</p>
                            <p className="detail">Pie chart of the number of medications to belong to each medication code system</p>
                        </div>
                    </div>

                    <div className="item">
                        <div className="icon"><i class="fas fa-search"></i></div>
                        <div>
                            <h4 className="header">Search</h4>
                            <p className="detail">Users can search the medication database by medication expiration year</p>
                            <p className="detail">Users can search the medication database by medication batch lot number </p>
                        </div>
                    </div>

                    <div className="item">
                        <div className="icon"><i class="fas fa-chart-line"></i></div>
                        <div>
                            <h4 className="header">Dashboard</h4>                            
                            <p className="detail">Doughnut chart of the status for active medications</p>
                            <p className="detail">Doughnut chart of the medications that were dispensed and the quantities in which dispensed</p>
                            
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Home;

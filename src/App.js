import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './App.css';
<<<<<<< HEAD
import Navbar from './components/Navbar/Navbar';
import Dashboard from './pages/Dashboard/Dashboard';
import Search from './pages/Search/Search';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';

const App =()=> {
  return (

    <Router>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route path="/medviz2-frontend/Dashboard">
            <Dashboard />
          </Route>
          <Route path="/medviz2-frontend/Search">
            <Search />
          </Route>
          <Route path="/medviz2-frontend">
            <Home />
          </Route>
        </Switch>        
        <Footer/>
      </div>
    </Router>    
=======
import Navbar from './components/Navbar';
import RxList from './components/RxList';
import InitializeMeds from './components/InitializeMeds'

const App =()=> {
  return (
    <div className="App">
      <Navbar/>
      <RxList/>
      <InitializeMeds/>
    </div>
>>>>>>> 0ab0a427555b0c7837db531a5cb9aef4a6428aac
  );
}

export default App;



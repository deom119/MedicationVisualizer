import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './App.css';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './pages/Dashboard/Dashboard';
import Search from './pages/Search/Search';
import Home from './pages/Home/Home';

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
      </div>
    </Router>    
  );
}

export default App;


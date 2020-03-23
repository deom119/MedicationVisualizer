import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import RxList from './components/RxList';

const App =()=> {
  return (
    <div className="App">
      <Navbar/>
      <RxList/>
    </div>
  );
}

export default App;


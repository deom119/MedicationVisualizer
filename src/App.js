import React from 'react';
import './App.css';
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
  );
}

export default App;


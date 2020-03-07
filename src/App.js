import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Searchbar from './components/Searchbar';
import RxList from './components/RxList';

const App =()=> {
  return (
    <div className="App">
      <Navbar/>
      <Searchbar/>  
      <RxList/>
    </div>
  );
}

export default App;

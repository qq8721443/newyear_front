import React from 'react';
// import './App.css';
import {Route} from 'react-router-dom';
import Main from './pages/main';

function App() {
  return(
    <Route path='/' exact component={Main}/>
  )
}

export default App;
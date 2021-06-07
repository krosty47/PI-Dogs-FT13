import './App.css';
import React from "react";
import { Route } from "react-router-dom";
import Welcome from './components/welcome/welcome'
import Home from './components/home/home'




function App() {
  return (
     <div>
       <Route exact path="/" component={Welcome}/>
       <Route path="/home" component={Home}/>
    </div>
  );
}

export default App;

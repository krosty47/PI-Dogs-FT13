import './App.css';
import React from "react";
import { Route } from "react-router-dom";
import InitialWelcomePage from './components/initialWelcomePage/initialWelcomePage'
import HomeRender from './components/homeRender/homeRender'




function App() {
  return (
     <div>
       <Route exact path="/" component={InitialWelcomePage}/>
       <Route path="/home" component={HomeRender}/>
    </div>
  );
}

export default App;

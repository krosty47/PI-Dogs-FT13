import './App.css';
import React from "react";
import { Route } from "react-router-dom";

import InitialWelcomePage from './components/initialWelcomePage/initialWelcomePage'
import HomeRender from './components/homeRender/homeRender'
import BreedDetail from './components/breedDetail/breedDetail'




function App() {
  return (
     <div>
       <Route exact path='/home' component={HomeRender}/>
       <Route exact path='/' component={InitialWelcomePage}/>
       <Route exact path='/detail/:id' component={BreedDetail}/>
    </div>
  );
}

export default App;

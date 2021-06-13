import './App.css';
import React from "react";
import { Route } from "react-router-dom";

import InitialWelcomePage from './components/initialWelcomePage/initialWelcomePage'
import HomeRender from './components/homeRender/homeRender'
import BreedDetail from './components/breedDetail/breedDetail'
import BreedCreation from './components/breedCreation/breedCreation'
import NavBar from './components/navBar/navBar'




function App() {
  return (
     <div>
       <Route path='/:something' component={NavBar}/>
       <Route exact path='/' component={InitialWelcomePage}/>
       <Route exact path='/home' component={HomeRender}/>
       <Route exact path='/detail/:id' component={BreedDetail}/>
       <Route exact path='/createBreed' component={BreedCreation}/>
    </div>
  );
}

export default App;

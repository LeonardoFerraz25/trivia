import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Login';
import Settings from './pages/Settings';
import Game from './pages/Game';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

function App() {
  return (
    <div>
        <Route exact path="/" render={ (props) => <Home { ...props } /> } />
        <Route exact path="/game" component={ Game } />
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/feedback" component={ Feedback } />
        <Route exact path="/ranking" component={ Ranking } />
    </div>
  );
}

export default App;

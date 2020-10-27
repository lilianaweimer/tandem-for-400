import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';

import Home from '../Home/Home';
import Game from '../Game/Game';
import GameOver from '../GameOver/GameOver';

import data from '../../Data/Apprentice_TandemFor400_Data.json';

const App = () => {

  const [gameData, updateGameData] = useState({});

  useEffect(() => {
    updateGameData(data);
  }, [])

  return (
    <div className='App'>
      <Switch>
        <Route path='/play' render={() => <Game gameData={gameData} />}/>
        <Route path='/gameover' render={() => <GameOver />}/>
        <Route exact path='/' render={() => <Home />}/>
      </Switch>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';

import Home from '../Home/Home';
import Game from '../Game/Game';
import GameOver from '../GameOver/GameOver';

import data from '../../Data/Apprentice_TandemFor400_Data.json';

const App = () => {

  const [gameData, updateGameData] = useState({});
  const [currentQuestion, updateCurrentQuestion] = useState(gameData ? gameData[0] : {});

  useEffect(() => {
    updateGameData(data);
    shuffle(gameData);
  }, [])

  const shuffle = (array) => {
    // this is FISHER-YATES SHUFFLE - explanation comments so I don't forget how it works
    let currentIndex = array.length, temporaryValue, randomIndex;

    // starting at the end of the array, iterate backwards to the start
    while (currentIndex !== 0) {

      // pick a random element from the array, index less than the current one
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // swap it with the current element: 
      // 1. set the temporary value to the element at the current index
      // (to hold on to the value so it's not lost)
      temporaryValue = array[currentIndex];
      // 2. set the element at the current index to the random index
      array[currentIndex] = array[randomIndex];
      // 3. set the element at the random index to the temp. value
      // (which is the original element)
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  return (
    <div className='App'>
      <Switch>
        <Route path='/play' render={() => <Game currentQuestion={currentQuestion} />}/>
        <Route path='/gameover' render={() => <GameOver />}/>
        <Route exact path='/' render={() => <Home />}/>
      </Switch>
    </div>
  );
}

export default App;

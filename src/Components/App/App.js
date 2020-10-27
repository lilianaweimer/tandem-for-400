import React, { useEffect, useState } from 'react';
import './App.scss';

import data from '../../Data/Apprentice_TandemFor400_Data.json';

function App() {

  const [gameData, updateGameData] = useState({});

  useEffect(() => {
    updateGameData(data);
  }, [])

  console.log(gameData)

  return (
    <div className="App">

    </div>
  );
}

export default App;

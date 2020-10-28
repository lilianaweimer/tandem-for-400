import React from 'react';
import { Link } from 'react-router-dom';
import './GameOver.scss';

const GameOver = ({ score, resetGame }) => {
  return (
    <section>
      <h2>Game Over!</h2>
      <p>Your final score was {score} points.</p>
      <Link to='/play' onClick={() => resetGame()}>Play Again?</Link>
    </section>
  )
}

export default GameOver;
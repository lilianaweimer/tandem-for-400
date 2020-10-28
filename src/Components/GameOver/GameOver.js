import React from 'react';
import './GameOver.scss';

const GameOver = ({ score }) => {
  return (
    <section>
      <h2>Game Over!</h2>
      <p>Your final score was {score} points.</p>
    </section>
  )
}

export default GameOver;
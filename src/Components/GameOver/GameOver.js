import React from 'react';
import { Link } from 'react-router-dom';
import './GameOver.scss';

const GameOver = ({ score, resetGame }) => {
  return (
    <section className='gameover-container'>
      <h2 className='gameover-header'>Game Over!</h2>
      <p className='gameover-score'>Your final score was {score} points.</p>
      <Link to='/play' onClick={() => resetGame()} className='new-game-button'>Play Again</Link>
    </section>
  )
}

export default GameOver;
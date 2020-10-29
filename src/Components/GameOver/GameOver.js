import React from 'react';
import { Link } from 'react-router-dom';
import './GameOver.scss';

const GameOver = ({ score, resetGame }) => {
  return (
    <section className='gameover-container'>
      <img src='http://www.pngall.com/wp-content/uploads/2016/03/Light-Bulb-PNG-HD.png' alt='clipart of a lightbulb' className='lightbulb-img'/>
      <h2 className='gameover-header'>Game Over!</h2>
      <p className='gameover-score'>Your final score was {score} points.</p>
      <Link to='/play' onClick={() => resetGame()} className='new-game-button'>Play Again</Link>
    </section>
  )
}

export default GameOver;
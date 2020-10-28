import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import './Game.scss';

const Game = ({ gameData, shuffle, updateScore, score }) => {

  const [currentIndex, incrementQIndex] = useState(0);
  const [display, changeDisplay] = useState('play');
  const question = gameData ? gameData[currentIndex] : null;

  const shuffleAnswers = () => {
    let allAnswers = [question.incorrect, question.correct].flat();
    shuffle(allAnswers);
    return allAnswers;
  };

  const displayAnswers = () => {
    let shuffled = shuffleAnswers();
    return shuffled.map(answer => {
      return (
        <button 
          key={shuffled.indexOf(answer)}
          className='answer-button'
          value={answer}
          onClick={(e) => checkAnswer(e.target.value)}
          data-testid={answer}>
            {answer}
        </button>
      )
    })
  };

  const checkAnswer = (e) => {
    if (e === question.correct) {
      changeDisplay('correct');
      updateScore(score + 1);
    } else {
      changeDisplay('incorrect');
      updateScore(score - 1);
    }
  };

  const nextQuestion = () => {
    incrementQIndex(currentIndex + 1);
    changeDisplay('play');
  };

  const displayGame = () => {
    switch (display) {
      case 'play':
        return (
          <section>
            <p>{question.question}</p>
            {displayAnswers()}
          </section>
        )
      case 'correct':
        return (
          <section>
            <h3>Correct!</h3>
            {
              currentIndex === gameData.length - 1 ? 
              <Link to='/gameover'>Game Over!</Link> : 
              <button onClick={() => nextQuestion()}>Next Question</button>
            }
          </section>
        )
      case 'incorrect':
        return (
          <section>
            <h3>Incorrect!</h3>
            <p>The correct answer was: {question.correct}</p>
            {
              currentIndex === gameData.length - 1 ? 
              <Link to='/gameover'>Game Over!</Link> : 
              <button onClick={() => nextQuestion()}>Next Question</button>
            }
          </section>
        )
      default:
        break;
    }
  };

  return gameData ?
    <section>
      <p>Your current score: {score} points</p>
      {displayGame()}
    </section> : 
    <Redirect to='/'/>;
}

export default Game;
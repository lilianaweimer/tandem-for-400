import React, { useState } from 'react';
import { Redirect } from 'react-router';
import './Game.scss';

const Game = ({ gameData, shuffle }) => {

  const [currentIndex, incrementQIndex] = useState(0);
  const [display, changeDisplay] = useState('play');
  const question = gameData[currentIndex]

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
    } else {
      changeDisplay('incorrect');
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
            <p>Correct!</p>
            <button onClick={() => nextQuestion()}>Next Question</button>
          </section>
        )
      case 'incorrect':
        return (
          <section>
            <p>Inorrect!</p>
            <p>The correct answer was:</p>
            <p>{question.correct}</p>
            <button onClick={() => nextQuestion()}>Next Question</button>
          </section>
        )
      default:
        break;
    }
  };

  return gameData ? displayGame() : <Redirect to='/'/>;
}

export default Game;
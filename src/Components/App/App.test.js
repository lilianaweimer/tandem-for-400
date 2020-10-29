import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';

import { getQuestions } from '../../Data/apiCalls';
jest.mock('../../Data/apiCalls');

describe('App', () => {

  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  const mockQuestion = [
    {
      "question": "What was Tandem previous name?",
      "incorrect": ["Tandem", "Burger Shack", "Extraordinary Humans"],
      "correct": "Devmynd"
    },
  ];

  const mockFullGameQuestions = [
    {
      "question": "A group of tigers are referred to as:",
      "incorrect": ["Chowder", "Pride", "Destruction"],
      "correct": "Ambush"
    },
    {
      "question": "What is the only letter that doesn't appear in a US state name?",
      "incorrect": ["M", "Z", "X"],
      "correct": "Q"
    },
    {
      "question": "What is the name for a cow-bison hybrid?",
      "incorrect": ["Cowson", "Bicow", "Mooson"],
      "correct": "Beefalo"
    }
  ]

  it('should render the home component on initial mount', async () => {
    getQuestions.mockResolvedValueOnce(mockQuestion);
    await act(async () => {
      ReactDOM.render(<MemoryRouter><App /></MemoryRouter>, container)
    });

    expect(container.querySelector('h1').textContent).toBe('Tandem for 400');
    expect(container.querySelector('p').textContent).toBe('Train your trivia knowledge!');
    expect(container.querySelector('[data-testid=play-button]').textContent).toBe('Play');
  });

  it('should render the game component when play is clicked', async () => {
    getQuestions.mockResolvedValueOnce(mockQuestion);
    await act(async () => {
      ReactDOM.render(<MemoryRouter><App /></MemoryRouter>, container)
    });

    const link = document.querySelector('[data-testid=play-button]');
    expect(link.textContent).toBe('Play');
  
    act(() => {
      link.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
  
    expect(container.querySelector('.question').textContent).toBe('What was Tandem previous name?');
  });

  it('should be able to play a whole game without crashing', async () => {
    getQuestions.mockResolvedValue(mockFullGameQuestions);
    await act(async () => {
      ReactDOM.render(<MemoryRouter><App /></MemoryRouter>, container)
    });

    const link = document.querySelector('[data-testid=play-button]');
    expect(link.textContent).toBe('Play');
  
    act(() => {
      link.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
  
    expect(container.querySelector('.question').textContent).toBe('A group of tigers are referred to as:');
    
    const answerOne = document.querySelector('[data-testid=Ambush]');
    expect(answerOne.textContent).toBe('Ambush');

    act(() => {
      answerOne.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    const nextQuestion = document.querySelector('.next-question');
    expect(nextQuestion.textContent).toBe('Next Question');

    act(() => {
      nextQuestion.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(container.querySelector('.question').textContent).toBe('What is the only letter that doesn\'t appear in a US state name?');
    
    const answerTwo = document.querySelector('[data-testid=Q]');
    expect(answerTwo.textContent).toBe('Q');

    act(() => {
      answerTwo.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    const nextQuestionTwo = document.querySelector('.next-question');
    expect(nextQuestionTwo.textContent).toBe('Next Question');

    act(() => {
      nextQuestionTwo.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(container.querySelector('.question').textContent).toBe('What is the name for a cow-bison hybrid?');

    const answerThree = document.querySelector('[data-testid=Cowson]');
    expect(answerThree.textContent).toBe('Cowson');

    act(() => {
      answerThree.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    const gameOver = document.querySelector('.game-over-button');
    expect(gameOver.textContent).toBe('Game Over!');

    act(() => {
      gameOver.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(container.querySelector('h2').textContent).toBe('Game Over!');
    expect(container.querySelector('p').textContent).toBe('Your final score was 1 points.');
  });

})
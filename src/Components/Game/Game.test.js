import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game';

import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';

describe('Game', () => {

  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  const mockGameData = [
    {
      "question": "What was Tandem previous name?",
      "incorrect": ["Tandem", "Burger Shack", "Extraordinary Humans"],
      "correct": "Devmynd"
    },
  ];

  const mockGameDataTwo = [
    {
      "question": "What was Tandem previous name?",
      "incorrect": ["Tandem", "Burger Shack", "Extraordinary Humans"],
      "correct": "Devmynd"
    },
    {
      "question": "In Shakespeare's play Julius Caesar, Caesar's last words were...",
      "incorrect": ["Iacta alea est!", "Vidi, vini, vici", "Aegri somnia vana"],
      "correct": "Et tu, Brute?"
    }
  ]

  it('should render correctly', async () => {
    await act(async () => {
      ReactDOM.render(
        <MemoryRouter>
          <Game 
            gameData={mockGameData} 
            shuffle={jest.fn()} 
            updateScore={jest.fn()}
            score={0}
          />
        </MemoryRouter>, 
      container)
    });

    expect(container.querySelector('.question').textContent).toBe('What was Tandem previous name?');
    expect(container.querySelector('[data-testid=Tandem]').textContent).toBe('Tandem');
    expect(container.querySelector('[data-testid=Devmynd]').textContent).toBe('Devmynd');
  });

  it('should not render if not passed game data', async () => {
    await act(async () => {
      ReactDOM.render(
        <MemoryRouter>
          <Game 
            gameData={[]} 
            shuffle={jest.fn()} 
            updateScore={jest.fn()}
            score={0}
          />
        </MemoryRouter>, 
      container)
    });

    expect(document.querySelector('h3')).toBe(null);
    expect(document.querySelector('.question')).toBe(null);

    // not completely sure this test is working as I want it to. I will come back to this, time permitting
  });

  it('should display correct if correct answer is clicked', async () => {
    await act(async () => {
      ReactDOM.render(
        <MemoryRouter>
          <Game 
            gameData={mockGameData} 
            shuffle={jest.fn()} 
            updateScore={jest.fn()}
            score={0}
          />
        </MemoryRouter>, 
      container)
    });

    const correct = document.querySelector('[data-testid=Devmynd]');
    expect(correct.textContent).toBe('Devmynd');
  
    act(() => {
      correct.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });  
    
    expect(container.querySelector('h3').textContent).toBe('Correct!');
  });

  it('should display incorrect and correct answer if incorrect answer is clicked', async () => {
    await act(async () => {
      ReactDOM.render(
        <MemoryRouter>
          <Game 
            gameData={mockGameData} 
            shuffle={jest.fn()} 
            updateScore={jest.fn()}
            score={0}
          />
        </MemoryRouter>, 
      container)
    });

    const incorrect = document.querySelector('[data-testid=Tandem]');
    expect(incorrect.textContent).toBe('Tandem');
  
    act(() => {
      incorrect.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });  
    
    expect(container.querySelector('h3').textContent).toBe('Incorrect!');
    expect(container.querySelector('.correct-answer').textContent).toBe('The correct answer was: Devmynd');
  });

  it('should go to another question from correct', async () => {
    await act(async () => {
      ReactDOM.render(
        <MemoryRouter>
          <Game 
            gameData={mockGameDataTwo} 
            shuffle={jest.fn()} 
            updateScore={jest.fn()}
            score={0}
          />
        </MemoryRouter>, 
      container)
    });

    const correct = document.querySelector('[data-testid=Devmynd]');
    expect(correct.textContent).toBe('Devmynd');
  
    act(() => {
      correct.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });  
    
    expect(container.querySelector('h3').textContent).toBe('Correct!');

    const nextQuestion = document.querySelector('.next-question');
    expect(nextQuestion.textContent).toBe('Next Question');

    act(() => {
      nextQuestion.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(document.querySelector('.question').textContent).toBe('In Shakespeare\'s play Julius Caesar, Caesar\'s last words were...');
  });

  it('should go to another question from incorrect', async () => {
    await act(async () => {
      ReactDOM.render(
        <MemoryRouter>
          <Game 
            gameData={mockGameDataTwo} 
            shuffle={jest.fn()} 
            updateScore={jest.fn()}
            score={0}
          />
        </MemoryRouter>, 
      container)
    });

    const incorrect = document.querySelector('[data-testid=Tandem]');
    expect(incorrect.textContent).toBe('Tandem');
  
    act(() => {
      incorrect.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });  
    
    expect(container.querySelector('h3').textContent).toBe('Incorrect!');

    const nextQuestion = document.querySelector('.next-question');
    expect(nextQuestion.textContent).toBe('Next Question');

    act(() => {
      nextQuestion.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(document.querySelector('.question').textContent).toBe('In Shakespeare\'s play Julius Caesar, Caesar\'s last words were...');
  });

  it('should fire the update score method when next question is clicked', async () => {
    const mockScoreUpdate = jest.fn();
    await act(async () => {
      ReactDOM.render(
        <MemoryRouter>
          <Game 
            gameData={mockGameDataTwo} 
            shuffle={jest.fn()} 
            updateScore={mockScoreUpdate}
            score={0}
          />
        </MemoryRouter>, 
      container)
    });

    const correct = document.querySelector('[data-testid=Devmynd]');
    expect(correct.textContent).toBe('Devmynd');
  
    act(() => {
      correct.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });  

    const nextQuestion = document.querySelector('.next-question');
    expect(nextQuestion.textContent).toBe('Next Question');

    act(() => {
      nextQuestion.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(mockScoreUpdate).toBeCalledTimes(1);
  });

});
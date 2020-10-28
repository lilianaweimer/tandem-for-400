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
  ]

  it('should render correctly', async () => {
    await act(async () => {
      ReactDOM.render(<MemoryRouter><Game gameData={mockGameData} shuffle={jest.fn()}/></MemoryRouter>, container)
    });

    expect(container.querySelector('p').textContent).toBe('What was Tandem previous name?');
    expect(container.querySelector('[data-testid=Tandem]').textContent).toBe('Tandem');
    expect(container.querySelector('[data-testid=Devmynd]').textContent).toBe('Devmynd');
  });

  it('should display correct if correct answer is clicked', async () => {
    await act(async () => {
      ReactDOM.render(<MemoryRouter><Game gameData={mockGameData} shuffle={jest.fn()}/></MemoryRouter>, container)
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
      ReactDOM.render(<MemoryRouter><Game gameData={mockGameData} shuffle={jest.fn()}/></MemoryRouter>, container)
    });

    const incorrect = document.querySelector('[data-testid=Tandem]');
    expect(incorrect.textContent).toBe('Tandem');
  
    act(() => {
      incorrect.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });  
    
    expect(container.querySelector('h3').textContent).toBe('Incorrect!');
    expect(container.querySelector('p').textContent).toBe('The correct answer was: Devmynd');
  });

});
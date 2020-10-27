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
  
    expect(container.querySelector('p').textContent).toBe('What was Tandem previous name?');
  });

})
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

});
import React from 'react';
import ReactDOM from 'react-dom';
import GameOver from './GameOver';

import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';

describe('GameOver', () => {

  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('should render correctly', async () => {
    await act(async () => {
      ReactDOM.render(<MemoryRouter><GameOver score={10} resetGame={jest.fn()}/></MemoryRouter>, container)
    });

    expect(container.querySelector('h2').textContent).toBe('Game Over!');
    expect(container.querySelector('p').textContent).toBe('Your final score was 10 points.');
    expect(container.querySelector('a').textContent).toBe('Play Again');
  });

});
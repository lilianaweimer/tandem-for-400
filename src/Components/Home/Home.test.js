import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';

import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';

describe('Home', () => {

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
      ReactDOM.render(<MemoryRouter><Home /></MemoryRouter>, container)
    });

    expect(container.querySelector('h1').textContent).toBe('TANDEM FOR 400');
    expect(container.querySelector('p').textContent).toBe('Train your trivia knowledge!');
    expect(container.querySelector('[data-testid=play-button]').textContent).toBe('Play');
  });

});
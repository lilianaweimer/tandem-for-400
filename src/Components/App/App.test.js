import React from 'react';
import App from './App';

import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('App', () => {

  it('should the home component on initial mount', () => {
    const { getByText, getByRole } = render (
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(getByText('Tandem for 400')).toBeInTheDocument();
    expect(getByText('Train your trivia knowledge!')).toBeInTheDocument();
    expect(getByRole('link', {name: 'Play'})).toBeInTheDocument();
  });

})
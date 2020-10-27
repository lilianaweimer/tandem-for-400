import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';

import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';

describe('Home', () => {

  it('should be true', async () => {
    expect(true).toBe(true);
  });

});
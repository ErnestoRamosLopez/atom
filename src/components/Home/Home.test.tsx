import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './home.component';

describe('Home component tests', () => {
  test('it should mount', () => {
    render(<Home />);

    const homeElement = screen.getByTestId('Home');

    expect(homeElement).toBeInTheDocument();
  });
});
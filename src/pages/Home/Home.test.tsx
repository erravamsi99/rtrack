import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home component', () => {
  test('renders welcome message', () => {
    render(<Home />);
    const headingElement = screen.getByRole('heading', { level: 1 });
    expect(headingElement).toHaveTextContent('Welcome to the Home Page');
  });
});
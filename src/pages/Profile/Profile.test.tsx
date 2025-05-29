import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Profile from './Profile';

describe('Profile component', () => {

  beforeEach(() => {
    render(<Profile />);
  });

  test('renders profile heading', () => {
    const headingElement = screen.getByRole('heading', { level: 1 });
    expect(headingElement).toHaveTextContent('User Profile');
  });

  test('renders bio textarea', () => {
    const textareaElement = screen.getByPlaceholderText('Tell us about yourself...');
    expect(textareaElement).toBeInTheDocument();
  });

  test('shows "No bio yet." when bio is empty', () => {
    const noBioText = screen.getByText('No bio yet.');
    expect(noBioText).toBeInTheDocument();
  });
});
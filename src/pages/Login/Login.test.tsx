import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {Login} from "./Login";

describe('Login component', () => {
  beforeEach(() => {
    render(<Login />);
  });

  test('renders login form', () => {
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('updates username input value', () => {
    const usernameInput = screen.getByLabelText(/username/i);
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    expect(usernameInput).toHaveValue('testuser');
  });

  test('updates password input value', () => {
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput).toHaveValue('password123');
  });

  test('shows error message when form is submitted with empty fields', () => {
    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);
    expect(screen.getByText(/Please enter both username and password/i)).toBeInTheDocument();
  });

  test('clears error message when form is submitted successfully', () => {
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    // First, trigger the error
    fireEvent.click(submitButton);
    expect(screen.getByText(/Please enter both username and password/i)).toBeInTheDocument();

    // Then, fill in the form and submit
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(screen.queryByText(/Please enter both username and password/i)).not.toBeInTheDocument();
  });
});
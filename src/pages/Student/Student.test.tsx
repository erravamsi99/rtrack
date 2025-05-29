import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Student from './Student';

describe('Student component', () => {

  beforeEach(() => {
    render(<Student />);
  });

  // test('renders student information', () => {
  //   expect(screen.getByText(/John Doe/)).toBeInTheDocument();
  //   expect(screen.getByText(/20/)).toBeInTheDocument();
  //   expect(screen.getByText(/A/)).toBeInTheDocument();
  // });

  test('displays "No courses enrolled yet" message initially', () => {
    expect(screen.getByText(/No courses enrolled yet/)).toBeInTheDocument();
  });

  test('allows adding a new course', () => {
    const input = screen.getByPlaceholderText('Enter course name');
    const addButton = screen.getByText('Add Course');

    fireEvent.change(input, { target: { value: 'Mathematics' } });
    fireEvent.click(addButton);

    expect(screen.getByText('Mathematics')).toBeInTheDocument();
  });

  test('clears input after adding a course', () => {
    const input = screen.getByPlaceholderText('Enter course name');
    const addButton = screen.getByText('Add Course');

    fireEvent.change(input, { target: { value: 'Physics' } });
    fireEvent.click(addButton);

    expect(input).toHaveValue('');
  });

  test('does not add empty courses', () => {
    const addButton = screen.getByText('Add Course');

    fireEvent.click(addButton);

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
    expect(screen.getByText(/No courses enrolled yet/)).toBeInTheDocument();
  });
});
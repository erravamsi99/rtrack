import React from 'react';
import { render, screen } from '@testing-library/react';
import About from './About';

describe('About component', () => {
  beforeEach(() => {
    render(<About />);
  });

  test('renders main heading', () => {
    const headingElement = screen.getByRole('heading', { level: 1 });
    expect(headingElement).toHaveTextContent('About Us');
  });

  test('renders welcome message', () => {
    const welcomeMessage = screen.getByText(/Welcome to our About page/i);
    expect(welcomeMessage).toBeInTheDocument();
  });

  test('renders mission section', () => {
    const missionHeading = screen.getByRole('heading', { name: /Our Mission/i });
    expect(missionHeading).toBeInTheDocument();
    const missionText = screen.getByText(/To provide innovative solutions/i);
    expect(missionText).toBeInTheDocument();
  });

  test('renders team section', () => {
    const teamHeading = screen.getByRole('heading', { name: /Our Team/i });
    expect(teamHeading).toBeInTheDocument();
  });

  test('lists team members', () => {
    const teamList = screen.getByRole('list');
    const teamMembers = screen.getAllByRole('listitem');
    expect(teamList).toBeInTheDocument();
    expect(teamMembers).toHaveLength(3);
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Jane Smith/i)).toBeInTheDocument();
    expect(screen.getByText(/Mike Johnson/i)).toBeInTheDocument();
  });

  test('has correct CSS class', () => {
    const aboutDiv = screen.getByText(/About Us/i).closest('div');
    expect(aboutDiv).toHaveClass('about');
  });
});
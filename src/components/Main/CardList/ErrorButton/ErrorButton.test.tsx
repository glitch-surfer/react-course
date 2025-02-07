import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import ErrorButton from './ErrorButton';

describe('ErrorButton Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders the button correctly', () => {
    render(<ErrorButton />);

    // Check if the button is rendered
    const buttonElement = screen.getByText(/Throw Error/i);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('error-button');
  });

  it('throws an error when the button is clicked', () => {
    // Mock the console.error to suppress React's error boundary logging in the test output
    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    // Use a wrapper to catch the error
    const renderWithErrorBoundary = () => render(<ErrorButton />);

    // Render the component
    renderWithErrorBoundary();

    // Simulate a button click
    const buttonElement = screen.getByText(/Throw Error/i);
    expect(() => fireEvent.click(buttonElement)).toThrowError(
      'Test Error: This is a simulated error!'
    );

    // Restore the console.error mock
    consoleErrorMock.mockRestore();
  });
});

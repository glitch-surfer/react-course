import { afterEach, describe, expect, it } from 'vitest';
import { Spinner } from './Spinner';
import { cleanup, render, screen } from '@testing-library/react';

describe('Spinner Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders the spinner correctly', () => {
    render(<Spinner />);

    // Check if the spinner is rendered
    const spinnerElement = screen.getByRole('status', { hidden: true });
    expect(spinnerElement).toBeInTheDocument();
    expect(spinnerElement).toHaveClass('spinner');
  });

  it('has the correct CSS class applied', () => {
    render(<Spinner />);

    // Check if the spinner has the "spinner" class
    const spinnerElement = screen.getByRole('status', { hidden: true });
    expect(spinnerElement).toHaveClass('spinner');
  });

  it('does not render any text content', () => {
    render(<Spinner />);

    // Check if the spinner has no text content
    const spinnerElement = screen.getByRole('status', { hidden: true });
    expect(spinnerElement).toBeEmptyDOMElement();
  });
});

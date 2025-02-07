import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { Header } from './Header';

// Mock the Search component
vi.mock('./Search/Search', () => ({
  Search: () => (
    <div data-testid="search-component">Mocked Search Component</div>
  ),
}));

describe('Header Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('renders the header element', () => {
    render(<Header />);

    // Check if the header element is rendered
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveClass('header');
  });

  it('renders the Search component inside the header', () => {
    render(<Header />);

    // Check if the mocked Search component is rendered
    const searchComponent = screen.getByTestId('search-component');
    expect(searchComponent).toBeInTheDocument();
    expect(searchComponent).toHaveTextContent('Mocked Search Component');
  });
});

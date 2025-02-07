import { afterEach, describe, expect, it, Mock, vi } from 'vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { Main } from './Main';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

// Mock dependencies
vi.mock('./CardList/CardList', () => ({
  CardList: () => (
    <div data-testid="card-list">
      {[
        { url: 'url1', name: 'name1' },
        { url: 'url2', name: 'name2' },
      ].map((item, index: number) => (
        <div key={index} data-testid="card-item" onClick={() => vi.fn()}>
          {item.name}
        </div>
      ))}
    </div>
  ),
}));

vi.mock('./Spinner/Spinner', () => ({
  Spinner: () => <div data-testid="spinner">Loading...</div>,
}));

vi.mock('./Pagination/Pagination', () => ({
  Pagination: () => (
    <div data-testid="pagination">
      <button>Previous</button>
      <button>Next</button>
    </div>
  ),
}));

vi.mock('../../hooks/useLocalStorage.ts', () => ({
  useLocalStorage: vi.fn(() => ['', vi.fn()]),
}));

window.fetch = vi.fn();

describe('Main Component', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    (window.fetch as Mock).mockClear();
    cleanup();
  });

  const renderWithRouter = (ui: JSX.Element, initialEntries = ['/']) => {
    const router = createMemoryRouter([{ path: '/', element: ui }], {
      initialEntries,
    });
    return render(<RouterProvider router={router} />);
  };

  it('renders the Spinner while loading', async () => {
    (fetch as Mock).mockResolvedValueOnce(
      new Response(JSON.stringify({ results: [] }), { status: 200 })
    );

    renderWithRouter(<Main />);

    // Check if the Spinner is rendered
    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    // Wait for the Spinner to disappear after loading
    await waitFor(() => {
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });
  });

  it('displays an error message when fetching data fails', async () => {
    (fetch as Mock).mockRejectedValueOnce(new Error('Failed to fetch data'));

    renderWithRouter(<Main />);

    // Wait for the error message to appear
    await waitFor(() => {
      expect(
        screen.getByText(/Error: Failed to fetch data/i)
      ).toBeInTheDocument();
    });
  });
});

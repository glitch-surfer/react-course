import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Search } from './Search';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

// Mock the useLocalStorage hook
vi.mock('../../../hooks/useLocalStorage.ts', () => ({
  useLocalStorage: vi.fn(),
}));

describe('Search Component', () => {
  const mockSetSearchTerm = vi.fn();

  beforeEach(() => {
    (useLocalStorage as Mock).mockReturnValue(['', mockSetSearchTerm]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it('displays the current search term from local storage', () => {
    (useLocalStorage as Mock).mockReturnValue([
      'test search',
      mockSetSearchTerm,
    ]);

    render(<Search />);

    // Verify that the input field displays the current search term
    const inputElement = screen.getByPlaceholderText(/Search.../i);
    expect(inputElement).toHaveValue('test search');
  });

  it('updates the search term in local storage when typing in the input field', () => {
    render(<Search />);

    // Type in the input field
    const inputElement = screen.getByPlaceholderText(/Search.../i);
    fireEvent.change(inputElement, { target: { value: 'new search term' } });

    // Verify that the setSearchTerm function is called with the new value
    expect(mockSetSearchTerm).toHaveBeenCalledWith('new search term');
  });

  // it('dispatches the onSearch event with the processed search term when the search button is clicked', () => {
  //   // Create a spy for the event listener
  //   const onSearchMock = vi.fn();
  //   const handleCustomEvent = (event: Event) => {
  //     const customEvent = event as CustomEvent<string>;
  //     onSearchMock(customEvent.detail);
  //   };
  //   window.addEventListener('onSearch', handleCustomEvent);
  //
  //   render(<Search />);
  //
  //   // Set the search term in the input field
  //   const inputElement = screen.getByPlaceholderText(/Search.../i);
  //   fireEvent.change(inputElement, { target: { value: 'search term' } });
  //
  //   // Click the search button
  //   const searchButton = screen.getByText(/Search/i);
  //   fireEvent.click(searchButton);
  //
  //   // Verify that the custom event is dispatched with the correct detail
  //   expect(onSearchMock).toHaveBeenCalledTimes(1);
  //   expect(onSearchMock).toHaveBeenCalledWith('search term');
  //
  //   // Clean up the event listener
  //   window.removeEventListener('onSearch', handleCustomEvent);
  // });
  //
  // it('trims the search term before dispatching the onSearch event', () => {
  //   // Listen for the custom event
  //   const onSearchMock = vi.fn();
  //   window.addEventListener('onSearch', onSearchMock);
  //
  //   render(<Search />);
  //
  //   // Set the search term in the input field with leading/trailing spaces
  //   const inputElement = screen.getByPlaceholderText(/Search.../i);
  //   fireEvent.change(inputElement, { target: { value: '   search term   ' } });
  //
  //   // Click the search button
  //   const searchButton = screen.getByText(/Search/i);
  //   fireEvent.click(searchButton);
  //
  //   // Verify that the custom event is dispatched with the trimmed search term
  //   expect(onSearchMock).toHaveBeenCalledTimes(1);
  //   expect(onSearchMock.mock.calls[0][0].detail).toBe('search term');
  //
  //   // Clean up the event listener
  //   window.removeEventListener('onSearch', onSearchMock);
  // });
});

import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Details } from './Details';
import { useOutletContext } from 'react-router-dom';

// Mock the Spinner component
vi.mock('../Spinner/Spinner.tsx', () => ({
  Spinner: () => <div data-testid="spinner">Loading...</div>,
}));

// Mock the useOutletContext hook
vi.mock('react-router-dom', () => ({
  useOutletContext: vi.fn(() => ({})),
}));

describe('Details Component', () => {
  const mockDetailsId = '1';
  const mockHandleCloseDetails = vi.fn();

  const mockItemDetails = {
    name: 'Luke Skywalker',
    gender: 'male',
    height: '172',
    mass: '77',
    skin_color: 'fair',
  };

  beforeEach(() => {
    // Mock the useOutletContext to return the necessary props
    (useOutletContext as Mock).mockReturnValue({
      detailsId: mockDetailsId,
      handleCloseDetails: mockHandleCloseDetails,
    });

    // Mock the global fetch API
    window.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('displays a loading indicator while fetching data', async () => {
    // Mock fetch to simulate a delayed response
    (fetch as Mock).mockResolvedValueOnce(
      new Response(JSON.stringify(mockItemDetails), { status: 200 })
    );

    render(<Details />);

    // Ensure the spinner is displayed while loading
    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    // Wait for the fetch to complete
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  });

  it('displays the detailed card data after fetching', async () => {
    // Mock fetch to return the detailed card data
    (fetch as Mock).mockResolvedValueOnce(
      new Response(JSON.stringify(mockItemDetails), { status: 200 })
    );

    render(<Details />);

    // Wait for the detailed card data to be displayed
    await waitFor(() => {
      expect(screen.getByText(/Luke Skywalker Details/i)).toBeInTheDocument();
      expect(screen.getByText(/Gender: male/i)).toBeInTheDocument();
      expect(screen.getByText(/Height: 172/i)).toBeInTheDocument();
      expect(screen.getByText(/Mass: 77/i)).toBeInTheDocument();
      expect(screen.getByText(/Skin Color: fair/i)).toBeInTheDocument();
    });
  });

  it('displays an error message if the fetch fails', async () => {
    // Mock fetch to simulate an error response
    (fetch as Mock).mockRejectedValueOnce(new Error('Failed to fetch data'));

    render(<Details />);

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch data/i)).toBeInTheDocument();
    });
  });

  it('calls handleCloseDetails when the close button is clicked', async () => {
    // Mock fetch to return the detailed card data
    (fetch as Mock).mockResolvedValueOnce(
      new Response(JSON.stringify(mockItemDetails), { status: 200 })
    );

    render(<Details />);

    // Wait for the data to be displayed
    await waitFor(() => {
      expect(screen.getByText(/Luke Skywalker Details/i)).toBeInTheDocument();
    });

    // Click the close button
    const closeButton = screen.getByText(/Close/i);
    fireEvent.click(closeButton);

    // Ensure handleCloseDetails is called
    expect(mockHandleCloseDetails).toHaveBeenCalledTimes(1);
  });
});

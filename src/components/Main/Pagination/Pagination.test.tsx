import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Pagination } from './Pagination';

describe('Pagination Component', () => {
  afterEach(() => {
    // Reset the URL after each test
    window.history.pushState({}, '', '/');
    cleanup();
  });

  it('renders the current page number', () => {
    render(
      <Pagination currentPage={3} onPageChange={vi.fn()} isLastPage={false} />
    );

    // Verify that the current page number is displayed
    expect(screen.getByText(/Page: 3/i)).toBeInTheDocument();
  });

  it('disables the "Previous" button on the first page', () => {
    render(
      <Pagination currentPage={1} onPageChange={vi.fn()} isLastPage={false} />
    );

    // Verify that the "Previous" button is disabled
    const previousButton = screen.getByText(/Previous/i);
    expect(previousButton).toBeDisabled();
    cleanup();
  });

  it('disables the "Next" button on the last page', () => {
    render(
      <Pagination currentPage={5} onPageChange={vi.fn()} isLastPage={true} />
    );

    // Verify that the "Next" button is disabled
    const nextButton = screen.getByText(/Next/i);
    expect(nextButton).toBeDisabled();
  });

  it('calls onPageChange with the correct page number when "Previous" is clicked', () => {
    const onPageChangeMock = vi.fn();

    render(
      <Pagination
        currentPage={3}
        onPageChange={onPageChangeMock}
        isLastPage={false}
      />
    );

    // Click the "Previous" button
    const previousButton = screen.getByText(/Previous/i);
    fireEvent.click(previousButton);

    // Verify that onPageChange is called with the correct page number
    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange with the correct page number when "Next" is clicked', () => {
    const onPageChangeMock = vi.fn();

    render(
      <Pagination
        currentPage={3}
        onPageChange={onPageChangeMock}
        isLastPage={false}
      />
    );

    // Click the "Next" button
    const nextButton = screen.getByText(/Next/i);
    fireEvent.click(nextButton);

    // Verify that onPageChange is called with the correct page number
    expect(onPageChangeMock).toHaveBeenCalledWith(4);
  });

  it('updates the URL query parameter when "Previous" is clicked', () => {
    const onPageChangeMock = (page: number) => {
      // Update the URL manually in the mock function
      window.history.pushState({}, '', `?page=${page}`);
    };

    render(
      <Pagination
        currentPage={3}
        onPageChange={onPageChangeMock}
        isLastPage={false}
      />
    );

    // Click the "Previous" button
    const previousButton = screen.getByText(/Previous/i);
    fireEvent.click(previousButton);

    // Verify that the URL contains the updated page parameter
    expect(window.location.search).toBe('?page=2');
  });

  it('updates the URL query parameter when "Next" is clicked', () => {
    const onPageChangeMock = (page: number) => {
      // Update the URL manually in the mock function
      window.history.pushState({}, '', `?page=${page}`);
    };

    render(
      <Pagination
        currentPage={3}
        onPageChange={onPageChangeMock}
        isLastPage={false}
      />
    );

    // Click the "Next" button
    const nextButton = screen.getByText(/Next/i);
    fireEvent.click(nextButton);

    // Verify that the URL contains the updated page parameter
    expect(window.location.search).toBe('?page=4');
  });
});

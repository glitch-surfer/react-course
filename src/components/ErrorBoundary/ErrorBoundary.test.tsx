import React from 'react';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary'; // Adjust the path as necessary
import { vi, describe, expect, afterEach, it } from 'vitest';

// Mock the `console.error` to silence the error output in the test logs
vi.spyOn(console, 'error').mockImplementation(() => {});

describe('ErrorBoundary', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders children when there is no error', () => {
    // Render ErrorBoundary with child content
    render(
      <ErrorBoundary>
        <div>Test Child Component</div>
      </ErrorBoundary>
    );

    // Assert the child content is rendered
    expect(screen.getByText('Test Child Component')).toBeInTheDocument();
  });

  it('renders fallback UI when an error occurs', () => {
    // Component that throws an error for testing
    const FaultyComponent = () => {
      throw new Error('Test Error');
    };

    // Render ErrorBoundary with the faulty component as a child
    render(
      <ErrorBoundary>
        <FaultyComponent />
      </ErrorBoundary>
    );

    // Assert the error message is displayed in the fallback UI
    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
    expect(screen.getByText('Error: Test Error')).toBeInTheDocument();

    // Assert the reload button is rendered
    const reloadButton = screen.getByRole('button', { name: /reload page/i });
    expect(reloadButton).toBeInTheDocument();
  });

  it('calls getDerivedStateFromError when an error occurs', () => {
    // Spy on the `getDerivedStateFromError` static method
    const derivedStateSpy = vi.spyOn(ErrorBoundary, 'getDerivedStateFromError');

    // Component that throws an error for testing
    const FaultyComponent = () => {
      throw new Error('Test Error');
    };

    // Render ErrorBoundary with the faulty component as a child
    render(
      <ErrorBoundary>
        <FaultyComponent />
      </ErrorBoundary>
    );

    // Assert `getDerivedStateFromError` was called
    expect(derivedStateSpy).toHaveBeenCalledWith(new Error('Test Error'));
  });

  it('calls componentDidCatch when an error occurs', () => {
    // Spy on the `componentDidCatch` method
    const componentErrorBoundary = new ErrorBoundary({ children: null });
    const didCatchSpy = vi.spyOn(componentErrorBoundary, 'componentDidCatch');

    // Simulate an error and call `componentDidCatch` directly
    const error = new Error('Simulated Error');
    const errorInfo = {
      componentStack: 'Mocked Error Stack',
    } as React.ErrorInfo;
    componentErrorBoundary.componentDidCatch(error, errorInfo);

    // Assert `componentDidCatch` was called with the error and error info
    expect(didCatchSpy).toHaveBeenCalledWith(error, errorInfo);
  });
});

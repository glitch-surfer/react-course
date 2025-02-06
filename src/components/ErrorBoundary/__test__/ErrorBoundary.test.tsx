import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { ErrorBoundary } from '../ErrorBoundary';

test('renders name', async () => {
  const { getByText } = render(
    <ErrorBoundary>
      <div>test</div>
    </ErrorBoundary>
  );

  await expect.element(getByText('test')).toBeInTheDocument();
});

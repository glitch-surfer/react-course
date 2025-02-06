import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      provider: 'istanbul',
      include: ['src/**/*.tsx'], // Include all .tsx files in the `src` directory (recursively)
      exclude: [
        '**/node_modules/**', // Exclude node_modules
        'src/**/*.test.tsx', // Exclude test files
        'src/__mocks__/**', // Optionally exclude mock files if using mocks
      ],
    },
    browser: {
      enabled: true,
      provider: 'playwright',
      instances: [{ browser: 'chromium' }],
    },
  },
});

import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
    },
    setupFiles: ['./src/setupTests.ts'],
  },
  plugins: [tsconfigPaths()],
})

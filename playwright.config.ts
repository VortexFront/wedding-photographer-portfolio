import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', workers: 1, timeout: 30000,
  reporter: [['list'], ['json', { outputFile: 'test-results/report.json' }]],
  outputDir: 'test-results/artifacts',
  use: {
    baseURL: 'http://127.0.0.1:4187/wedding-photographer-portfolio/',
    reducedMotion: 'reduce',
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : {},
  },
  projects: [390, 768, 1440].map((width) => ({ name: String(width), use: { viewport: { width, height: 1000 } } })),
  webServer: {
    command: 'node node_modules/vite/bin/vite.js preview --host 127.0.0.1 --port 4187 --strictPort',
    url: 'http://127.0.0.1:4187/wedding-photographer-portfolio/', reuseExistingServer: false,
  },
});

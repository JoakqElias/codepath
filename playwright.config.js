import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:9000',
    browserName: 'chromium',
    channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure'
  },
  projects: process.env.PLAYWRIGHT_CHANNEL
    ? [{ name: 'browser', use: { channel: process.env.PLAYWRIGHT_CHANNEL } }]
    : [
        { name: 'Edge-escritorio', use: { channel: 'msedge', viewport: { width: 1440, height: 1000 } } },
        { name: 'Chrome-movil', use: { channel: 'chrome', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } }
      ],
  webServer: [
    { command: 'node tests/helpers/runApi.mjs', url: 'http://127.0.0.1:54329/health', reuseExistingServer: false, timeout: 60000 },
    {
      command: 'npm run dev -- --hostname 127.0.0.1 --port 9000',
      url: 'http://127.0.0.1:9000', reuseExistingServer: false, timeout: 60000,
      env: { SUPABASE_URL: 'http://127.0.0.1:54329', SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_LOCAL_TEST' }
    }
  ]
})

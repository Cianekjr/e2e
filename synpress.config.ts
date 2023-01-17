import { defineConfig } from "cypress";

import { setupNodeEvents } from "tests/e2e/plugins";

export default defineConfig({
  userAgent: "synpress",
  retries: {
    runMode: process.env.CI ? 1 : 0,
    openMode: 0,
  },
  screenshotsFolder: "tests/e2e/screenshots",
  videosFolder: "tests/e2e/videos",
  chromeWebSecurity: true,
  viewportWidth: 1366,
  viewportHeight: 768,
  taskTimeout: 120000,
  pageLoadTimeout: 120000,
  defaultCommandTimeout: 60000,

  e2e: {
    setupNodeEvents,
    specPattern: "tests/e2e/specs/**/*.{js,jsx,ts,tsx}",
    supportFile: "tests/e2e/support/index.ts",
    experimentalSessionAndOrigin: true,
  },
});

import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: false,
  workers: 1,
  reporter: "list",
  use: { baseURL: "http://127.0.0.1:3101", trace: "retain-on-failure" },
  projects: [
    { name: "http", testMatch: "**/http.spec.ts" },
    { name: "desktop", testIgnore: "**/http.spec.ts", use: { viewport: { width: 1280, height: 900 } } },
    { name: "mobile", testIgnore: "**/http.spec.ts", use: { viewport: { width: 360, height: 780 }, isMobile: true, hasTouch: true } },
  ],
  webServer: {
    command: "npm run build && npm start -- --hostname 127.0.0.1 --port 3101",
    timeout: 120_000,
    url: "http://127.0.0.1:3101",
    reuseExistingServer: false,
    // Never connect browser tests to the local machine's real receivers.
    env: { BLOB_READ_WRITE_TOKEN: "", DISCORD_WEBHOOK_URL: "", GOOGLE_SHEETS_WEBHOOK_URL: "", NEXT_PUBLIC_GA_MEASUREMENT_ID: "" },
  },
});

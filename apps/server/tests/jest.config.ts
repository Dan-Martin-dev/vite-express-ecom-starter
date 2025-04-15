import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["dotenv/config"], // Loads .env.test
  testMatch: [
    "**/tests/**/*.test.ts",  // Finds tests in controllers, db, services
  ],
  globalSetup: "<rootDir>/tests/setup.ts",  // Optional: Setup before tests
  globalTeardown: "<rootDir>/tests/teardown.ts",  // Optional: Cleanup after tests
};

export default config;

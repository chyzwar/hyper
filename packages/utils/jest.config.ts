import type {Config} from "@jest/types";

/**
 * Use jest with ts-jest to transform
 *
 * @see https://facebook.github.io/jest/docs/en/configuration.html
 */
const config: Config.InitialOptions = {
  testEnvironment: "node",
  displayName: "@hyper/utils",
  rootDir: "src",
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
};

export default config;
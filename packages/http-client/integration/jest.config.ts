import type {Config} from "jest";

const config: Config = {
  testRegex: "(/__tests__/.*|(\\.|/)(int|spec))\\.(ts?|tsx?)$",
  transformIgnorePatterns: ["/node_modules/(?!@hyper).+\\.js$"],
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
};

export default config;
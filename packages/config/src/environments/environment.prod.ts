import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

import { IEnvironment, InestyFeatures } from "./ienvironment";

if (process.env.IS_ELECTRON && process.env.nesty_USER_PATH) {
  require("app-root-path").setPath(process.env.nesty_USER_PATH);
}

export const environment: IEnvironment = {
  port: process.env.API_PORT || 3000,
  host: process.env.API_HOST || "http://localhost",
  baseUrl: process.env.API_BASE_URL || "https://api.nesty.co",
  clientBaseUrl: process.env.CLIENT_BASE_URL || "https://app.nesty.co",
  production: true,
  envName: "prod",

  env: {
    LOG_LEVEL: "debug",
  },

  EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET || "nesty",
  USER_PASSWORD_BCRYPT_SALT_ROUNDS: 12,
  JWT_SECRET: process.env.JWT_SECRET || "secretKey",
  JWT_REFRESH_TOKEN_SECRET:
    process.env.JWT_REFRESH_TOKEN_SECRET || "refreshSecretKey",
  JWT_REFRESH_TOKEN_EXPIRATION_TIME:
    parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME) || 60 * 60 * 24,

  /**
   * Password Less Authentication Configuration
   */
  AUTHENTICATION_CODE_EXPIRATION_TIME:
    parseInt(process.env.AUTHENTICATION_CODE_EXPIRATION_TIME) || 600, // default code expire time (10 minutes)
  /**
   * Throttler (Rate Limiting) Options
   */
  THROTTLE_TTL: parseInt(process.env.THROTTLE_TTL) || 60,
  THROTTLE_LIMIT: parseInt(process.env.THROTTLE_LIMIT) || 300,

  sentry: {
    dns: process.env.SENTRY_DSN,
  },

  /**
   * Endpoint for nesty AI API (optional), e.g.: http://localhost:3005/graphql
   */
  nestyAIGraphQLEndpoint: process.env.nesty_AI_GRAPHQL_ENDPOINT,
  nestyCloudEndpoint: process.env.nesty_CLOUD_ENDPOINT,
};

export const nestyToggleFeatures: InestyFeatures = {
  FEATURE_DASHBOARD: process.env.FEATURE_DASHBOARD === "false" ? false : true,
};

import * as dotenv from "dotenv";
dotenv.config();

// environment
const NODE_ENV: string = process.env.NODE_ENV;

// author
const AUTHOR: string = process.env.AUTHOR;

// application
const DOMAIN: string = process.env.DOMAIN;
const PORT: number = +process.env.PORT;
const END_POINT: string = process.env.END_POINT;
const SERVICE_PREFIX: string = process.env.SERVICE_PREFIX;
const RATE_LIMIT_MAX: number = +process.env.RATE_LIMIT_MAX;
const GRAPHQL_DEPTH_LIMIT: number = +process.env.GRAPHQL_DEPTH_LIMIT;

// Database
const MONGO_URI: string = process.env.MONGO_URI;
const DATABASE_CONNECTION_TIME_OUT: number = +process.env.DATABASE_CONNECTION_TIME_OUT;
const DATABASE_ACQUIRE_TIME_OUT: number = +process.env.DATABASE_ACQUIRE_TIME_OUT;
const DATABASE_CONNECTION_LIMIT: number = +process.env.DATABASE_CONNECTION_LIMIT;

// jsonwebtoken
const JWT_ISSUER: string = process.env.JWT_ISSUER || "http://paps-service-name.github.io";
const JWT_ACCESS_TOKEN: string = process.env.JWT_ACCESS_TOKEN || "access-token";
const JWT_ACCESS_TOKEN_SECRET: string = process.env.JWT_ACCESS_TOKEN_SECRET || "basic";
const JWT_ACCESS_TOKEN_EXPIRES: string = process.env.JWT_ACCESS_TOKEN_EXPIRES || "30d";

// GOOGLE API
const GOOGLE_PLACE_API_URL: string = process.env.GOOGLE_PLACE_API_URL;
const GOOGLE_API_KEY: string = process.env.GOOGLE_API_KEY;

// bcrypt
const SALT: number = +process.env.SALT || 10;

// sms api

const SMS_ACCOUNT_USERNAME = process.env.SMS_ACCOUNT_USERNAME;
const SMS_PASSWORD = process.env.SMS_PASSWORD;
const SMS_URL_API = process.env.SMS_URL_API;

// kafka broker
const KAFKA_BROKER_1: string = process.env.KAFKA_BROKER_1;

// GOOGLE MAIL API

const GOOGLE_CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET: string = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REFRESH_TOKEN: string = process.env.GOOGLE_REFRESH_TOKEN;

// email Mailjet

const MAILJET_API_KEY = process.env.MAILJET_API_KEY;
const MAILJET_SECRET_KEY = process.env.MAILJET_SECRET_KEY;
// uid pad length
const PAD_LENGTH = +process.env.PAD_LENGTH;

export {
  NODE_ENV,
  AUTHOR,
  DOMAIN,
  PORT,
  END_POINT,
  SERVICE_PREFIX,
  RATE_LIMIT_MAX,
  GRAPHQL_DEPTH_LIMIT,
  MONGO_URI,
  DATABASE_CONNECTION_TIME_OUT,
  DATABASE_ACQUIRE_TIME_OUT,
  DATABASE_CONNECTION_LIMIT,
  JWT_ISSUER,
  JWT_ACCESS_TOKEN,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRES,
  SALT,
  GOOGLE_API_KEY,
  GOOGLE_PLACE_API_URL,
  SMS_ACCOUNT_USERNAME,
  SMS_PASSWORD,
  SMS_URL_API,
  MAILJET_SECRET_KEY,
  MAILJET_API_KEY,
  PAD_LENGTH,
  KAFKA_BROKER_1,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN
};

// src/config.ts

// Load environment variables
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';
const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME || '';
const CLOUD_API_KEY = process.env.REACT_APP_CLOUD_API_KEY || '';
const EMAIL_SERVICE = process.env.REACT_APP_EMAIL_SERVICE || '';
const EMAIL_USERNAME = process.env.REACT_APP_EMAIL_USERNAME || '';
const RECAPTCHA_SECRET_KEY = process.env.REACT_APP_RECAPTCHA_SECRET_KEY || '';

// Export the constants
export {
  API_BASE_URL,
  CLOUD_NAME,
  CLOUD_API_KEY,
  EMAIL_SERVICE,
  EMAIL_USERNAME,
  RECAPTCHA_SECRET_KEY,
};

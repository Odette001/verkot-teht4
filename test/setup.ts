import 'dotenv/config';

// Set test environment variables
process.env.NODE_ENV = 'test';

// For local testing, use the .env file values or defaults
const dbHost = process.env.DB_HOST || 'localhost';
const dbUser = process.env.DB_USER || 'root';
const dbPass = process.env.DB_PASS || '';
const dbName = process.env.DB_NAME || 'cicdtest';
const port = process.env.PORT || '3333';

// Assign back to process.env to ensure they're available
process.env.DB_HOST = dbHost;
process.env.DB_USER = dbUser;
process.env.DB_PASS = dbPass;
process.env.DB_NAME = dbName;
process.env.PORT = port;

console.log('Test environment setup completed');
console.log('Database:', dbName);
console.log('Host:', dbHost);
console.log('User:', dbUser);
console.log('Password length:', dbPass.length);
console.log('NODE_ENV:', process.env.NODE_ENV);

// Check if we're in CI environment (GitHub Actions)
if (process.env.CI) {
  console.log('Running in CI environment');
} else {
  console.log('Running in local environment');
  console.log('Note: Make sure MySQL is installed and running locally');
}
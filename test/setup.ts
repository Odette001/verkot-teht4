import 'dotenv/config';

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.DB_HOST = process.env.DB_HOST || 'localhost';
process.env.DB_USER = process.env.DB_USER || 'root';
process.env.DB_PASS = process.env.DB_PASS || '';
process.env.DB_NAME = process.env.DB_NAME || 'cicdtest';
process.env.PORT = process.env.PORT || '3333';

console.log('Test environment setup completed');
console.log('Database:', process.env.DB_NAME);
console.log('Host:', process.env.DB_HOST);
console.log('User:', process.env.DB_USER);
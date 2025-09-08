require('dotenv').config();
const mysql = require('mysql2/promise');

async function createDatabase() {
  try {
    // Connect to MySQL server without specifying database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    });

    console.log('Connected to MySQL server');

    // Create database
    await connection.execute('DROP DATABASE IF EXISTS cicdtest');
    console.log('Dropped database cicdtest if it existed');
    
    await connection.execute('CREATE DATABASE cicdtest');
    console.log('Created database cicdtest');

    // Use the database
    await connection.execute('USE cicdtest');

    // Create students table
    const createTableQuery = `
      CREATE TABLE students (
        student_id int(11) NOT NULL AUTO_INCREMENT,
        student_name text NOT NULL,
        filename text NOT NULL,
        birthdate date NOT NULL,
        PRIMARY KEY (student_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci
    `;

    await connection.execute(createTableQuery);
    console.log('Created students table');

    await connection.end();
    console.log('Database setup completed successfully!');

  } catch (error) {
    console.error('Error creating database:', error.message);
  }
}

createDatabase();

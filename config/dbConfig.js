// Load environment variables from .env file
require('dotenv').config();

// Import the mysql2 library
const mysql = require('mysql2/promise'); // Use the promise-based API

// Database configuration settings using environment variables
const dbConfig = {
    host: process.env.DB_HOST, // Database host
    user: process.env.DB_USER, // Your MySQL username
    password: process.env.DB_PASSWORD, // Your MySQL password
    database: process.env.DB_NAME, // The name of the database you want to connect to
    waitForConnections: true, // Wait for connections instead of failing immediately
    connectionLimit: 10, // Maximum number of connections in the pool
    queueLimit: 0 // No limit on queued connection requests
};

/**
 * Create a MySQL connection pool
 * @returns {Promise<Pool>} MySQL connection pool
 */
const pool = mysql.createPool(dbConfig);

/**
 * Function to get a connection from the pool
 * @returns {Promise<Connection>} MySQL connection
 */
const getConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Database connection established');
        return connection;
    } catch (error) {
        console.error('Error getting database connection:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
};

/**
 * Function to execute a query
 * @param {string} query - SQL query to execute
 * @param {Array} params - Parameters for the SQL query
 * @returns {Promise<Array>} Query results
 */
const executeQuery = async (query, params = []) => {
    let connection;

    try {
        connection = await getConnection();
        const [results] = await connection.execute(query, params);
        return results; // Return the results of the query
    } catch (error) {
        console.error('Error executing query:', error);
        throw error; // Rethrow the error to be handled by the caller
    } finally {
        if (connection) {
            connection.release(); // Release the connection back to the pool
        }
    }
};

/**
 * Function to connect to the database
 */
const connectDB = async () => {
    try {
        await getConnection(); // This will call getConnection, which will log the connection
        console.log('Connected to the database');
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error; // Rethrow the error if connection fails
    }
};

module.exports = {
    connectDB,  // Export the connectDB function
    getConnection,
    executeQuery,
};

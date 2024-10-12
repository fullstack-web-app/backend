// app.js

// Load environment variables from .env file
require('dotenv').config();

// Import necessary modules
const express = require('express');
const morgan = require('morgan'); // HTTP request logger middleware
const cors = require('cors'); // Enable Cross-Origin Resource Sharing
const bodyParser = require('body-parser'); // Middleware to parse JSON bodies
const helmet = require('helmet'); // Security middleware for setting HTTP headers
const { connectDB } = require('./config/dbConfig'); // Database connection
const routes = require('./routes'); // Import all routes
// const errorHandler = require('./middleware/errorHandler'); // Custom error handler

// Initialize the app
const app = express();

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(helmet()); // Protect against common vulnerabilities
app.use(morgan('dev')); // Log HTTP requests in the console
app.use(bodyParser.json()); // Parse JSON bodies

// Connect to the database
connectDB(); // Now this should work without errors

// Set up routes
app.use('/api', routes); // All routes will be prefixed with /api

// Custom error handling middleware
// app.use(errorHandler); // Handle errors in a centralized manner

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app; // Export the app for testing purposes

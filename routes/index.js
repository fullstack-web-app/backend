// routes/index.js
const express = require('express');
const router = express.Router();
const authorRoutes = require('./authorRoutes');
const bookRoutes = require('./bookRoutes');

// Use author routes
router.use('/authors', authorRoutes); // Route prefix for authors

// Use book routes
router.use('/books', bookRoutes); // Route prefix for books

module.exports = router; // Export the router

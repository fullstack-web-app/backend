const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController'); // Import the book controller

// Route to get all books
router.get('/', bookController.getAllBooks);

// Route to get a book by ID
router.get('/:id', bookController.getBookById);

// Route to create a new book
router.post('/', bookController.createBook);

// Route to update an existing book
router.put('/:id', bookController.updateBook);

// Route to delete a book
router.delete('/:id', bookController.deleteBook);

module.exports = router; // Export the router

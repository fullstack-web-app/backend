const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController'); // Import the author controller

// Route to get all authors
router.get('/', authorController.getAllAuthors);

// Route to get an author by ID
router.get('/:id', authorController.getAuthorById);

// Route to create a new author
router.post('/', authorController.createAuthor);

// Route to update an existing author
router.put('/:id', authorController.updateAuthor);

// Route to delete an author
router.delete('/:id', authorController.deleteAuthor);

module.exports = router; // Export the router

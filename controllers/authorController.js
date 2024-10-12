const Author = require('../models/authorModel'); // Import the Author model

/**
 * Get all authors
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.getAll();
        res.status(200).json(authors);
    } catch (error) {
        console.error('Error fetching authors:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Get an author by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAuthorById = async (req, res) => {
    const { id } = req.params;
    try {
        const author = await Author.getById(id);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.status(200).json(author);
    } catch (error) {
        console.error('Error fetching author:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Create a new author
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createAuthor = async (req, res) => {
    const { first_name, last_name, birthdate, nationality } = req.body;
    const newAuthor = new Author(first_name, last_name, birthdate, nationality);
    try {
        await newAuthor.save();
        res.status(201).json({ message: 'Author created successfully' });
    } catch (error) {
        console.error('Error creating author:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Update an existing author
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateAuthor = async (req, res) => {
    const { id } = req.params;
    const authorData = req.body;

    try {
        await Author.update(id, authorData);
        res.status(200).json({ message: 'Author updated successfully' });
    } catch (error) {
        console.error('Error updating author:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Delete an author
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteAuthor = async (req, res) => {
    const { id } = req.params;

    try {
        await Author.delete(id);
        res.status(200).json({ message: 'Author deleted successfully' });
    } catch (error) {
        console.error('Error deleting author:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor,
};

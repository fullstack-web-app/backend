const Book = require('../models/bookModel'); // Import the Book model

/**
 * Get all books
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.getAll();
        res.status(200).json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Get a book by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.getById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        console.error('Error fetching book:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Create a new book
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createBook = async (req, res) => {
    const { title, genre, publish_date, author_id } = req.body;
    const newBook = new Book(title, genre, publish_date, author_id);
    try {
        await newBook.save();
        res.status(201).json({ message: 'Book created successfully' });
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Update an existing book
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateBook = async (req, res) => {
    const { id } = req.params;
    const bookData = req.body;

    try {
        await Book.update(id, bookData);
        res.status(200).json({ message: 'Book updated successfully' });
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Delete a book
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        await Book.delete(id);
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
};

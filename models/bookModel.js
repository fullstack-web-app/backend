const db = require('../config/dbConfig'); // Import the database connection

/**
 * Book model
 */
class Book {
    constructor(title, genre, publish_date, author_id) {
        this.title = title;
        this.genre = genre;
        this.publish_date = publish_date;
        this.author_id = author_id;
    }

    /**
     * Get all books from the database
     * @returns {Promise<Array>} List of books
     */
    static async getAll() {
        try {
            const books = await db.executeQuery('SELECT * FROM books');
            return books;
        } catch (error) {
            throw new Error('Error retrieving books');
        }
    }

    /**
     * Get a book by ID
     * @param {number} id - Book ID
     * @returns {Promise<Object>} Book details
     */
    static async getById(id) {
        try {
            const books = await db.executeQuery('SELECT * FROM books WHERE book_id = ?', [id]);
            return books[0]; // Return the first book found
        } catch (error) {
            throw new Error('Error retrieving book');
        }
    }

    /**
     * Create a new book in the database
     * @returns {Promise<void>}
     */
    async save() {
        try {
            const query = 'INSERT INTO books (title, genre, publish_date, author_id) VALUES (?, ?, ?, ?)';
            await db.executeQuery(query, [this.title, this.genre, this.publish_date, this.author_id]);
        } catch (error) {
            throw new Error('Error creating book');
        }
    }

    /**
     * Update an existing book
     * @param {number} id - Book ID
     * @returns {Promise<void>}
     */
    static async update(id, data) {
        const { title, genre, publish_date, author_id } = data;
        try {
            const query = 'UPDATE books SET title = ?, genre = ?, publish_date = ?, author_id = ? WHERE book_id = ?';
            await db.executeQuery(query, [title, genre, publish_date, author_id, id]);
        } catch (error) {
            throw new Error('Error updating book');
        }
    }

    /**
     * Delete a book
     * @param {number} id - Book ID
     * @returns {Promise<void>}
     */
    static async delete(id) {
        try {
            const query = 'DELETE FROM books WHERE book_id = ?';
            await db.executeQuery(query, [id]);
        } catch (error) {
            throw new Error('Error deleting book');
        }
    }
}

module.exports = Book;

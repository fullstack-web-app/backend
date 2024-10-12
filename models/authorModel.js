// models/author.js
const db = require('../config/dbConfig'); // Import the database connection

/**
 * Author model
 */
class Author {
    constructor(first_name, last_name, birthdate, nationality) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.birthdate = birthdate;
        this.nationality = nationality;
    }

    /**
     * Get all authors from the database
     * @returns {Promise<Array>} List of authors
     */
    static async getAll() {
        try {
            const authors = await db.executeQuery('SELECT * FROM authors');
            return authors;
        } catch (error) {
            throw new Error('Error retrieving authors');
        }
    }

    /**
     * Get an author by ID
     * @param {number} id - Author ID
     * @returns {Promise<Object>} Author details
     */
    static async getById(id) {
        try {
            const authors = await db.executeQuery('SELECT * FROM authors WHERE author_id = ?', [id]);
            return authors[0]; // Return the first author found
        } catch (error) {
            throw new Error('Error retrieving author');
        }
    }

    /**
     * Create a new author in the database
     * @returns {Promise<void>}
     */
    async save() {
        try {
            const query = 'INSERT INTO authors (first_name, last_name, birthdate, nationality) VALUES (?, ?, ?, ?)';
            await db.executeQuery(query, [this.first_name, this.last_name, this.birthdate, this.nationality]);
        } catch (error) {
            throw new Error('Error creating author');
        }
    }

    /**
     * Update an existing author
     * @param {number} id - Author ID
     * @returns {Promise<void>}
     */
    static async update(id, data) {
        const { first_name, last_name, birthdate, nationality } = data;
        try {
            const query = 'UPDATE authors SET first_name = ?, last_name = ?, birthdate = ?, nationality = ? WHERE author_id = ?';
            await db.executeQuery(query, [first_name, last_name, birthdate, nationality, id]);
        } catch (error) {
            throw new Error('Error updating author');
        }
    }

    /**
     * Delete an author
     * @param {number} id - Author ID
     * @returns {Promise<void>}
     */
    static async delete(id) {
        try {
            const query = 'DELETE FROM authors WHERE author_id = ?';
            await db.executeQuery(query, [id]);
        } catch (error) {
            throw new Error('Error deleting author');
        }
    }
}

module.exports = Author;

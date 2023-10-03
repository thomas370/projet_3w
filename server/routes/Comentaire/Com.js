const express = require('express');
const mysql = require('mysql2/promise');

const router = express.Router();
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
};

// Afficher les Commentaires

router.get('/comments', async (req, res) => {
    const connection = await mysql.createConnection(dbConfig);
    try {
        const query = `
            SELECT users.username, beers.name AS beer_name, comments.comment, comments.rating
            FROM comments
            JOIN users ON comments.user_id = users.id
            JOIN beers ON comments.beer_id = beers.id
            ORDER BY comments.id DESC
            LIMIT 5
        `;
        const [results] = await connection.execute(query);
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving detailed comments');
    } finally {
        await connection.end();
    }
});

//ajouter un commentaire
router.post('/comments', async (req, res) => {
const { user_id, rating, text, beer_id } = req.body;
    const connection = await mysql.createConnection(dbConfig);
    try {
        await connection.execute('INSERT INTO comments (user_id, rating, comment, beer_id) VALUES (?, ?, ?, ?)', [user_id, rating, text, beer_id]);
        res.status(201).send('Comment added');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding comment');
    } finally {
        await connection.end();
    }
});

//suprimer un commentaire
router.delete('/delete-comment/:id', async (req, res) => {
    const connection = await mysql.createConnection(dbConfig);
    try {
        const [rows] = await connection.execute('DELETE FROM comments WHERE id = ?', [req.params.id]);
        res.json(rows);
    } catch (error) {
        res.status(500).send('Error deleting comment');
    } finally {
        await connection.end();
    }
});

module.exports = router;
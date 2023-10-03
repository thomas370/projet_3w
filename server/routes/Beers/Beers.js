const express = require('express');
const mysql = require('mysql2/promise');

const router = express.Router();
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
};

// Afficher les bières
router.get('/beers', async (req, res) => {
    const connection = await mysql.createConnection(dbConfig);
    try {
        const [rows] = await connection.execute('SELECT * FROM beers');
        res.json(rows);
    } catch (error) {
        res.status(500).send('Error retrieving beers');
    } finally {
        await connection.end();
    }
});

//suprimer une bière
router.delete('/beers/:id', async (req, res) => {
    const connection = await mysql.createConnection(dbConfig);
    try {
        const [rows] = await connection.execute('DELETE FROM beers WHERE id = ?', [req.params.id]);
        res.json(rows);
    } catch (error) {
        res.status(500).send('Error deleting beer');
    } finally {
        await connection.end();
    }
}
);

//ajouter une bière
router.post('/beers', async (req, res) => {
    const connection = await mysql.createConnection(dbConfig);
    try {
        const [rows] = await connection.execute('INSERT INTO beers (name, description, price, taux, image) VALUES (?, ?, ?, ?, ?)', [req.body.name, req.body.description, req.body.price, req.body.taux, req.body.image]);
        res.json(rows);
    } catch (error) {
        res.status(500).send('Error adding beer');
    } finally {
        await connection.end();
    }
}
);

router.put('/beers/:id', async (req, res) => {
    const connection = await mysql.createConnection(dbConfig);
    try {
        const [rows] = await connection.execute('UPDATE beers SET name = ?, description = ?, price = ?, taux = ?, image = ? WHERE id = ?', [req.body.name, req.body.description, req.body.price, req.body.taux, req.body.image, req.params.id]);
        res.json(rows);
    }
    catch (error) {
        res.status(500).send('Error updating beer');
    }
    finally {
        await connection.end();
    }
}
);
module.exports = router;
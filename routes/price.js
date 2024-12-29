const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all prices
router.get('/', (req, res) => {
    db.query('SELECT * FROM Price', (err, results) => {
        if (err) return res.status(500).send(err.message);
        res.json(results);
    });
});

// Add a new price
router.post('/', (req, res) => {
    const { Price, Service_Id, Code_Id, Department_Id, Price_Description } = req.body;
    const sql = 'INSERT INTO Price (Price, Service_Id, Code_Id, Department_Id, Price_Description) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [Price, Service_Id, Code_Id, Department_Id, Price_Description], (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.status(201).json({ message: 'Price added', id: result.insertId });
    });
});

// Update a price
router.put('/:id', (req, res) => {
    const { Price, Service_Id, Code_Id, Department_Id, Price_Description } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE Price SET Price = ?, Service_Id = ?, Code_Id = ?, Department_Id = ?, Price_Description = ? WHERE Price_Id = ?';
    db.query(sql, [Price, Service_Id, Code_Id, Department_Id, Price_Description, id], (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.json({ message: 'Price updated', affectedRows: result.affectedRows });
    });
});

// Delete a price
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Price WHERE Price_Id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.json({ message: 'Price deleted', affectedRows: result.affectedRows });
    });
});

module.exports = router;

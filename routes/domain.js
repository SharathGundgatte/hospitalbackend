const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all domains
router.get('/', (req, res) => {
    db.query('SELECT * FROM Domain', (err, results) => {
        if (err) return res.status(500).send(err.message);
        res.json(results);
    });
});

// Add a new domain
router.post('/', (req, res) => {
    const { Name, Description, Is_Active } = req.body;
    const sql = 'INSERT INTO Domain (Name, Description, Is_Active) VALUES (?, ?, ?)';
    db.query(sql, [Name, Description, Is_Active], (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.status(201).json({ message: 'Domain added', id: result.insertId });
    });
});

// Update a domain
router.put('/:id', (req, res) => {
    const { Name, Description, Is_Active } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE Domain SET Name = ?, Description = ?, Is_Active = ? WHERE Domain_Id = ?';
    db.query(sql, [Name, Description, Is_Active, id], (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.json({ message: 'Domain updated', affectedRows: result.affectedRows });
    });
});

// Delete a domain
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Domain WHERE Domain_Id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.json({ message: 'Domain deleted', affectedRows: result.affectedRows });
    });
});

module.exports = router;

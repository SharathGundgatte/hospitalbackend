const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all staff types
router.get('/', (req, res) => {
    db.query('SELECT * FROM Staff_Type', (err, results) => {
        if (err) return res.status(500).send(err.message);
        res.json(results);
    });
});



// Get a single staff type by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM Staff_Type WHERE Staff_Type_Id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err.message);
        }
        if (results.length === 0) return res.status(404).send('Staff Type not found');
        res.json(results[0]);
    });
});


// Add a new staff type
router.post('/', (req, res) => {
    const { Type_Name, Description, Is_Active } = req.body;
    const sql = 'INSERT INTO Staff_Type (Type_Name, Description, Is_Active) VALUES (?, ?, ?)';
    db.query(sql, [Type_Name, Description, Is_Active], (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.status(201).json({ message: 'Staff type added', id: result.insertId });
    });
});

// Update a staff type
router.put('/:id', (req, res) => {
    const { Type_Name, Description, Is_Active } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE Staff_Type SET Type_Name = ?, Description = ?, Is_Active = ? WHERE Type_Id = ?';
    db.query(sql, [Type_Name, Description, Is_Active, id], (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.json({ message: 'Staff type updated', affectedRows: result.affectedRows });
    });
});

// Delete a staff type
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Staff_Type WHERE Type_Id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.json({ message: 'Staff type deleted', affectedRows: result.affectedRows });
    });
});

module.exports = router;

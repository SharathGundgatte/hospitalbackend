const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all staff availability
router.get('/', (req, res) => {
    db.query('SELECT * FROM Staff_Availability', (err, results) => {
        if (err) return res.status(500).send(err.message);
        res.json(results);
    });
});

// Add a new staff availability
router.post('/', (req, res) => {
    const { Staff_Id, Available_Dt, Available_From_Tm, Available_To_Tm, Is_Available } = req.body;
    const sql = 'INSERT INTO Staff_Availability (Staff_Id, Available_Dt, Available_From_Tm, Available_To_Tm, Is_Available) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [Staff_Id, Available_Dt, Available_From_Tm, Available_To_Tm, Is_Available], (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.status(201).json({ message: 'Staff availability added', id: result.insertId });
    });
});

// Update staff availability
router.put('/:id', (req, res) => {
    const { Staff_Id, Available_Dt, Available_From_Tm, Available_To_Tm, Is_Available } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE Staff_Availability SET Staff_Id = ?, Available_Dt = ?, Available_From_Tm = ?, Available_To_Tm = ?, Is_Available = ? WHERE Availability_Id = ?';
    db.query(sql, [Staff_Id, Available_Dt, Available_From_Tm, Available_To_Tm, Is_Available, id], (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.json({ message: 'Staff availability updated', affectedRows: result.affectedRows });
    });
});

// Delete staff availability
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Staff_Availability WHERE Availability_Id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.json({ message: 'Staff availability deleted', affectedRows: result.affectedRows });
    });
});

module.exports = router;

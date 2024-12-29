const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Read All Departments
router.get('/', (req, res) => {
    db.query('SELECT * FROM Department', (err, results) => {
        if (err) return res.status(500).send(err.message);
        res.json(results);
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM Department WHERE Dept_Id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err.message);
        if (results.length === 0) return res.status(404).send('Department not found');
        res.json(results[0]);
    });
});

// Create a Department
router.post('/', (req, res) => {
    const { Dept_Name, Description, Dept_Hospital_Cd, Is_Active } = req.body;
    const sql = 'INSERT INTO Department (Dept_Name, Description, Dept_Hospital_Cd, Is_Active) VALUES (?, ?, ?, ?)';
    db.query(sql, [Dept_Name, Description, Dept_Hospital_Cd, Is_Active], (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.status(201).json({ message: 'Department created', id: result.insertId });
    });
});

// Update a Department
router.put('/:id', (req, res) => {
    const { Dept_Name, Description, Dept_Hospital_Cd, Is_Active } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE Department SET Dept_Name = ?, Description = ?, Dept_Hospital_Cd = ?, Is_Active = ? WHERE Dept_Id = ?';
    db.query(sql, [Dept_Name, Description, Dept_Hospital_Cd, Is_Active, id], (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.json({ message: 'Department updated', affectedRows: result.affectedRows });
    });
});

// Delete a Department
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Department WHERE Dept_Id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.json({ message: 'Department deleted', affectedRows: result.affectedRows });
    });
});

module.exports = router;

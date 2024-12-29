const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Read All Codes
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM `Code`';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.message);
        res.json(results);
    });
});

// Get a Code by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'SELECT * FROM `Code` WHERE Code_Id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.message);
        if (result.length === 0) {
            return res.status(404).json({ message: 'Code not found' });
        }
        res.json(result[0]);
    });
});

// Create a New Code
router.post('/', (req, res) => {
    const {
        Name,
        Domain_Cd,
        Is_Active
    } = req.body;

    // Validate required fields
    if (!Name || !Domain_Cd || Is_Active === undefined) {
        return res.status(400).send('Required fields are missing');
    }

    const sql = `
        INSERT INTO \`Code\`
        (Name, Domain_Cd, Is_Active)
        VALUES (?, ?, ?)
    `;

    const values = [Name, Domain_Cd, Is_Active];

    db.query(sql, values, (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.status(201).json({
            message: 'Code created',
            Code_Id: result.insertId,
        });
    });
});

// Update a Code
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    if (!Object.keys(updates).length) {
        return res.status(400).send('No fields to update');
    }

    const fields = [];
    const values = [];

    for (const [key, value] of Object.entries(updates)) {
        fields.push(`${key} = ?`);
        values.push(value);
    }

    const sql = `UPDATE \`Code\` SET ${fields.join(', ')} WHERE Code_Id = ?`;
    values.push(id);

    db.query(sql, values, (err, result) => {
        if (err) return res.status(500).send(err.message);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Code not found' });
        }
        res.json({ message: 'Code updated', affectedRows: result.affectedRows });
    });
});

// Delete a Code
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM \`Code\` WHERE Code_Id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.message);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Code not found' });
        }
        res.json({ message: 'Code deleted', affectedRows: result.affectedRows });
    });
});

module.exports = router;
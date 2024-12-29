const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Read All Patients
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM `Patient`';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err.message);
        res.json(results);
    });
});

// Get a Patient by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;  // Extract ID from the request parameters

    const sql = 'SELECT * FROM `Patient` WHERE Patient_Id = ?';  // Correct column name
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.message);  // Handle query errors
        if (result.length === 0) {
            return res.status(404).json({ message: 'Patient not found' });  // Handle no results
        }
        res.json(result[0]);  // Return the first (and only) result
    });
});

// Create a New Patient
router.post('/', (req, res) => {
    const {
        F_Name,
        M_Name,
        L_Name,
        Phone_Number,
        Email,
        Date_Of_Birth,
        Gender_Cd,
        Medical_History_Id,
        Address,
        City,
        State,
        Pincode,
        Adhar_Number,
    } = req.body;

    // Validate required fields
    if (!F_Name || !L_Name || !Phone_Number || !Address || !City || !State || !Pincode) {
        return res.status(400).send('Required fields are missing');
    }

    const sql = `
        INSERT INTO \`Patient\` 
        (F_Name, M_Name, L_Name, Phone_Number, Email, Date_Of_Birth, Gender_Cd, Medical_History_Id, Address, City, State, Pincode, Adhar_Number)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        F_Name,
        M_Name || null, // Allowing NULL for optional fields
        L_Name,
        Phone_Number,
        Email || null,
        Date_Of_Birth || null,
        Gender_Cd || null,
        Medical_History_Id || null,
        Address,
        City,
        State,
        Pincode,
        Adhar_Number || null,
    ];

    db.query(sql, values, (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.status(201).json({
            message: 'Patient created',
            Patient_Id: result.insertId,
        });
    });
});

// Update a Patient
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

    const sql = `UPDATE \`Patient\` SET ${fields.join(', ')} WHERE Patient_Id = ?`;
    values.push(id);

    db.query(sql, values, (err, result) => {
        if (err) return res.status(500).send(err.message);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.json({ message: 'Patient updated', affectedRows: result.affectedRows });
    });
});

// Delete a Patient
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM `Patient` WHERE Patient_Id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.message);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.json({ message: 'Patient deleted', affectedRows: result.affectedRows });
    });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Read All Hospitals
router.get('/', (req, res) => {
    db.query('SELECT * FROM `Client_Hospital`', (err, results) => {
        if (err) return res.status(500).send(err.message);
        res.json(results);
    });
});

// Get a Hospital by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM `Client_Hospital` WHERE Hospital_Id = ?', [id], (err, result) => {
        if (err) return res.status(500).send(err.message);
        if (result.length === 0) {
            return res.status(404).json({ message: 'Hospital not found' });
        }
        res.json(result[0]);
    });
});

// Create a New Hospital
router.post('/', (req, res) => {
    const { Hospital_Code, Hospital_Name, Hospital_Address, Hospital_City, Hospital_State, Hospital_Pincode, Hospital_Register_Number, Hospital_Registration_Certificate, Hospital_Registration_Start_Date, Hospital_Registration_End_Date } = req.body;
    const sql = 'INSERT INTO `Client_Hospital` (Hospital_Code, Hospital_Name, Hospital_Address, Hospital_City, Hospital_State, Hospital_Pincode, Hospital_Register_Number, Hospital_Registration_Certificate, Hospital_Registration_Start_Date, Hospital_Registration_End_Date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [Hospital_Code, Hospital_Name, Hospital_Address, Hospital_City, Hospital_State, Hospital_Pincode, Hospital_Register_Number, Hospital_Registration_Certificate, Hospital_Registration_Start_Date, Hospital_Registration_End_Date], (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.status(201).json({ message: 'Hospital created', Hospital_Id: result.insertId });
    });
});

// Update a Hospital
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { Hospital_Code, Hospital_Name, Hospital_Address, Hospital_City, Hospital_State, Hospital_Pincode, Hospital_Register_Number, Hospital_Registration_Certificate, Hospital_Registration_Start_Date, Hospital_Registration_End_Date } = req.body;

    const sql = 'UPDATE `Client_Hospital` SET Hospital_Code = ?, Hospital_Name = ?, Hospital_Address = ?, Hospital_City = ?, Hospital_State = ?, Hospital_Pincode = ?, Hospital_Register_Number = ?, Hospital_Registration_Certificate = ?, Hospital_Registration_Start_Date = ?, Hospital_Registration_End_Date = ? WHERE Hospital_Id = ?';
    db.query(sql, [Hospital_Code, Hospital_Name, Hospital_Address, Hospital_City, Hospital_State, Hospital_Pincode, Hospital_Register_Number, Hospital_Registration_Certificate, Hospital_Registration_Start_Date, Hospital_Registration_End_Date, id], (err, result) => {
        if (err) return res.status(500).send(err.message);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Hospital not found' });
        }
        res.json({ message: 'Hospital updated', affectedRows: result.affectedRows });
    });
});

// Delete a Hospital
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM `Client_Hospital` WHERE Hospital_Id = ?', [id], (err, result) => {
        if (err) return res.status(500).send(err.message);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Hospital not found' });
        }
        res.json({ message: 'Hospital deleted', affectedRows: result.affectedRows });
    });
});

module.exports = router;

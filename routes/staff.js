const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all staff (used for authentication)
router.get('/', (req, res) => {
    db.query('SELECT Staff_Id, Staff_F_Name, Staff_L_Name, Staff_Password, Staff_Type_Cd FROM Staff', (err, results) => {
        if (err) return res.status(500).send(err.message);
        res.json(results);
    });
});
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM Staff WHERE Staff_Id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err.message);
        if (results.length === 0) return res.status(404).send('Staff not found');
        res.json(results[0]);
    });
});

// Add a new staff member
router.post('/', (req, res) => {
    const { Staff_F_Name, Staff_L_Name, Phone_Number, Dept_Cd, Staff_Type_Cd, Hospital_Emp_Number, Staff_Adhar_Number, Is_Active, Availability, Max_Daily_Bookings } = req.body;
    const sql = 'INSERT INTO Staff (Staff_F_Name, Staff_L_Name, Phone_Number, Dept_Cd, Staff_Type_Cd, Hospital_Emp_Number, Staff_Adhar_Number, Is_Active, Availability, Max_Daily_Bookings) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [Staff_F_Name, Staff_L_Name, Phone_Number, Dept_Cd, Staff_Type_Cd, Hospital_Emp_Number, Staff_Adhar_Number, Is_Active, Availability, Max_Daily_Bookings], (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.status(201).json({ message: 'Staff added', id: result.insertId });
    });
});

// Update a staff member
router.put('/:id', (req, res) => {
    const { Staff_F_Name, Staff_L_Name, Phone_Number, Dept_Cd, Staff_Type_Cd, Hospital_Emp_Number, Staff_Adhar_Number, Is_Active, Availability, Max_Daily_Bookings } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE Staff SET Staff_F_Name = ?, Staff_L_Name = ?, Phone_Number = ?, Dept_Cd = ?, Staff_Type_Cd = ?, Hospital_Emp_Number = ?, Staff_Adhar_Number = ?, Is_Active = ?, Availability = ?, Max_Daily_Bookings = ? WHERE Staff_Id = ?';
    db.query(sql, [Staff_F_Name, Staff_L_Name, Phone_Number, Dept_Cd, Staff_Type_Cd, Hospital_Emp_Number, Staff_Adhar_Number, Is_Active, Availability, Max_Daily_Bookings, id], (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.json({ message: 'Staff updated', affectedRows: result.affectedRows });
    });
});

// Delete a staff member
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Staff WHERE Staff_Id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.json({ message: 'Staff deleted', affectedRows: result.affectedRows });
    });
});

module.exports = router;

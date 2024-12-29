const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Read All Bookings
router.get('/', (req, res) => {
    db.query('SELECT * FROM `Booking`', (err, results) => {
        if (err) return res.status(500).send(err.message);
        res.json(results);
    });
});

// Get a Booking by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM `Booking` WHERE Booking_Id = ?', [id], (err, result) => {
        if (err) return res.status(500).send(err.message);
        if (result.length === 0) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(result[0]);
    });
});

// Create a New Booking
router.post('/', (req, res) => {
    const { Patient_Id, Booking_Date_Time, Booking_Status_Cd, Booking_Confirmed_Time_Slot, Preferred_Date, Total_Price } = req.body;
    if (!Patient_Id || !Booking_Date_Time || !Booking_Status_Cd || !Booking_Confirmed_Time_Slot || !Preferred_Date || !Total_Price) {
        return res.status(400).send('All fields are required');
    }

    const sql = 'INSERT INTO `Booking` (Patient_Id, Booking_Date_Time, Booking_Status_Cd, Booking_Confirmed_Time_Slot, Preferred_Date, Total_Price) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [Patient_Id, Booking_Date_Time, Booking_Status_Cd, Booking_Confirmed_Time_Slot, Preferred_Date, Total_Price], (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.status(201).json({ message: 'Booking created', Booking_Id: result.insertId });
    });
});

// Update a Booking
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { Patient_Id, Booking_Date_Time, Booking_Status_Cd, Booking_Confirmed_Time_Slot, Preferred_Date, Total_Price } = req.body;

    const sql = 'UPDATE `Booking` SET Patient_Id = ?, Booking_Date_Time = ?, Booking_Status_Cd = ?, Booking_Confirmed_Time_Slot = ?, Preferred_Date = ?, Total_Price = ? WHERE Booking_Id = ?';
    db.query(sql, [Patient_Id, Booking_Date_Time, Booking_Status_Cd, Booking_Confirmed_Time_Slot, Preferred_Date, Total_Price, id], (err, result) => {
        if (err) return res.status(500).send(err.message);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json({ message: 'Booking updated', affectedRows: result.affectedRows });
    });
});

// Delete a Booking
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM `Booking` WHERE Booking_Id = ?', [id], (err, result) => {
        if (err) return res.status(500).send(err.message);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json({ message: 'Booking deleted', affectedRows: result.affectedRows });
    });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Read All Booking Services
router.get('/', (req, res) => {
    db.query('SELECT * FROM `Booking_Services`', (err, results) => {
        if (err) return res.status(500).send(err.message);
        res.json(results);
    });
});

// Get a Booking Service by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM `Booking_Services` WHERE Booking_Service_Id = ?', [id], (err, result) => {
        if (err) return res.status(500).send(err.message);
        if (result.length === 0) {
            return res.status(404).json({ message: 'Booking Service not found' });
        }
        res.json(result[0]);
    });
});

// Create a New Booking Service
router.post('/', (req, res) => {
    const { Booking_Id, Service_Id, Service_Price_Cd, Assigned_Staff_Id, Booking_Service_Status_Cd, Status_Comments } = req.body;
    const sql = 'INSERT INTO `Booking_Services` (Booking_Id, Service_Id, Service_Price_Cd, Assigned_Staff_Id, Booking_Service_Status_Cd, Status_Comments) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [Booking_Id, Service_Id, Service_Price_Cd, Assigned_Staff_Id, Booking_Service_Status_Cd, Status_Comments], (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.status(201).json({ message: 'Booking Service created', Booking_Service_Id: result.insertId });
    });
});

// Update a Booking Service
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { Booking_Id, Service_Id, Service_Price_Cd, Assigned_Staff_Id, Booking_Service_Status_Cd, Status_Comments } = req.body;

    const sql = 'UPDATE `Booking_Services` SET Booking_Id = ?, Service_Id = ?, Service_Price_Cd = ?, Assigned_Staff_Id = ?, Booking_Service_Status_Cd = ?, Status_Comments = ? WHERE Booking_Service_Id = ?';
    db.query(sql, [Booking_Id, Service_Id, Service_Price_Cd, Assigned_Staff_Id, Booking_Service_Status_Cd, Status_Comments, id], (err, result) => {
        if (err) return res.status(500).send(err.message);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Booking Service not found' });
        }
        res.json({ message: 'Booking Service updated', affectedRows: result.affectedRows });
    });
});

// Delete a Booking Service
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM `Booking_Services` WHERE Booking_Service_Id = ?', [id], (err, result) => {
        if (err) return res.status(500).send(err.message);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Booking Service not found' });
        }
        res.json({ message: 'Booking Service deleted', affectedRows: result.affectedRows });
    });
});

module.exports = router;

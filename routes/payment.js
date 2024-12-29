const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all payments
router.get('/', (req, res) => {
    db.query('SELECT * FROM Payment', (err, results) => {
        if (err) return res.status(500).send(err.message);
        res.json(results);
    });
});

// Add a new payment
router.post('/', (req, res) => {
    const { Payment_Reference_Number, Booking_Id, Payment_Dt_Tm, Amount, Payment_Method, Payment_Status_Cd } = req.body;
    const sql = 'INSERT INTO Payment (Payment_Reference_Number, Booking_Id, Payment_Dt_Tm, Amount, Payment_Method, Payment_Status_Cd) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [Payment_Reference_Number, Booking_Id, Payment_Dt_Tm, Amount, Payment_Method, Payment_Status_Cd], (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.status(201).json({ message: 'Payment added', id: result.insertId });
    });
});

// Update a payment
router.put('/:id', (req, res) => {
    const { Payment_Reference_Number, Booking_Id, Payment_Dt_Tm, Amount, Payment_Method, Payment_Status_Cd } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE Payment SET Payment_Reference_Number = ?, Booking_Id = ?, Payment_Dt_Tm = ?, Amount = ?, Payment_Method = ?, Payment_Status_Cd = ? WHERE Payment_Id = ?';
    db.query(sql, [Payment_Reference_Number, Booking_Id, Payment_Dt_Tm, Amount, Payment_Method, Payment_Status_Cd, id], (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.json({ message: 'Payment updated', affectedRows: result.affectedRows });
    });
});

// Delete a payment
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Payment WHERE Payment_Id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.json({ message: 'Payment deleted', affectedRows: result.affectedRows });
    });
});

module.exports = router;

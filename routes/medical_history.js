const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all medical histories
router.get('/', (req, res) => {
    db.query('SELECT * FROM Medical_History', (err, results) => {
        if (err) return res.status(500).send(err.message);
        res.json(results);
    });
});

// Add a new medical history
router.post('/', (req, res) => {
    const { Med_Hist, Med_Hist_Diagnoses, Patient_Id, Update_Dt_Tm } = req.body;
    const sql = 'INSERT INTO Medical_History (Med_Hist, Med_Hist_Diagnoses, Patient_Id, Update_Dt_Tm) VALUES (?, ?, ?, ?)';
    db.query(sql, [Med_Hist, Med_Hist_Diagnoses, Patient_Id, Update_Dt_Tm], (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.status(201).json({ message: 'Medical history added', id: result.insertId });
    });
});

// Update a medical history
router.put('/:id', (req, res) => {
    const { Med_Hist, Med_Hist_Diagnoses, Patient_Id, Update_Dt_Tm } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE Medical_History SET Med_Hist = ?, Med_Hist_Diagnoses = ?, Patient_Id = ?, Update_Dt_Tm = ? WHERE Med_Hist_Id = ?';
    db.query(sql, [Med_Hist, Med_Hist_Diagnoses, Patient_Id, Update_Dt_Tm, id], (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.json({ message: 'Medical history updated', affectedRows: result.affectedRows });
    });
});

// Delete a medical history
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Medical_History WHERE Med_Hist_Id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.json({ message: 'Medical history deleted', affectedRows: result.affectedRows });
    });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all services
router.get('/', (req, res) => {
    db.query('SELECT * FROM Service', (err, results) => {
        if (err) return res.status(500).send(err.message);
        res.json(results);
    });
});

// Add a new service
router.post('/', (req, res) => {
    const { Service_Name, Description, Service_Cd, Department_Cd, Price_Cd, Required_Staff_Type_Cd, Is_Active } = req.body;
    const sql = 'INSERT INTO Service (Service_Name, Description, Service_Cd, Department_Cd, Price_Cd, Required_Staff_Type_Cd, Is_Active) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [Service_Name, Description, Service_Cd, Department_Cd, Price_Cd, Required_Staff_Type_Cd, Is_Active], (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.status(201).json({ message: 'Service added', id: result.insertId });
    });
});

// Update a service
router.put('/:id', (req, res) => {
    const { Service_Name, Description, Service_Cd, Department_Cd, Price_Cd, Required_Staff_Type_Cd, Is_Active } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE Service SET Service_Name = ?, Description = ?, Service_Cd = ?, Department_Cd = ?, Price_Cd = ?, Required_Staff_Type_Cd = ?, Is_Active = ? WHERE Service_Id = ?';
    db.query(sql, [Service_Name, Description, Service_Cd, Department_Cd, Price_Cd, Required_Staff_Type_Cd, Is_Active, id], (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.json({ message: 'Service updated', affectedRows: result.affectedRows });
    });
});

// Delete a service
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM Service WHERE Service_Id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err.message);
        res.json({ message: 'Service deleted', affectedRows: result.affectedRows });
    });
});

module.exports = router;

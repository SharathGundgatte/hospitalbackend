const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createPool({
    connectionLimit: 10, // Adjust pool size as needed
    host: 'in-mum-web1742.main-hosting.eu',
    user: 'u239606992_srradmin',
    password: 'Srradmin@12',
    database: 'u239606992_arogyabindu'
});

// Test the database connection
db.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        process.exit(1);
    } else {
        console.log('Database connected successfully');
        connection.release(); // Release the connection back to the pool
    }
});

module.exports = db;

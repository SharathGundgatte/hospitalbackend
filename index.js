const express = require('express');
const db = require('./config/database');
const app = express();
const cors = require('cors');

// Define allowed origins
const allowedOrigins = ['https://dashboard.arogyabindu.com'];

// CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests from the specified domains and requests without origin (for localhost development)
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define your routes
app.use('/patients', require('./routes/patients'));
app.use('/bookings', require('./routes/booking'));
app.use('/booking-services', require('./routes/booking_services'));
app.use('/client-hospitals', require('./routes/client_hospital'));
app.use('/department', require('./routes/department'));
app.use('/domain', require('./routes/domain'));
app.use('/medical-histories', require('./routes/medical_history'));
app.use('/payments', require('./routes/payment'));
app.use('/prices', require('./routes/price'));
app.use('/services', require('./routes/service'));
app.use('/staff', require('./routes/staff'));
app.use('/staff-availability', require('./routes/staffAvailability'));
app.use('/staff_types', require('./routes/staffType'));
app.use('/code', require('./routes/code'));

// Error handling for CORS-related issues
app.use((err, req, res, next) => {
  if (err && err.message === 'Not allowed by CORS') {
    return res.status(403).json({ error: 'CORS policy: Access denied' });
  }
  next(err);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
require('./database/collections/contractor');
require('./database/collections/worker');
require('./database/collections/job');
const contractorRoutes = require('./api/contractorRoutes');
const jobRoutes = require('./api/jobRoutes');
const workerRoutes = require('./api/workerRoutes');

const app = express();

const PORT = process.env.PORT || 5000;
const DATABASE = process.env.MONGODB_URI;

// Middleware
app.use(express.json());

app.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:3000', 'https://hire-portal-iota.vercel.app'];
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    // Set other CORS headers
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose.connect(DATABASE)
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));

const db = mongoose.connection;
// db.on('error', (error) => console.error(error));
// db.once('open', () => console.log('Connected to database'));

// Routes
app.get('/', (req, res) => {
    res.send('Hello World');
    });

app.use('/api/contractors', contractorRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/workers', workerRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });

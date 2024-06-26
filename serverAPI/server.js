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
const corsOptions = {
    origin: 'https://hire-portal-iota.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
    preflightContinue: false,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// Enable preflight requests for all routes
app.options('*', cors(corsOptions));
app.use(express.json());

  

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

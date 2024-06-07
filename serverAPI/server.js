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
const allowedOrigins = ['http://localhost:3000', 'https://hire-portal-iota.vercel.app'];

// Set up CORS options
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Enable if you need to send cookies or authentication headers
  allowedHeaders: 'Content-Type,Authorization'
};

app.use(cors(corsOptions));

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

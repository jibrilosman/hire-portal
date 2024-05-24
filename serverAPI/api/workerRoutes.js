const express = require('express');
const router = express.Router();
const Worker = require('../database/collections/worker');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');

// Register a new worker
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, skills } = req.body;
        if (!name || !email || !password || !skills) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if(password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        const existingWorker = await Worker.findOne({ email });
        if (existingWorker) {
            return res.status(400).json({ message: 'An account with this email already exists' });
        }

        const hashedPassword = await hashPassword(password);
        const worker = new Worker({
            name,
            email,
            password: hashedPassword,
            skills,
        });

        await worker.save();
        res.status(201).json({ message: 'Account created successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
});

// Login a worker
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if the worker exists
        const worker = await Worker.findOne({ email });
        if (!worker) {
            return res.status(400).json({ message: 'User not found' });
        }
        // Check if the password is correct
        const isMatch = await comparePassword(password, worker.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create a token
        const payload = {
            id: worker._id,
            name: worker.name,
            email: worker.email,
            skills: worker.skills,
            role: worker.role,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token);
        res.json({message: 'Login successful', token, id: worker._id});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get worker dashboard
router.get(':id/dashboard', async (req, res) => {
    try {
        const worker = await Worker.findById(req.params.id).populate('appliedJobs');
        if (!worker) {
            return res.status(404).json({ message: 'Worker not found' });
        }
        res.json(worker);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get all workers
router.get('/', async (req, res) => {
    try {
        const workers = await Worker.find();
        res.json(workers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// get all jobs applied by a worker
router.get('/worker/:workerId', async (req, res) => {
    try {
        const worker = await Worker.findById(req.params.workerId).populate('appliedJobs');
        if (!worker) {
            return res.status(404).json({ message: 'Worker not found' });
        }
        res.json(worker.appliedJobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
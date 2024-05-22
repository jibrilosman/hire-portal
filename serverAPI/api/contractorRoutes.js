const express = require('express');
const router = express.Router();
const Contractor = require('../database/collections/contractor');
const Job = require('../database/collections/job');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');


// Register a new contractor
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, companyName, companyAddress, companyPhone, companyInterests } = req.body;
        if (!name || !email || !password || !companyName || !companyAddress || !companyPhone || !companyInterests) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if(password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        const existingContractor = await Contractor.findOne({ email });
        if (existingContractor) {
            return res.status(400).json({ message: 'An account with this email already exists' });
        }

        const hashedPassword = await hashPassword(password);
        const contractor = new Contractor({
            name,
            email,
            password: hashedPassword,
            companyName,
            companyAddress,
            companyPhone,
            companyInterests,
        });

        await contractor.save();
        res.status(201).json({ message: 'Account created successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
});

// Login a contractor
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if the contractor exists
        const contractor = await Contractor.findOne({ email });
        if (!contractor) {
            return res.status(400).json({ message: 'User not found' });
        }
        // Check if the password is correct
        const isMatch = await comparePassword(password, contractor.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Create a token
        const payload = {
            id: contractor._id,
            name: contractor.name,
            email: contractor.email,
            companyName: contractor.companyName,
            companyAddress: contractor.companyAddress,
            companyPhone: contractor.companyPhone,
            companyInterests: contractor.companyInterests,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
        // Send token in cookie
        res.cookie('token', token);

        res.json({ message: 'Login successful', token, id: contractor._id});

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// Logout a contractor
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out' });
});

// get contractor dashboard
router.get('/:id/dashboard', async (req, res) => {
    try {
        const constractor = await Contractor.findById(req.params.id).populate('jobs');
        res.json(constractor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// add a job
router.post('/:id/jobs', async (req, res) => {
    try {
        const contractor = await Contractor.findById(req.params.id);
        const job = new Job(req.body);
        await job.save();
        contractor.jobs.push(job);
        await contractor.save();
        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Modify a job
router.put('/jobs/:jobId', async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.jobId, req.body, { new: true });
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a job
router.delete('/jobs/:jobId', async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.jobId);
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get all jobs
// router.get('/jobs', async (req, res) => {
//     try {
//         const jobs = await Job.find();
//         res.json(jobs);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });




router.get('/profile',  (req, res) => {
    const {token} = req.cookies;
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, result) => {
            if(err) {
                return res.status(403).json({message: 'Unauthorized'});
            }
            res.json(result);
        });
    }
} );
    


module.exports = router;
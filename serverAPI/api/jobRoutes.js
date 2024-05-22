const express = require('express');
const router = express.Router();
const Job = require('../database/collections/job');


// Get all jobs
router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a job
router.get('/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;

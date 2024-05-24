const express = require('express');
const router = express.Router();
const Job = require('../database/collections/job');
const Worker = require('../database/collections/worker');


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
        const job = await Job.findById(req.params.id).populate('contractor');
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Apply to a job
router.post('/:jobId/apply', async (req, res) => {
    try {
        const worker = await Worker.findById(req.body.workerId);
        const job = await Job.findById(req.params.jobId);
        if (!worker || !job) {
            return res.status(404).json({ message: 'Worker or job not found' });
        }
        if(!job.applicants.includes(worker._id)) {
            job.applicants.push(worker._id);
            worker.appliedJobs.push(job._id);
            await job.save();
            await worker.save();
        }
        res.json({ message: 'Applied successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
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

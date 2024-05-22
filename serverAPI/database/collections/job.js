const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    skills: [String],
    contractor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contractor',
    },
    applicants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Applicant',
    }],
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
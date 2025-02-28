const Job = require('../models/jobModel');

// Get all jobs
exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json({
            status: 'success',
            results: jobs.length,
            data: {
                jobs
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Get a single job by ID
exports.getJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({
                status: 'fail',
                message: 'No job found with that ID'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                job
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Create a new job
exports.createJob = async (req, res) => {
    try {
        const newJob = await Job.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                job: newJob
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Update a job by ID
exports.updateJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!job) {
            return res.status(404).json({
                status: 'fail',
                message: 'No job found with that ID'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                job
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Delete a job by ID
exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) {
            return res.status(404).json({
                status: 'fail',
                message: 'No job found with that ID'
            });
        }
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};
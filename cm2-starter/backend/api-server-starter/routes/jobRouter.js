const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");

// Define routes
router.get("/", jobController.getAllJobs); // Example route
router.post("/", jobController.createJob); // Example route

module.exports = router;
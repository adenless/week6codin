import express from 'express';
import {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} from '../controllers/jobControllers.js';

const router = express.Router();

// Define routes
router.get('/', getAllJobs); // GET /api/jobs
router.get('/:id', getJobById); // GET /api/jobs/:id
router.post('/', createJob); // POST /api/jobs
router.put('/:id', updateJob); // PUT /api/jobs/:id
router.delete('/:id', deleteJob); // DELETE /api/jobs/:id

// Export the router
export default router;
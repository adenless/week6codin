import express from 'express';
import {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} from '../controllers/jobControllers.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Define routes
router.get('/', getAllJobs); // GET /api/jobs
router.get('/:id', getJobById); // GET /api/jobs/:id
router.post('/', authMiddleware, createJob); // POST /api/jobs (protected)
router.put('/:id', authMiddleware, updateJob); // PUT /api/jobs/:id (protected)
router.delete('/:id', authMiddleware, deleteJob); // DELETE /api/jobs/:id (protected)

export default router;
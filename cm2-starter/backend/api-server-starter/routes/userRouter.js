import express from 'express';
import { getAllUsers, createUser, updateUser, deleteUser } from '../controllers/userControllers.js';

const router = express.Router();

// Define routes
router.get('/', getAllUsers); // GET /api/users
router.post('/', createUser); // POST /api/users
router.put('/:id', updateUser); // PUT /api/users/:id
router.delete('/:id', deleteUser); // DELETE /api/users/:id

export default router;

import { Router } from 'express';
import { getAllUsers, getUserById } from '../controllers/usersController.js';

const router = Router();

// define the routes
// GET /api/users/
router.get('/', getAllUsers);
// GET /api/users/
router.get('/:id', getUserById);

// POST /api/users/
// uses the 'isAdmin' middleware first

export default router;

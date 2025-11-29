import { Router } from 'express';
import { signIn, signUp, getCurrentUser, userLogOut } from '../controllers/authController.js';
import { checkAuth } from '../middleware/authMiddleware.js';

const router = Router();

// define the routes
// POST /api/auth/
router.post('/signin', signIn);
// POST /api/auth/
router.post('/signup', signUp);

router.get('/me', checkAuth, getCurrentUser)

router.get('/logout', userLogOut)

export default router;
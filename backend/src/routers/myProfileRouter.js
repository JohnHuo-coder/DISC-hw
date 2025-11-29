import { Router } from 'express';
import { getMyProfile, editMyProfile } from '../controllers/myProfileController.js';
import { checkAuth } from '../middleware/authMiddleware.js';

const router = Router();

// define the routes
// GET /api/mypfoile/
router.get('/', checkAuth, getMyProfile);
// GET /api/myprofile/
router.put('/edit', checkAuth, editMyProfile);


export default router;

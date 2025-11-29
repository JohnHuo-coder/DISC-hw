import { Router } from 'express';
import {getAllPosts, postNewPost, getPostById} from '../controllers/postsController.js';
import { checkAuth } from '../middleware/authMiddleware.js';

const router = Router();

// define the routes
// GET /api/posts/
router.get('/', getAllPosts);
// GET /api/posts/:id
router.get('/:id', getPostById);
// POST /api/posts/post
router.post('/post', checkAuth, postNewPost);


export default router;
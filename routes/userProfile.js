import express from 'express';
import { getUserProfile } from '../controllers/getUserProfile.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

/**
 * @openapi
 * '/profile':
 *  get:
 *    tags:
 *      - User
 *    summary: Get user profile. Authorization is required.
 *    responses:
 *      200:
 *        description: Ok
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Internal server error
 * */


router.use(requireAuth);
router.get('/', getUserProfile);

export default router;

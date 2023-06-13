const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/getUserProfile');
const { requireAuth } = require('../middleware/requireAuth');

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

module.exports = router;
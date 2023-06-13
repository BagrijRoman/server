const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/loginController');

/**
 * @openapi
 * '/login':
 *  post:
 *    tags:
 *      - Auth
 *    summary: Login user with credentials
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/LoginUserInput'
 *    responses:
 *      200:
 *        description: OK
 *      403:
 *        description: Already logged in
 *      422:
 *        description: Invalid auth data provided
 *      500:
 *        description: Internal server error
 * */

router.post('/', loginUser);

module.exports = router;
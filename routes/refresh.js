const express = require('express');
const router = express.Router();
const { handleRefreshTokens } = require('../controllers/refreshTokensController');

/**
 * @openapi
 * '/refresh':
 *    post:
 *      tags:
 *        - Auth
 *      summary: Refresh user tokens
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RefreshTokensInput'
 *      responses:
 *        200:
 *          description: Ok
 *        401:
 *          description: Invalid refresh token provided
 *        500:
 *          description: Internal server error
 * */

router.get('/', handleRefreshTokens);

module.exports = router;
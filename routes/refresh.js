import express from 'express';
import { handleRefreshTokens } from '../controllers/refreshTokensController.js';

const router = express.Router();

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

export default router;
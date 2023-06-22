import express from 'express';
import { registerNewUser } from '../controllers/registerController.js';

const router = express.Router();

/**
 * @openapi
 * '/register':
 *  post:
 *    tags:
 *      - Auth
 *    summary: Register new user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CreateUserInput'
 *    responses:
 *      201:
 *        description: Success. User record created
 *      409:
 *        description: Email already in use
 *      500:
 *        description: Internal server error
 * */

router.post('/', registerNewUser);

export default router;

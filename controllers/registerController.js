import bcrypt from 'bcrypt';

import { handleApiError } from '../helpers/handleApiError.js';
import { STATUS_CODES } from '../const/responseStatusCodes.js';
import { validateRegistrationInput } from '../helpers/inputValidator.js';
import { Users } from '../models/Users.js';
import { generateTokens } from '../helpers/tokenHelper.js';

/**
 * @openapi
 *  components:
 *    schemas:
 *      CreateUserInput:
 *        required:
 *          - email
 *          - name
 *          - password
 *        properties:
 *          email:
 *            type: string
 *            default: testUser@gmail.com
 *          userName:
 *            type: string
 *            default: TestUser1
 *          password:
 *            type: string
 *            default: qweqweqwe
 * */

export const registerNewUser = async (req, res) => {
  try {
    if (req.user) {
       return handleApiError(res, STATUS_CODES.FORBIDDEN, { err: 'user already logged in' });
    }

   const isDataValid = await validateRegistrationInput(req.body);

    if (!isDataValid) {
      return handleApiError(res, STATUS_CODES.UNPROCESSABLE_ENTITY, { err: 'Invalid input data' });
    }

    const { email, password, userName } = req.body;
    const existingUser = await Users.findOne({ email });

    if (existingUser) {
      return handleApiError(res, STATUS_CODES.CONFLICT, { err: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Users.create({
      userName,
      email,
      password: hashedPassword
    });

    const newUserRec = await Users.findOne({ email }, { password : 0 });
    const { accessToken, refreshToken } = generateTokens({ userId: newUserRec._id, email });
    
    return res.status(STATUS_CODES.CREATED).json({
      status: 'OK',
      user: newUserRec,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    handleApiError(res, STATUS_CODES.INTERNAL_SERVER_ERROR, { err: err.toString() });
  }
};

import  bcrypt from 'bcrypt';

import { handleApiError } from '../helpers/handleApiError.js';
import { STATUS_CODES } from '../const/responseStatusCodes.js';
import { validateLoginInput } from '../helpers/inputValidator.js';
import { Users } from '../models/Users.js';
import { generateTokens } from '../helpers/tokenHelper.js';

/**
 * @openapi
 *  components:
 *    schemas:
 *      LoginUserInput:
 *        required:
 *          - email
 *          - password
 *        properties:
 *          email:
 *            type: string
 *            default: testUser@gmail.com
 *          password:
 *            type: string
 *            default: qweqweqwe
 * */

export const loginUser = async (req, res) => {
  try {
    if (req.user) {
      return handleApiError(res, STATUS_CODES.FORBIDDEN, { err: 'User already logged in' });
    }

    const isDataValid = await validateLoginInput(req.body);

    if (!isDataValid) {
      return handleApiError(res, STATUS_CODES.UNPROCESSABLE_ENTITY, { err: 'Invalid input data' });
    }

    const { email, password } = req.body;
    const userData = await Users.findOne({ email, deleted: false });

    if (!userData) {
      return handleApiError(res, STATUS_CODES.UNPROCESSABLE_ENTITY, { err: 'Invalid credentials' });
    }

    const { password: DbPassword, ...restUserData  } = userData._doc;
    const match = await bcrypt.compare(password, DbPassword);

    if (!match) {
      return handleApiError(res, STATUS_CODES.UNPROCESSABLE_ENTITY, { err: 'Invalid credentials' });
    }

    const tokens = await generateTokens({ userId: restUserData._id, email });

    return res.status(STATUS_CODES.OK).json({
      ...tokens,
      user: restUserData
    });
  } catch (err) {
    handleApiError(res, STATUS_CODES.INTERNAL_SERVER_ERROR, { err: err.toString() });
  }
};

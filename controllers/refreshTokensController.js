import { handleApiError } from '../helpers/handleApiError.js';
import { STATUS_CODES } from '../const/responseStatusCodes.js';
import { verifyRefreshToken, generateTokens } from '../helpers/tokenHelper.js';
import { Users } from '../models/Users.js';

/**
 * @openapi
 * components:
 *  schemas:
 *    RefreshTokensInput:
 *      required:
 *        - refreshToken
 *      properties:
 *        refreshToken:
 *          type: string
 *          default: refresh_token_value
 * */

export const handleRefreshTokens = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return handleApiError(res, STATUS_CODES.UNAUTHORIZED, { err: 'Authorization is required' });
    }

    let decoded;
    
    try {
      decoded = await verifyRefreshToken(refreshToken);
    } catch (err) {
      return handleApiError(res, STATUS_CODES.UNAUTHORIZED, { err: 'Authorization is required' });
    }

    const { userId, email } = decoded;
    const userRecord = await Users.findOne({ _id: userId, email, deleted: false }, { password : 0 });

    if (!userRecord) {
      return handleApiError(res, STATUS_CODES.UNAUTHORIZED, { err: 'User not found' });
    }

    const updatedTokens = generateTokens({ userId: userRecord._id, email });

    return res.status(STATUS_CODES.OK).json({
      status: 'OK',
      user: userRecord,
      ...updatedTokens,
    });
  } catch (err) {
    handleApiError(res, STATUS_CODES.INTERNAL_SERVER_ERROR, { err: err.toString() });
  }
};

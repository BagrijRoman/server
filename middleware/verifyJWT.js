import { handleApiError } from '../helpers/handleApiError.js';
import { STATUS_CODES } from '../const/responseStatusCodes.js';
import { verifyAccessToken } from '../helpers/tokenHelper.js';
import { Users } from '../models/Users.js';

export const verifyJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      console.log('No auth header provided');

      req.user = null;
      return next();
    }

    const token = authHeader.split(' ')[1];
    let decoded

    try {
      decoded = await verifyAccessToken(token);
    } catch (err) {
      // todo logger
      return handleApiError(res, STATUS_CODES.UNAUTHORIZED, { err: 'Authorization is required' });
    }

    const { userId, email } = decoded;

    req.user = await Users.findOne({ _id: userId, email, deleted: false }, { password : 0 });
    next();
  } catch (err) {
    return handleApiError(res, STATUS_CODES.INTERNAL_SERVER_ERROR, { err: err.toString() });
  }
}

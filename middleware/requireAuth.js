import { handleApiError } from '../helpers/handleApiError.js';
import { STATUS_CODES } from '../const/responseStatusCodes.js';

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const { user } = req;

  if (!authHeader || !user) {
    return handleApiError(res, STATUS_CODES.UNAUTHORIZED, { err: 'Authorization is required' });
  } 

  next();
};

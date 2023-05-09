const { handleApiError } = require('../helpers/hadleApiError');
const { STATUS_CODES } = require('../const/responseStatusCodes');

const requireAuth = (req, res, next) => {
  const authHeader = req.headers['Authorization'];
  const { user } = req;
  
  if (!authHeader || !user) {
    return handleApiError(res, STATUS_CODES.UNAUTHORIZED, { err: 'Authorization is required' });
  } 

  next();
};

module.exports = {
  requireAuth,
};

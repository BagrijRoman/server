const { handleApiError } = require('../helpers/hadleApiError');
const { STATUS_CODES } = require('../const/responseStatusCodes');
const { tokenHelper } = require('../helpers/tokenHelper');
const { Users } = require('../models/Users');

const handleRefreshTokens = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return handleApiError(res, STATUS_CODES.UNAUTHORIZED, { err: 'Authorization is required' });
    }

    let decoded;
    
    try {
      decoded = await tokenHelper.verifyRefreshToken(refreshToken);
    } catch (err) {
      return handleApiError(res, STATUS_CODES.UNAUTHORIZED, { err: 'Authorization is required' });
    }

    const { userId, email } = decoded;
    const userRecord = await Users.findOne({ _id: userId, email, deleted: false }, { password : 0 });

    if (!userRecord) {
      return handleApiError(res, STATUS_CODES.UNAUTHORIZED, { err: 'User not found' });
    }

    const updatedTokens = tokenHelper.generateTokens({ userId: userRecord._id, email });

    return res.status(STATUS_CODES.OK).json({
      status: 'OK',
      user: userRecord,
      ...updatedTokens,
    });
  } catch (err) {
    handleApiError(res, STATUS_CODES.INTERNAL_SERVER_ERROR, { err: err.toString() });
  }
};

module.exports = { handleRefreshTokens };

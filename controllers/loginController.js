const bcrypt = require('bcrypt');

const { handleApiError } = require('../helpers/hadleApiError');
const { STATUS_CODES } = require('../const/responseStatusCodes');
const inputValidator = require('../helpers/inputValidator');
const { Users } = require('../models/Users');
const { tokenHelper } = require('../helpers/tokenHelper');


const loginUser = async (req, res) => {
  try {
    if (req.user) {
      return handleApiError(res, STATUS_CODES.FORBIDDEN, { err: 'User already logged in' });
    }

    const isDataValid = await inputValidator.validateLoginInput(req.body);

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

    const tokens = await tokenHelper.generateTokens({ userId: restUserData._id, email });

    return res.status(STATUS_CODES.OK).json({
      ...tokens,
      user: restUserData
    });
  } catch (err) {
    handleApiError(res, STATUS_CODES.INTERNAL_SERVER_ERROR, { err: err.toString() });
  }
};

module.exports = { loginUser };

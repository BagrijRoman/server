const bcrypt = require('bcrypt');

const { handleApiError } = require('../helpers/hadleApiError');
const { STATUS_CODES } = require('../const/responseStatusCodes');
const inputValidator = require('../helpers/inputValidator');
const { Users } = require('../models/Users');
const { tokenHelper } = require('../helpers/tokenHelper');

const registerNewUser = async (req, res) => {
  try {
    if (req.user) {
       return handleApiError(res, STATUS_CODES.FORBIDDEN, { err: 'user already logged in' });
    }

   const isDataValid = await inputValidator.validateRegistrationInput(req.body);

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
    const { accessToken, refreshToken } = tokenHelper.generateTokens({ userId: newUserRec._id, email });
    
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

module.exports = { registerNewUser };

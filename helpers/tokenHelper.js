const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_LIFETIME = process.env.ACCESS_TOKEN_LIFETIME || '3m';
const REFRESH_TOKEN_LIFETIME = process.env.REFRESH_TOKEN_LIFETIME || '3d';

const generateTokens = (tokenData) => ({
  accessToken: jwt.sign(
    tokenData,
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: ACCESS_TOKEN_LIFETIME }
  ),
  refreshToken: jwt.sign(
    tokenData,
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: REFRESH_TOKEN_LIFETIME }
  ),
});

const verifyAccessToken = async (token) => jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

const verifyRefreshToken = async (token) => jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

tokenHelper = {
  generateTokens,
  verifyAccessToken,
  verifyRefreshToken,
}

module.exports = {
  tokenHelper,
};

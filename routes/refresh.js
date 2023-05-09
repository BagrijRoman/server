const express = require('express');
const router = express.Router();
const { handleRefreshTokens } = require('../controllers/refreshTokensController');

router.get('/', handleRefreshTokens);

module.exports = router;
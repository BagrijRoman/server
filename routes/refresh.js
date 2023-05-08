const express = require('express');
const router = express.Router();
const { handleRefreshTokens } = require('../controllers/refreshTokensController');

router.post('/', handleRefreshTokens);

module.exports = router;
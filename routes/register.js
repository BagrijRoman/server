const express = require('express');
const router = express.Router();
const { registerNewUser } = require('../controllers/registerController');
const { requireAuth } = require('../middleware/requireAuth');

router.post('/', registerNewUser);

module.exports = router;
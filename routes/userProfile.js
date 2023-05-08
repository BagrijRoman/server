const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/getUserProfile');
const { requireAuth } = require('../middleware/requireAuth');

router.use(requireAuth);
router.get('/', getUserProfile);

module.exports = router;
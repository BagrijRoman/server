const express = require('express');
const router = express.Router();

/**
* @openapi
* /test:
*   get:
*     description: Responds "OK" if app is up and running
*     responses:
*       200:
*         description: App is up and running
* */

router.all('/', (req, res) => {
  res.json({ ServerStatus: "Ok" })
});

module.exports = router;

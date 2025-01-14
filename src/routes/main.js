//login 이후 main Router
// Cookie-Check always
const express = require('express');
const router = express.Router();
const cookieChecker = require('../controllers/cookieChecker');

router.get('/', cookieChecker.Check);

module.exports = router;
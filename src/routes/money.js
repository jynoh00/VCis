// /money/
const express = require('express');
const router = express.Router();
const cookieChecker = require('../controllers/cookieChecker');
const { dailyMoneyGet, dailyCheck } = require('../controllers/moneyController');

// COOKIECHECKER에 허용 라우팅 추가하기 *******
router.post('/getmoney', cookieChecker.Check, dailyMoneyGet);
router.get('/getmoney', cookieChecker.Check, dailyCheck);

module.exports = router;
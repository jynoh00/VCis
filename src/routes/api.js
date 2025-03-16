const express = require('express');
const router = express.Router();
const cookieChecker = require('../controllers/cookieChecker');


// COOKIE_CHECKER 허용 ROUTE 추가 *****
router.get('/dailymoney', cookieChecker.Check, (req, res) => {
    
});

module.exports = router;
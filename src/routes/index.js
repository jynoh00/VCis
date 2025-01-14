const express = require('express');
const router = express.Router();
const cookieChecker = require('../controllers/cookieChecker');

router.get('/', (req, res) => {
    console.log('index.js Router run : intro.ejs render');
    res.render('intro');
});

router.get('/login', cookieChecker.Check);
router.get('/signup', (req, res) => {
    console.log('index.js Router run : signup.ejs render');
    res.render('signup');
});

module.exports = router;
const express = require('express');
const router = express.Router();

const { signup, signin, logout, withdraw } = require('../controllers/usersController');

router.post('/signup', signup); // /users/signup
router.post('/signin', signin); // /users/signin
router.get('/logout', logout); // /users/logout
router.get('/withdraw', withdraw); // /users/withdraw

module.exports = router;
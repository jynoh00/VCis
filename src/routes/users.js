// /users/

const express = require('express');
const router = express.Router();

const { signup, signin, logout, withdraw } = require('../controllers/usersController');
const { changeName, changeExplain, changeProfile, changeMode, changePw} = require('../controllers/changeController');

router.post('/signup', signup); // /users/signup
router.post('/signin', signin); // /users/signin
router.get('/logout', logout); // /users/logout
router.post('/withdraw', withdraw); // /users/withdraw
router.post('/changename', changeName);
router.post('/changeexplain', changeExplain);
router.get('/changeprofile', changeProfile); // /users/changeprofile
router.post('/changemode', changeMode);
router.post('/changepw', changePw);

module.exports = router;
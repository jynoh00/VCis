// /main/
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const cookieChecker = require('../controllers/cookieChecker');
const changeController = require('../controllers/changeController');
const USER_COOKIE_KEY = 'USER';

const dailyMoneyTemplate = fs.readFileSync(path.join(__dirname, '../../templates/dailyMoney.html'), 'utf-8');
const myWalletTemplate = fs.readFileSync(path.join(__dirname, '../../templates/myWallet.html'), 'utf-8');
const mainTemplate = fs.readFileSync(path.join(__dirname, '../../templates/main.html'), 'utf-8');
const tradingTemplate = fs.readFileSync(path.join(__dirname, '../../templates/trading.html'), 'utf-8');
const withdrawTemplate = fs.readFileSync(path.join(__dirname, '../../templates/withdraw.html'), 'utf-8');
const myPageTemplate = fs.readFileSync(path.join(__dirname, '../../templates/mypage.html'), 'utf-8');
const changeProfileTemplate = fs.readFileSync(path.join(__dirname, '../../templates/changeProfile.html'), 'utf-8');
const rankingTemplate = fs.readFileSync(path.join(__dirname, '../../templates/ranking.html'), 'utf-8');

router.get('/', cookieChecker.Check, (req, res) => {
    const userCookie = req.cookies[USER_COOKIE_KEY];

    res.render('main', {
        currentPage: 'main',
        userName: JSON.parse(userCookie).userName,
        money: JSON.parse(userCookie).money,
        darkMode: JSON.parse(userCookie).dark,
        template: mainTemplate,
    });
});

router.get('/dailymoney', cookieChecker.Check, (req,res) => {
    const userCookie = req.cookies[USER_COOKIE_KEY];

    res.render('main', {
        currentPage: 'dailymoney',
        userName: JSON.parse(userCookie).userName,
        money: JSON.parse(userCookie).money,
        darkMode: JSON.parse(userCookie).dark,
        template: dailyMoneyTemplate,
    });
});

router.get('/mywallet', cookieChecker.Check, (req, res) => {
    const userCookie = req.cookies[USER_COOKIE_KEY];

    res.render('main', {
        currentPage: 'mywallet',
        userName: JSON.parse(userCookie).userName,
        money: JSON.parse(userCookie).money,
        darkMode: JSON.parse(userCookie).dark,
        template: myWalletTemplate,
    });
});

router.get('/trading', cookieChecker.Check, (req, res) => {
    const userCookie = req.cookies[USER_COOKIE_KEY];

    res.render('main', {
        currentPage: 'trading',
        userName: JSON.parse(userCookie).userName,
        money: JSON.parse(userCookie).money,
        darkMode: JSON.parse(userCookie).dark,
        template: tradingTemplate,
    });
});

router.get('/withdraw', cookieChecker.Check, (req, res) => {
    const userCookie = req.cookies[USER_COOKIE_KEY];

    res.render('withdraw', {
        currentPage: 'withdraw',
        userName: JSON.parse(userCookie).userName,
        userId: JSON.parse(userCookie).userId,
        money: JSON.parse(userCookie).money,
        darkMode: JSON.parse(userCookie).dark,
        template: withdrawTemplate,
    });
});

router.get('/mypage', cookieChecker.Check, changeController.tmpClear, (req, res) => {
    const userCookie = req.cookies[USER_COOKIE_KEY];

    res.render('myPage', {
        currentPage: 'mypage',
        userImg: JSON.parse(userCookie).userImg,
        userId: JSON.parse(userCookie).userId,
        userName: JSON.parse(userCookie).userName,
        userExplain: JSON.parse(userCookie).userExplain,
        money: JSON.parse(userCookie).money,
        darkMode: JSON.parse(userCookie).dark,
        template: myPageTemplate,
    });
});

router.get('/changeprofile', cookieChecker.Check, changeController.tmpClear, (req, res) => {
    const userCookie = req.cookies[USER_COOKIE_KEY];

    res.render('changeProfile', {
        currentPage: 'changeprofile',
        userImg: JSON.parse(userCookie).userImg,
        userId: JSON.parse(userCookie).userId,
        userName: JSON.parse(userCookie).userName,
        userExplain: JSON.parse(userCookie).userExplain,
        money: JSON.parse(userCookie).money,
        darkMode: JSON.parse(userCookie).dark,
        template: changeProfileTemplate,
    });
});

router.get('/ranking', cookieChecker.Check, changeController.tmpClear, (req, res) => {
    const userCookie = req.cookies[USER_COOKIE_KEY];

    res.render('main', {
        currentPage: 'ranking',
        userImg: JSON.parse(userCookie).userImg,
        userId: JSON.parse(userCookie).userId,
        userName: JSON.parse(userCookie).userName,
        userExplain: JSON.parse(userCookie).userExplain,
        money: JSON.parse(userCookie).money,
        darkMode: JSON.parse(userCookie).dark,
        template: rankingTemplate,
    });
});

module.exports = router;
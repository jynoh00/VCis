const userService = require('../services/userService');
const USER_COOKIE_KEY = 'USER';

exports.Check = async (req, res, next) => {
    console.log('cookieChecker.js Controller run');
    const userCookie = req.cookies[USER_COOKIE_KEY];
    console.log('userCookie : ' + userCookie);
    if (!userCookie){ // Cookie가 없을 경우
        console.log(': login.ejs render');
        if (req.path === '/login'){
            return res.render('login');
        }else{
            return res.redirect('/login');
        }
    }

    let userData;
    try{
        userData = JSON.parse(userCookie);
    }catch(error){ // Cookie JSON 변환 실패
        console.error('Invalid cookie: ', error);
        console.log(': /login redirect');
        res.clearCookie(USER_COOKIE_KEY); // Cookie 제거
        if (req.path === '/login'){
            return res.render('login');
        }else{
            return res.redirect('/login');
        }
    }

    const user = await userService.fetchUser(userData.userId);

    if (!user){
        console.log(': /login redirect');
        res.clearCookie(USER_COOKIE_KEY);
        if (req.path === '/login'){
            return res.render('login');
        }else{
            return res.redirect('/login');
        }
    }

    console.log(': Valid user, proceeding...');
    if (req.originalUrl === '/main'){
        return res.render('main', {
            userId: JSON.parse(userCookie).userId,
            money: JSON.parse(userCookie).money,
        });
    }else return res.redirect('/main');
};
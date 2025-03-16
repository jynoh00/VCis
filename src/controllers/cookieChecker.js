const userService = require('../services/userService');
const USER_COOKIE_KEY = 'USER';
const maindirectory = ['/main', '/main/dailymoney', '/main/mywallet', '/main/trading', 
                        '/main/withdraw', '/main/mypage', '/money/getmoney', '/main/changeprofile', '/main/ranking'];

exports.Check = async (req, res, next) => {
    console.log('cookieChecker.js Controller run');
    const userCookie = req.cookies[USER_COOKIE_KEY];
    console.log('userCookie : ' + userCookie);

    if (!userCookie){
        if (req.path === '/signup'){
            console.log('signup.ejs render');
            return next();
        }

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
    }catch(error){ 
        console.error('Invalid cookie: ', error);
        console.log(': /login redirect');
        res.clearCookie(USER_COOKIE_KEY); 
        if (req.path === '/signup'){
            console.log('signup.ejs render');
            return next();
        }

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

        if (req.path === '/signup'){
            console.log('signup.ejs render');
            return next();
        }

        if (req.path === '/login'){
            return res.render('login');
        }else{
            return res.redirect('/login');
        }
    }

    console.log(': Valid user, proceeding...');
    
    if (maindirectory.indexOf(req.originalUrl) > -1){
        return next();
    }else return res.redirect('/main');
};
const userService = require('../services/userService');
const USER_COOKIE_KEY = 'USER';

// post
exports.dailyMoneyGet = async (req, res) => {
    console.log('dailyMoneyGet() run');
    const userCookie = JSON.parse(req.cookies[USER_COOKIE_KEY]);

    if (!userCookie){
        console.log('not have cookie');
        return res.redirect('/login');
    }
    if (userCookie.daily){
        updatedUser = await userService.updateUser(userCookie.userId, {
            money: userCookie.money + 1000000,
            daily: false,
        });

        res.cookie(USER_COOKIE_KEY, JSON.stringify(updatedUser));
    }

    return res.redirect('/main/dailymoney');
};

// get
exports.dailyCheck = async (req, res) => {
    console.log('dailyCHeck() run');
    const userCookie = JSON.parse(req.cookies[USER_COOKIE_KEY]);

    if (!userCookie){
        console.log('not have cookie');
        return res.json({redirect: '/login'});
    }

    console.log(userCookie);
    console.log(userCookie.daily);

    return res.json({daily: userCookie.daily});
};
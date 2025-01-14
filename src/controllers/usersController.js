const userService = require('../services/userService');
const USER_COOKIE_KEY = 'USER';

exports.signup = async (req, res) => {
    console.log('usersController.js .signup run');
    const { userId, userPw, userPwCheck } = req.body;
    const user = await userService.fetchUser(userId);

    if (user){ // id 중복
        console.log(': dupulication ID');
        return res.json({
            result_message: '이미 사용 중인 아이디입니다.',
            pw_message: '',
        });
    }

    if (!((userId.length >= 8) && (userId.length <= 12))){ // id 글자 수
        console.log(': ID character count conditions not met');
        return res.json({
            result_message: '8글자 이상 12글자 이하로 아이디를 입력해주세요.',
            pw_message: '',
        });   
    }

    if (!((userPw.length >= 12) && (userPw.length <= 16))){ // pw 글자 수
        console.log(': PW character count conditions not met');
        return res.json({
            result_message: '',
            pw_message: '12글자 이상 16글자 이하로 비밀번호를 입력해주세요.',
        });
    }

    if (userPw !== userPwCheck){ // Pw 불일치
        console.log(': PW Verification failed');
        return res.json({
            result_message: '',
            pw_message: '비밀번호가 일치하지 않습니다.',
        });
    }

    const newUser = {
        userId,
        userPw,
        money: 0,
    };

    await userService.createUser(newUser);
    console.log(': A new user has been created.');

    res.cookie(USER_COOKIE_KEY, JSON.stringify(newUser));
    return res.json({
        redirect: '/login',
    });
};

exports.signin = async (req, res) => { // login
    console.log('signin 실행');
    const { userId, userPw } = req.body;
    console.log('id: ', userId, 'pw: ', userPw);
    const check = await userService.checkUser(userId, userPw);
    if (check){
        console.log('있는 유저');
        const user = await userService.fetchUser(userId);
        res.cookie(USER_COOKIE_KEY, JSON.stringify(user));
        
        return res.redirect('/main');
    }
    console.log('없는 유저');
    res.redirect('/login'); // /main해도 똑같음.
};

exports.logout = (req, res) => {
    res.clearCookie(USER_COOKIE_KEY);
    res.redirect('/login');
};

exports.withdraw = async (req, res) => {
    const userCookie = req.cookies[USER_COOKIE_KEY];
    if (!userCookie) return res.redirect('/login');

    const user = JSON.parse(userCookie);
    await userService.removeUser(user.userId, user.password);
    res.clearCookie(USER_COOKIE_KEY);
    res.redirect('/');
};

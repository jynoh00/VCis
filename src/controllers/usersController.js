const userService = require('../services/userService');
const USER_COOKIE_KEY = 'USER';

exports.signup = async (req, res) => {
    console.log('usersController.js .signup run');
    const { userId, userPw, userPwCheck } = req.body;
    const user = await userService.fetchUser(userId);

    if (user){ 
        console.log(': dupulication ID');
        return res.json({
            result_message: '이미 사용 중인 아이디입니다.',
            pw_message: '',
        });
    }

    if (!((userId.length >= 8) && (userId.length <= 12))){ 
        console.log(': ID character count conditions not met');
        return res.json({
            result_message: '8글자 이상 12글자 이하로 아이디를 입력해주세요.',
            pw_message: '',
        });   
    }

    if (!((userPw.length >= 12) && (userPw.length <= 16))){ 
        console.log(': PW character count conditions not met');
        return res.json({
            result_message: '사용 가능한 아이디입니다.',
            pw_message: '12글자 이상 16글자 이하로 비밀번호를 입력해주세요.',
        });
    }

    if (userPw !== userPwCheck){ 
        console.log(': PW Verification failed');
        return res.json({
            result_message: '사용 가능한 아이디입니다.',
            pw_message: '비밀번호가 일치하지 않습니다.',
        });
    }

    const users = await userService.fetchAllUsers();
    let basicName = '트레이더';
    while(true){
        const num = Math.floor(Math.random() * 9999) + 1;
        basicName += num.toString().padStart(4, '0');
        
        const isAlready = users.findIndex(u => u.userName === basicName);
        if (!(isAlready > -1)) break;
    }

    const newUser = {
        userId,
        userPw,
        money: 0,
        userName: basicName,
        daily: true,
        userImg: '/uploads/basic.png',
        userExplain: 'SIMPLE_VIRTUAL_CRYPTO_INVESTMENT_SIMULATION',
        tmpName: '',
        tmpImg: '',
        tmpExplain: '',
        dark: false,
        order: [],
        userSpot: [],
        userFuture: [],
    };

    await userService.createUser(newUser);
    console.log(': A new user has been created.');

    return res.json({
        redirect: '/login',
    });
};

exports.signin = async (req, res) => {
    console.log('signin running');
    const { userId, userPw } = req.body;
    const check = await userService.checkUser(userId, userPw);
    if (check){
        const user = await userService.fetchUser(userId);
        res.cookie(USER_COOKIE_KEY, JSON.stringify(user));
        
        return res.redirect('/main');
    }
    res.redirect('/login');
};

exports.logout = (req, res) => {
    res.clearCookie(USER_COOKIE_KEY);
    res.redirect('/login');
};

exports.withdraw = async (req, res) => {
    console.log('withdraw running');
    const { userPw } = req.body;
    
    const userCookie = req.cookies[USER_COOKIE_KEY];
    if (!userCookie){
        console.log('not have cookie');
        return res.redirect('/login');
    }

    if (userPw === ''){
        return res.json({
            pw_message: '비밀번호를 입력해주세요.',
        })
    }

    const user = JSON.parse(userCookie);
    const checker = await userService.removeUser(user.userId, userPw);
    if (!(checker === undefined)){
        console.log('Password unmatched');
        return res.json({
            pw_message: '비밀번호가 일치하지 않습니다.',
        });
    }

    res.clearCookie(USER_COOKIE_KEY);
    return res.json({
        redirect: '/login',
    });
};
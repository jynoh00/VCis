const userService = require('../services/userService');
const USER_COOKIE_KEY = 'USER';

exports.changeName = async (req, res) => {
    const canNotName = ['admin', '시발', '좆', 'ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ',
        'ㅌ', 'ㅍ', 'ㅎ', '!', '@', ' ', '#', '$', '~', '₩', '%', '^', '&', '*', '(', ')', '+', '=', '[', ']', '{', '}', '|', '\\',
        '"', `'`, '?', '/', '.', ',', '<', '>', '-', 'ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ', 'ㅚ', 'ㅙ', 'ㅞ', 'ㅟ', 'ㅖ', 'ㅒ',
        'ㅐ', 'ㅔ'
    ];
    const { newNickname } = req.body;
    const userCookie = JSON.parse(req.cookies[USER_COOKIE_KEY]);
    const users = await userService.fetchAllUsers();

    if (!userCookie) return res.redirect('/login');

    for (const s of canNotName){
        if (newNickname.includes(s)){
            return res.json({
                message: '사용 불가한 닉네임입니다',
            });
        }
    }

    if (users.findIndex(u => u.userName === newNickname) > -1){
        return res.json({
            message: '이미 사용 중인 닉네임입니다',
        });
    }
    
    const updatedUser = await userService.updateUser(userCookie.userId, {tmpName: newNickname});
    res.cookie(USER_COOKIE_KEY, JSON.stringify(updatedUser));

    return res.json({
        nameData: newNickname,
        change: true,
        message: '사용 가능한 닉네임입니다',
    });
};

exports.changeExplain = async (req, res) => {
    const canNotExplain = ['시발', '좆', 'fuck', '씹', 'ㅈ', 'ㅅㅂ'];
    const { newExplain } = req.body;
    const userCookie = JSON.parse(req.cookies[USER_COOKIE_KEY]);

    if (!userCookie) return res.redirect('/login');

    for (const s of canNotExplain){
        if (newExplain.includes(s)){
            return res.json({
                message: '사용 불가한 소개말입니다',
            });
        }
    }

    const updatedUser = await userService.updateUser(userCookie.userId, {tmpExplain: newExplain});
    res.cookie(USER_COOKIE_KEY, JSON.stringify(updatedUser));

    return res.json({
        explainData: newExplain,
        change: true,
        message: '사용 가능한 소개말입니다',
    });
};

exports.changeProfile = async (req, res) => {
    const userCookie = JSON.parse(req.cookies[USER_COOKIE_KEY]);
    
    if ((userCookie.tmpName !== '') || (userCookie.tmpImg !== '') || (userCookie.tmpExplain !== '')){
        const updatedUser = await userService.updateUser(userCookie.userId, {
            userName: userCookie.tmpName === '' ? userCookie.userName : userCookie.tmpName,
            userImg: userCookie.tmpImg === '' ? userCookie.userImg : userCookie.tmpImg,
            userExplain: userCookie.tmpExplain === '' ? userCookie.userExplain : userCookie.tmpExplain,
        });
    
        res.cookie(USER_COOKIE_KEY, JSON.stringify(updatedUser));
        return res.redirect('/main/mypage');
    }
    
    return res.redirect('/main/changeprofile');
};

exports.tmpClear = async (req, res, next) => {
    const userCookie = JSON.parse(req.cookies[USER_COOKIE_KEY]);

    const updatedUser = await userService.updateUser(userCookie.userId, {
        tmpName: '',
        tmpImg: '',
        tmpExplain: '',
    });

    res.cookie(USER_COOKIE_KEY, JSON.stringify(updatedUser));
    
    return next();
}

exports.changeMode = async (req, res, next) => {
    const userCookie = JSON.parse(req.cookies[USER_COOKIE_KEY]);
    const updatedUser = await userService.updateUser(userCookie.userId, {
        dark: !(userCookie.dark),
    });

    res.cookie(USER_COOKIE_KEY, JSON.stringify(updatedUser));
    return res.redirect('/main/mypage');
}

exports.changePw = async (req, res, next) => {
    const userCookie = JSON.parse(req.cookies[USER_COOKIE_KEY]);
    const users = await userService.fetchAllUsers();
    const { beforePw, afterPw, afterPwConfirm } = req.body;

    if (!userCookie) return res.redirect('/login');

    if (beforePw === ''){
        return res.json({
            message: '기존 비밀번호를 입력해주세요.',
        });
    }

    const checker = await userService.checkUser(userCookie.userId, beforePw);
    if (!checker){ // 기존 비밀번호 일치x
        return res.json({
            message: '기존 비밀번호가 일치하지 않습니다.',
        });
    }

    if (!((afterPw.length >= 12) && (afterPw.length <= 16))){
        console.log(': PW character count conditions not met');
        return res.json({
            message: '12글자 이상 16글자 이하로 새로운 비밀번호를 입력해주세요.',
        });
    }

    if (afterPw !== afterPwConfirm){
        console.log(': PW Verification failed');
        return res.json({
            message: '새로운 비밀번호가 일치하지 않습니다.',
        });
    }

    const updatedUser = await userService.updatePwUser(userCookie.userId, afterPw);

    res.cookie(USER_COOKIE_KEY, JSON.stringify(updatedUser));

    return res.json({
        redirect: '/main/mypage',
    });
};
// server main

const express = require('express'); // express framework module
const app = express();
const fs = require('fs').promises;
const path = require('path'); // 파일 경로를 안전하게 처리
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

const USERS_JSON_FILENAME = '../data/users.json';
const USER_COOKIE_KEY = 'USER';
const PORT = 8080;

app.use('/css', express.static(path.join(__dirname, '..', '/public/login', 'css')));
app.use('/js', express.static(path.join(__dirname, '..', '/public/login', 'js')));
app.use('/img', express.static(path.join(__dirname, '..', '/public/login', 'img')));
app.use(express.static(path.join(__dirname, '..', '/public')));
app.use(cookieParser());
app.use(express.urlencoded({ extends: true}));

async function fetchAllUsers(){ // 반복 제거
    const data = await fs.readFile(USERS_JSON_FILENAME);
    const users = JSON.parse(data.toString());
    
    return users;
};

async function fetchUser(userId){
    const users = await fetchAllUsers();
    const user = users.find((user) => user.userId === userId);

    return user;
};

async function createUser(newUser){
    const hashedPassword = await bcrypt.hash(newUser.userPw, 10);

    const users = await fetchAllUsers();
    user.push({
        ...newUser,
        userPw: hashedPassword,
    });

    await fs.writeFile(USERS_JSON_FILENAME, JSON.stringify(users));
};

async function removeUser(userId, userPw){
    const user = await fetchUser(userId);
    const matchPassword = await bcrypt.compare(userPw, user.userPw);

    if (matchPassword){
        const users = await fetchAllUsers();
        const idx = users.findIndex(u => u.userId === userId);
        users.splice(idx, 1);
        await fs.writeFile(USERS_JSON_FILENAME, JSON.stringify(users));
    }
};

app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '..', '/public/login', 'intro.html'));
});


/* async로 콜백함수 변경 이후 수정. front POST 방식 수정 */
app.get('/login', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '..', '/public/login', 'login.html'));
});

/* .post 추가 */


// app.get('/', async (req, res) => {
//     const userCookie = req.cookies[USER_COOKIE_KEY];
    
//     if (userCookie){ // cookie 데이터 존재
//         const userData = JSON.parse(userCookie);
//         const user = await fetchUser(userData.username);

//         if (user){
//             return res.status(200).sendFile(path.join(__dirname, '..', '/public/main', 'clear.html'));
//         }
//     }

//     res.status(200).sendFile(path.join(__dirname, '..', 'public', 'login', 'login.html'));
// });

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', '/public/login', 'login.html'));
// });

// app.get('/signup', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', '/public/login', 'signup.html'));
// });

app.listen(PORT, () => console.log("server listening..."));

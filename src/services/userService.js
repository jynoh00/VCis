const fs = require('fs').promises;
const bcrypt = require('bcrypt');

const USERS_JSON_FILENAME = '../src/db/users.json';

async function fetchAllUsers(){
    // console.log('Current directory:', process.cwd());
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
    users.push({
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

async function checkUser(userId, userPw){
    console.log('체크 유저 실행');
    const user = await fetchUser(userId);
    if (!user){ // 존재하지않는 ID
        console.log('체크 유저 : false1');
        return false;
    }

    const matchPassword = await bcrypt.compare(userPw, user.userPw);
    if (matchPassword){ // 비밀번호 일치
        console.log('체크 유저 : true');
        return true;
    }
    
    console.log('체크 유저 : false2');
    return false;
}

module.exports = { fetchAllUsers, fetchUser, createUser, removeUser, checkUser };
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const userService = require('../services/userService');
const USER_COOKIE_KEY = 'USER';

const uploadDir = path.join(__dirname, '..', '..', 'uploads');

if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.gif'){
            return cb(new Error('이미지 파일만 업로드 할 수 있습니다.'));
        }
        cb(null, true);
    },
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

router.post('/upload', upload.single('userImg'), async (req, res) => { // async로 바꿈
    console.log(uploadDir);
    console.log('aaaaa');

    try{
        if (!req.file){
            return res.json({
                error: '파일이 업로드되지 않았습니다',
                change: false
            });
        }

        const userCookie = JSON.parse(req.cookies[USER_COOKIE_KEY]);
        if (!userCookie) return res.redirect('/');

        const updatedUser = await userService.updateUser(userCookie.userId, {tmpImg: `/uploads/${req.file.filename}`});
        res.cookie(USER_COOKIE_KEY, JSON.stringify(updatedUser));

        return res.json({
            url: `/uploads/${req.file.filename}`,
            change: true
        });
    }catch(error){
        console.error('파일 업로드 에러:', error);
        res.status(500).json({
            error: '파일 업로드 중 오류 발생',
            change: false
        });
    }
});

module.exports = router;
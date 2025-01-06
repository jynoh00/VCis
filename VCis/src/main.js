// server main

const express = require('express'); // express framework module
const app = express();
const port = 8080;
const fs = require('fs');
const path = require('path'); // 파일 경로를 안전하게 처리
const apiRoutes = require('./routes/api');

/*------ 추후 업데이트 ------*/
// const bodyParser = require('body-parser');
// const compression = require('compression');
// const topicRouter = require('./routes/topic');
// const indexRouter = require('./routes/index');
// const helmet = require('helmet'); // 보안 관련 모듈
// app.use(helmet());
// const template = require('./lib/template.js');
/*-----------------------*/


app.use('/css', express.static(path.join(__dirname, '..', '/public/login', 'css')));
app.use('/js', express.static(path.join(__dirname, '..', '/public/login', 'js')));
app.use('/img', express.static(path.join(__dirname, '..', '/public/login', 'img')));

app.use(express.json());
app.use(express.static('public'));
app.use('/api', apiRoutes);



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '/public/login', 'login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '/public/login', 'signup.html'));
});

// app 서버 실행
app.listen(port, () => console.log("server listening..."));

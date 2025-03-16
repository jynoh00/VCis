const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const errorRouter = require('./routes/error'); 
const mainRouter = require('./routes/main');
const moneyRouter = require('./routes/money');
const imgRouter = require('./routes/img');

const app = express();

// view engine setting
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// middleware setting
app.use(express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.use('/', imgRouter); // img routing processing
app.use('/', indexRouter); // root routing processing
app.use('/users', usersRouter); // users routing processing
app.use('/main', mainRouter); // after login
app.use('/money', moneyRouter);
app.use(errorRouter);

module.exports = app;
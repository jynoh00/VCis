const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const errorRouter = require('./routes/error'); 
const mainRouter = require('./routes/main');

const app = express();

// view engine setting
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// middleware setting
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.use('/', indexRouter); // root routing processing
app.use('/users', usersRouter); // users routing processing
app.use('/main', mainRouter); // after login
app.use(errorRouter); // errorRouter는 가장 마지막에
// app.use('/sign', signRouter);

module.exports = app;
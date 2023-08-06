const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const path = require('path');
const ejs = require('ejs');
const MongoStore = require('connect-mongo');
const { DBHOST, DBPORT, DBNAME } = require('./config/config')

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

const app = express();

// https://ithelp.ithome.com.tw/articles/10228375
app.use(session({
  name: 'sid', // 儲存 sessionID 的那個 Cookie 的名稱
  secret: 'test', // 用來認證該 Session 的資料。
  saveUninitialized: false, // 是否強制將未初始化的 Session 儲存至 Store。（新產生的 Session）
  resave: true, // 即使 Session 沒做變動，是否強制重新儲存進 Store。
  store: MongoStore.create({ // 儲存 Session 的地方
    mongoUrl: `mongodb://${DBHOST}:${DBPORT}/${DBNAME}`
  }),
  cookie: { // 儲存 sessionID 的 Cookie 的形式。
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404));
  res.render('404');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

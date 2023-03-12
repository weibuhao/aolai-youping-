var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
const JWT = require('./utils/jwt')

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var homeRouter = require('./routes/home');
var searchRouter = require('./routes/search');
var userRouter = require('./routes/user');
var cartRouter = require('./routes/cart');
var addressRouter = require('./routes/address');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});


app.use((req, res, next) => {
 //需要登录的api
  if (req.url.includes("user") || req.url.includes("cart")|| req.url.includes("address")) {
    if (req.headers['authorization']) {
      const token = req.headers['authorization'].split(' ')[1]
      const payload = JWT.verify(token)

      if (payload) {
        next()
      } else {
        return res.status(401).send({
          errCode: -1,
          errInfo: "token过期！"
        })
      }

    } else {
      return res.status(401).send({
        errCode: -1,
        errInfo: "未登录验证！"
      })
    }
    return
  }
  next()
})


app.use(session({
  name: 'xiaoxiaobug',
  secret: '26911wbh',
  cookie: {
    // maxAge: 1000 * 60 * 60,
     maxAge: 1000 * 60 * 60,
    secure: false
  },
  resave: true,
  saveUninitialized: true
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/home', homeRouter);
app.use('/search',
  searchRouter);
app.use('/user', userRouter);
app.use('/cart', cartRouter);
app.use('/address', addressRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

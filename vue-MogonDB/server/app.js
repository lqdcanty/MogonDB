var createError = require('http-errors');
var express = require('express');
var path = require('path');

var logger = require('morgan');//对日志进行输出；
var ejs = require('ejs');
var cookieParser = require('cookie-parser');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var goodsRouter = require('./routes/goods');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html',ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));//设置静态目录

//做登录的拦截
app.use(function (req,res,next) {//use中的function的优先级是最高的，会优先进入此函数，
  if(req.cookies.userId){
    next();
  }else{
    console.log("url:"+req.originalUrl);
    if(req.originalUrl=='/users/login' || req.originalUrl=='/users/logout' || req.path=='/goods'){
      next();
    }else{
      res.json({
        status:'10001',
        msg:'当前未登录',
        result:''
      });
    }
  }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);//这里是访问的地址--根据路由决定的(一级路由)
app.use('/goods', goodsRouter);

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

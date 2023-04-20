var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const session=require('express-session');
const dotenv=require('dotenv'); // .env파일을 읽어서 process.env로 만듭니다.
var logger = require('morgan');
const bodyParser=require('body-parser'); //요청의 본문에 있는 데이터를 해석해서 req.body 객체로 만들어 주는 미들웨어, 보통 폼 데이터나 AJAX 요청의 데이터를 처리, 단 멀티파트(이미지, 동영상, 파일) 데이터는 처리하지 못 한다. 그 경우에는 multer 모듈을 사용하면 됨


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const bodyParser = require("body-parser");
const bodyParser = require("body-parser");


dotenv.config();

var app = express(); // 익스프레스 내부에 http 모듈이 내장되어 있으므로 서버로의 역할을 함

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// app.set('port', process.env.PORT || 3001); 기본이 3000임 //여기말고 www.js에서 설정하는거임?

//app.use에 매개변수가 req,res,next인 함수를 넣으면 됨. 미들웨어는 위에서 부터 아래로 순서대로 실행되면서
//요청과 응답 사이에 특별한 기능을 추가할 수 있다.
//next라는 세번째 매개변수를 사용했는데, 다음 미들웨어로 넘어가는 함수, next를 실행하지 않으면 다음 미들웨어가 실행되지 않는다.
//app.use의 첫번째 형태로 미들웨어만 있으므로, 모든 요청에 대해 다 실행됨
//아래 있으니까 안 됨
app.use(
    (req,res,next)=>{
      console.log('모든 요청에 다 실행됩니다.');
      next();
    }
);

// app.use(bodyParser.raw());
// app.use(bodyParser.text());

app.use(logger('dev')); //'dev' 외에도 combined, common, short, tiny등을 넣을 수 있습니다. //개발환경에서는 dev, 배포 환경에서는 combined //
app.use(express.json()); //json 형식의 데이터 전달 방식
app.use(express.urlencoded({ extended: false })); //주소 형식으로 데이터를 보내는 방식, { extended: false } 옵션이 false면 노드의 querystring 모듈을 사용하여 쿼리 스트링을 해석하고, true면 qs 모듈을 사용하여 쿼리 스트링을 해석함, qs 모듈은 내장 모듈이 아니라 npm 패키지이면 querystring 모듈의 기능을 좀 더 확장한 모듈
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //static 미들웨어는 정적인 파일들을 제공하는 라우터 역할

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler 에러 처리 미들웨어, 모든 매개변수를 사용하지 않더라도 매개변수가 반드시 네 개여야 함
// err는 에러에 관한 정보가 담겨 있다.
// 에러처리 미들웨어는 가장 아래에 위치하도록 함
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500); //HTTP 상태 코드를 지정할 수 있습니다. 기본값은 200(성공), 에러 처리 미들웨어를 직접 연결하지 않아도 기본적으로 익스프레스가 에러를 처리하긴 합니다만 실무에서는 직접 에러 처리 미들웨어를 연결하는 것이 좋다.
  res.render('error');
});



app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname, '/index.html'));

});



app.listen(app.get('port'),()=>{
  console.log(app.get('port'),'번 포트에서 대기중');
});


module.exports = app;

/*
const mvn = require('maven').create({
      cwd: 'D:/Angular/test/demo'
    });
    mvn.execute(['clean', 'install'], { 'skipTests': true }).then(() => {
      // As mvn.execute(..) returns a promise, you can use this block to continue
      // your stuff, once the execution of the command has been finished successfully.
    });

*/
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');

//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
});

app.use('/api', indexRouter);
app.use('/users', usersRouter);

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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/*
const mvn = require('maven').create({
      cwd: 'D:/Angular/test/node/demo'
    });
    mvn.execute('install:install-file -Dfile=D:/Angular/test/node/bankapp-server/FunctionAPI.jar', { }).then(() => {
      // As mvn.execute(..) returns a promise, you can use this block to continue
      // your stuff, once the execution of the command has been finished successfully.
    });

*/



module.exports = app;
/*
var exec = require('child_process').exec, child;
child = exec('java -jar BankApi-0.1.jar',
  function (error, stdout, stderr){
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if(error !== null){
      console.log('exec error: ' + error);
    }
});
*/

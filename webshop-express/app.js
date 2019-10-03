const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const favicon = require('serve-favicon');
const UserDB = require('./modules/user');
const db = require('./modules/db');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const apiRouter = require('./routes/api');
const loginRouter = require('./routes/login');
const basketRouter = require('./routes/basket');
const registerRouter = require('./routes/register');
const ordersRouter = require('./routes/orders');
const howToChooseRouter = require('./routes/how-to-choose');

const userDb = new UserDB();
const app = express();

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, '..', 'webshop-express', 'public', 'favicon.ico')));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,PUT,DELETE,GET,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res, next) => {
  const user = await userDb.checkLogin(req);
  if (user) {
    req.user = user;
    console.log('Req.user:', req.user);
    req.body.counter = await userDb.checkBasket(req.user.userId) || 0;
  }

  next();
});

app.use('/logout', (req, res, next) => {
  res.clearCookie('uuid');
  res.redirect('/products');
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/api', apiRouter);
app.use('/login', loginRouter);
app.use('/basket', basketRouter);
app.use('/register', registerRouter);
app.use('/orders', ordersRouter);
app.use('/how-to-choose', howToChooseRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
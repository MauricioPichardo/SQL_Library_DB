const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const routes = require('./routes/index');
const app = express();
app.use('/public', express.static('public'));
const db = require('./models/index');

// view engine setup
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


(async () => {
  await db.sequelize.sync({ alter: true });

  try { console.log('Success')

  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
})();

app.use('/', routes);
// catch 404 and forward to error handler
app.use( (req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    res.locals.error = err;
    console.log('Error status:', err.status);
    res.status(err.status || 500);
    if(err.status === 404){
        res.render('error');
    } else {
        res.render('error');
    }
});


app.listen(3000), () => console.log('Api Listening on port 3000!')

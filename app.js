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

//Global Handler
app.use((req, res) => {
  res.locals.title = "Page Not Found";
  res.status(404).render("page_not_found");
});

// error handler
app.use((err, req, res, next) => {
  res.locals.error= err;
  res.status(err.status || 500);
  res.render("server_issue", err);
});



app.listen(3000), () => console.log('Api Listening on port 3000!')

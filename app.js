import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import logger from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

import Routes from './src/routes/routes';

const app = express();

const PORT = process.env.PORT || 5000;
// const URI = process.env.CLUSTER;

app.use(logger('dev'));
app.use(cookieParser());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://localhost/node_db`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set('useCreateIndex', true);

// body parser setup
app.use(bodyParser.urlencoded({ extended: true, }))
app.use(bodyParser.json());

Routes(app);

app.get('/', (req, res) => 
  res.send(`Node + Express + MongoDB simple REST API running on port ${PORT}`)
);

app.listen(PORT, () => 
  console.log(`Server running on port ${PORT}`)
);

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
  res.json({
    error: err,
    message: err.message,
  });
});

module.exports = app;

const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(express.json());

// adding middleware

app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log('Hello from the middleware 🧸');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toDateString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;

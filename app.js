const express = require('express');
const { json } = require('express');
const { default: mongoose } = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes');
const handleError = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, MONGO_URL } = require('./config');

const allowedCors = ['https://buyavykh-diploma.nomoredomainsmonster.ru', 'http://buyavykh-diploma.nomoredomainsmonster.ru', 'http://localhost:3000'];

const app = express();

mongoose.connect(MONGO_URL);
app.use(function(req, res, next) {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  next();
});

app.use(json());

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(handleError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

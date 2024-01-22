const express = require('express');
const { json } = require('express');
const { default: mongoose } = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes');
const handleError = require('./middlewares/handleError');
const handleCors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, MONGO_URL } = require('./config');

const app = express();

mongoose.connect(MONGO_URL);

app.use(json());

app.use(handleCors);

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(handleError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

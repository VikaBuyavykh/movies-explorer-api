const express = require('express');
const { json } = require('express');
const { default: mongoose } = require('mongoose');
const router = require('./routes');
const handleError = require('./middlewares/handleError');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

app.use(json());

app.use(router);

app.use(handleError);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})
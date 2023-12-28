require('dotenv').config();

const {
  PORT = 3000,
  MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  NODE_ENV,
  JWT_SECRET,
} = process.env;

const SALT_ROUNDS = 10;
const MONGO_DUPLICATE_ERROR_CODE = 11000;

module.exports = {
  PORT, MONGO_URL, NODE_ENV, JWT_SECRET, SALT_ROUNDS, MONGO_DUPLICATE_ERROR_CODE,
};

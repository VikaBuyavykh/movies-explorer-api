const { default: mongoose } = require('mongoose');
const { urlRegex } = require('../utils/regex');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return urlRegex.test(v);
      },
      message: (props) => `${props.value} is not a valid image`,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return urlRegex.test(v);
      },
      message: (props) => `${props.value} is not a valid trailer-link`,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return urlRegex.test(v);
      },
      message: (props) => `${props.value} is not a valid thumbnail`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
}, { versionKey: false, timestamps: true });

module.exports = mongoose.model('movie', movieSchema);

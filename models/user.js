const { default: mongoose } = require('mongoose');
const { default: isEmail } = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: {
      value: true,
      message: 'Поле email является обязательным',
    },
    unique: true,
    validate: {
      validator(v) {
        return isEmail(v);
      },
      message: (props) => `${props.value} is not a valid email`,
    },
  },
  password: {
    type: String,
    required: {
      value: true,
      message: 'Поле password является обязательным',
    },
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: {
      value: true,
      message: 'Поле name является обязательным',
    },
  },
}, { versionKey: false, timestamps: true });

module.exports = mongoose.model('user', userSchema);

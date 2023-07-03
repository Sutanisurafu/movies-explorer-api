const mongoose = require('mongoose');
const validator = require('validator');
// const bcrypt = require('bcryptjs');

const validateEmail = (email) => validator.isEmail(email);

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validateEmail,
      message: 'Некорректная почта',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
    default: 'Жак-Ив Кусто',
  },
});

module.exports = mongoose.model('user', userSchema);

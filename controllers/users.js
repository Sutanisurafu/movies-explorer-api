// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { STATUS_CODES } = require('../constants/errors');
// const NotFoundError = require('../errors/Not-found');
const BadRequestError = require('../errors/Bad-request');
// const ConflictError = require('../errors/Conflict-request');

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.status(STATUS_CODES.OK).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Некорректные данные'));
      } return next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      runValidators: true,
      new: true, // обработчик then получит на вход обновлённую запись
    },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Некорректные данные'));
      } return next(err);
    });
};

const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/Unauthorized');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const { JWT_SECRET_KEY = 'random-secret-phrase' } = process.env;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = authorization.replace(/^Bearer*\s*/i, '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET_KEY);
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;

  next(); // пропускаем запрос дальше
};

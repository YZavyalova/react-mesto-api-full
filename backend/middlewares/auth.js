import jwt from 'jsonwebtoken';
import Unauthorized from '../errors/Unauthorized.js';

const { NODE_ENV, JWT_SECRET } = process.env;
console.log(NODE_ENV);
console.log(JWT_SECRET);
const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'JWT_SECRET');
  } catch (err) {
    return next(new Unauthorized('Необходима авторизация'));
  }

  req.user = payload;
  return next();
};

export default auth;

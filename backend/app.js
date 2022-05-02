import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import errorHandler from './errors/errorHandler.js';
import { login, createUser, logout } from './controllers/users.js';
import { validateRegister } from './middlewares/validation.js';
import usersRouter from './routes/users.js';
import cardRouter from './routes/cards.js';
import auth from './middlewares/auth.js';
import ErrorNotFound from './errors/ErrorNotFound.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(cors({
  origin: [
    'https://api.yzavyalova-mesto.nomoredomains.work',
    'https://localhost:3000/signup',
    'https://yzavyalova-mesto.nomoredomains.work',
    'http://yzavyalova-mesto.nomoredomains.work',
    'https://localhost:3000',
    'https://localhost:3001/signup',
    'http://localhost:3001',
    'http://localhost:3000',
  ],
  credentials: true,
}));

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(requestLogger); // подключаем логгер запросов

// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

// роуты, не требующие авторизации,
app.post('/signup', validateRegister, createUser);
app.post('/signin', validateRegister, login);
app.delete('/signout', logout);

app.use(auth);

app.use('/', usersRouter);
app.use('/', cardRouter);

app.use(errorLogger);

app.use(() => {
  throw new ErrorNotFound('Страница не найдена');
});

app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}...`);
});

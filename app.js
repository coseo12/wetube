import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import userRouter from './routers/user-router';
import videoRouter from './routers/video-router';
import globalRouter from './routers/global-router';
import routes from './routes';

const app = express();

app.set('view engine', 'pug');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(async (req, res, next) => {
  res.setHeader('Content-Security-Policy', 'script-src kit.fontawesome.com');
  next();
});

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;

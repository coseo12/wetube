import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import passport from 'passport';
import flash from 'express-flash';
import { localsMiddleware } from '../middlewares';
import userRouter from '../routers/user-router';
import videoRouter from '../routers/video-router';
import globalRouter from '../routers/global-router';
import routes from '../routes';

import '../api/passport';
import apiRouter from '../routers/api-router';

const app = express();

const CookieStore = MongoStore(session);

app.use(cors());
app.use(helmet({ contentSecurityPolicy: false }));
app.set('views', 'src/views');
app.set('view engine', 'pug');
app.use('/uploads', express.static('src/uploads'));
app.use('/static', express.static('src/static'));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;

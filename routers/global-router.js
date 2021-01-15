import express from 'express';
import routes from '../routes';
import { home, search } from '../controllers/video-controller';
import {
  getJoin,
  postJoin,
  login,
  logout,
} from '../controllers/user-controller';

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.getJoin, getJoin);
globalRouter.post(routes.postJoin, postJoin);
globalRouter.get(routes.login, login);
globalRouter.get(routes.logout, logout);
globalRouter.get(routes.search, search);

export default globalRouter;

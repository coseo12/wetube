import express from 'express';
import routes from '../routes';
import { home, search } from '../controllers/video-controller';
import {
  getJoin,
  postJoin,
  logout,
  getLogin,
  postLogin,
} from '../controllers/user-controller';
import { onlyPublic } from '../middlewares';

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.getJoin, onlyPublic, getJoin);
globalRouter.post(routes.postJoin, postJoin, postLogin);
globalRouter.get(routes.getLogin, onlyPublic, getLogin);
globalRouter.post(routes.postLogin, postLogin);
globalRouter.get(routes.logout, logout);
globalRouter.get(routes.search, search);

export default globalRouter;

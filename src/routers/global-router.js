import express from 'express';
import routes from '../routes';
import { home, search } from '../controllers/video-controller';
import {
  getJoin,
  postJoin,
  logout,
  getLogin,
  postLogin,
  githubLogin,
  postGithubLogin,
  fbLogin,
  postFbLogin,
} from '../controllers/user-controller';
import { onlyPrivate, onlyPublic } from '../middlewares';
import passport from 'passport';

const globalRouter = express.Router();

globalRouter.get(routes.home, home);

globalRouter.get(routes.getJoin, onlyPublic, getJoin);
globalRouter.post(routes.postJoin, postJoin, postLogin);

globalRouter.get(routes.getLogin, onlyPublic, getLogin);
globalRouter.post(routes.postLogin, postLogin);
globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.github, githubLogin);
globalRouter.get(
  routes.githubCallback,
  passport.authenticate('github', { failureRedirect: routes.getLogin }),
  postGithubLogin
);

globalRouter.get(routes.fb, fbLogin);
globalRouter.get(
  routes.fbCallback,
  passport.authenticate('facebook', { failureRedirect: routes.getLogin }),
  postFbLogin
);

globalRouter.get(routes.search, search);

export default globalRouter;

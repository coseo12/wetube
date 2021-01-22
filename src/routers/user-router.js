import express from 'express';
import {
  getChangePassword,
  getEditProfile,
  me,
  postChangePassword,
  postEditProfile,
  userDetail,
} from '../controllers/user-controller';
import { onlyPrivate, uploadAvatar } from '../middlewares';
import routes from '../routes';

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(
  routes.postEditProfile,
  onlyPrivate,
  uploadAvatar,
  postEditProfile
);
userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.postChangePassword, onlyPrivate, postChangePassword);
userRouter.get(routes.me, onlyPrivate, me);
userRouter.get(routes.userDetail(), onlyPrivate, userDetail);

export default userRouter;

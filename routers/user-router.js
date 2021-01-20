import express from 'express';
import {
  changePassword,
  editProfile,
  me,
  userDetail,
} from '../controllers/user-controller';
import { onlyPrivate } from '../middlewares';
import routes from '../routes';

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, editProfile);
userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.me, onlyPrivate, me);
userRouter.get(routes.userDetail(), onlyPrivate, userDetail);

export default userRouter;

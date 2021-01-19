import express from 'express';
import {
  changePassword,
  editProfile,
  me,
} from '../controllers/user-controller';
import { onlyPrivate } from '../middlewares';
import routes from '../routes';

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, editProfile);
userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.me, onlyPrivate, me);

export default userRouter;

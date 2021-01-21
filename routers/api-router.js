import express from 'express';
import { registerView } from '../controllers/video-controller';
import routes from '../routes';

const apiRouter = express.Router();

apiRouter.post(routes.registerView(), registerView);

export default apiRouter;

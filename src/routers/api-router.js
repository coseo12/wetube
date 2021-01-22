import express from 'express';
import { postAddComment, registerView } from '../controllers/video-controller';
import routes from '../routes';

const apiRouter = express.Router();

apiRouter.post(routes.registerView, registerView);
apiRouter.post(routes.addComment, postAddComment);

export default apiRouter;

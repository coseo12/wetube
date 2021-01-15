import express from 'express';
import {
  editVideo,
  getUpload,
  postUpload,
  videoDetail,
} from '../controllers/video-controller';
import routes from '../routes';

const videoRouter = express.Router();

videoRouter.get(routes.getUpload, getUpload);
videoRouter.get(routes.postUpload, postUpload);
videoRouter.get(routes.editVideo(), editVideo);
videoRouter.get(routes.videoDetail(), videoDetail);

export default videoRouter;

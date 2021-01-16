import express from 'express';
import {
  deleteVideo,
  getEditVideo,
  getUpload,
  postEditVideo,
  postUpload,
  videoDetail,
} from '../controllers/video-controller';
import { uploadVideo } from '../middlewares';
import routes from '../routes';

const videoRouter = express.Router();

videoRouter.get(routes.getUpload, getUpload);
videoRouter.post(routes.postUpload, uploadVideo, postUpload);
videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.postEditVideo, postEditVideo);
videoRouter.get(routes.videoDetail(), videoDetail);
videoRouter.get(routes.deleteVideo(), deleteVideo);

export default videoRouter;

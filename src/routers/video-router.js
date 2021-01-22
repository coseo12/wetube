import express from 'express';
import {
  deleteVideo,
  getEditVideo,
  getUpload,
  postEditVideo,
  postUpload,
  videoDetail,
} from '../controllers/video-controller';
import { onlyPrivate, uploadVideo } from '../middlewares';
import routes from '../routes';

const videoRouter = express.Router();

videoRouter.get(routes.getUpload, onlyPrivate, getUpload);
videoRouter.post(routes.postUpload, onlyPrivate, uploadVideo, postUpload);
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.postEditVideo, onlyPrivate, postEditVideo);
videoRouter.get(routes.videoDetail(), videoDetail);
videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

export default videoRouter;

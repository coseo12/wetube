import express from 'express';
import {
  deleteVideo,
  editVideo,
  upload,
  videoDetail,
  videos,
} from '../controllers/video-controller';
import routes from '../routes';

const videoRouter = express.Router();

videoRouter.get(routes.upload, upload);
videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.videoDetail, videoDetail);

export default videoRouter;

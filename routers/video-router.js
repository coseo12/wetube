import express from 'express';
import {
  editVideo,
  upload,
  videoDetail,
} from '../controllers/video-controller';
import routes from '../routes';

const videoRouter = express.Router();

videoRouter.get(routes.upload, upload);
videoRouter.get(routes.editVideo(), editVideo);
videoRouter.get(routes.videoDetail(), videoDetail);

export default videoRouter;

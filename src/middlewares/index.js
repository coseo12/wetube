import routes from '../routes';
import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';

const BUCKET_NAME = 's-wetube-files-uplods';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: 'ap-northeast-2',
});

const multerVideo = multer({
  storage: multerS3({
    s3,
    acl: 'public-read',
    bucket: `${BUCKET_NAME}/video`,
  }),
});
const multerAvatar = multer({
  storage: multerS3({
    s3,
    acl: 'public-read',
    bucket: `${BUCKET_NAME}/avatar`,
  }),
});

export const localsMiddleware = (req, res, next) => {
  // res.setHeader(
  //   'Content-Security-Policy',
  //   `script-src 'self' 'unsafe-eval' kit.fontawesome.com archive.org`
  // );
  res.locals.siteName = `WeTube`;
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (!req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const uploadVideo = multerVideo.single('videoFile');
export const uploadAvatar = multerAvatar.single('avatar');

import routes from '../routes';
import multer from 'multer';

const multerVideo = multer({ dest: 'uploads/videos/' });

export const localsMiddleware = (req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    `script-src 'self' 'unsafe-eval' kit.fontawesome.com archive.org`
  );
  res.locals.siteName = `WeTube`;
  res.locals.routes = routes;
  res.locals.user = req.user || null;
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

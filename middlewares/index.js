import routes from '../routes';

export const localsMiddleware = (req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    `script-src kit.fontawesome.com archive.org`
  );
  res.locals.siteName = `WeTube`;
  res.locals.routes = routes;
  next();
};

import routes from '../routes';

export const localsMiddleware = (req, res, next) => {
  res.setHeader('Content-Security-Policy', 'script-src kit.fontawesome.com');
  res.locals.siteName = `WeTube`;
  res.locals.routes = routes;
  next();
};

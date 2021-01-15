import { videos } from '../db';
import routes from '../routes';

export const home = (req, res) => {
  res.render('home', { pageTitle: 'Home', videos });
};

export const search = (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  res.render('search', { pageTitle: 'Search', searchingBy, videos });
};

export const getUpload = (req, res) => {
  res.render('upload', { pageTitle: 'Upload' });
};

export const postUpload = (req, res) => {
  const {
    body: { file, title, description },
  } = req;
  // TODO: Upload and save video
  // ..
  res.redirect(routes.videoDetail(123));
};

export const videoDetail = (req, res) =>
  res.render('video-detail', { pageTitle: 'Video Detail' });

export const editVideo = (req, res) =>
  res.render('edit-video', { pageTitle: 'Edit Video' });

export const deleteVideo = (req, res) =>
  res.render('delete-video', { pageTitle: 'Delete Video' });

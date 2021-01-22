import routes from '../routes';
import Video from '../models/Video';
import Comment from '../models/Comment';

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render('home', { pageTitle: 'Home', videos });
  } catch (error) {
    res.render('home', { pageTitle: 'Home', videos: [] });
  }
};

export const search = async (req, res) => {
  try {
    const {
      query: { term: searchingBy },
    } = req;
    const videos = await Video.find({
      title: { $regex: searchingBy, $options: 'i' },
    });
    res.render('search', { pageTitle: 'Search', searchingBy, videos });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getUpload = (req, res) => {
  res.render('upload', { pageTitle: 'Upload' });
};

export const postUpload = async (req, res) => {
  try {
    const {
      body: { title, description },
      file: { location },
    } = req;
    const newVideo = await Video.create({
      fileUrl: location,
      title,
      description,
      creator: req.user.id,
    });
    req.user.videos.push(newVideo.id);
    req.user.save();
    res.redirect(routes.videoDetail(newVideo.id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const videoDetail = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const video = await Video.findById(id)
      .populate('creator')
      .populate('comments');
    res.render('video-detail', { pageTitle: 'Video Detail', video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const video = await Video.findById(id);
    if (video.creator !== req.user.id) {
      throw Error();
    } else {
      res.render('edit-video', { pageTitle: 'Edit Video', video });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  try {
    const {
      body: { id, title, description },
    } = req;
    await Video.findOneAndUpdate({ id, title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const video = await Video.findById(id);
    if (video.creator !== req.user.id) {
      throw Error();
    } else {
      await Video.findOneAndRemove(id);
      res.redirect(routes.home);
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const registerView = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(400);
  }
};

export const postAddComment = async (req, res) => {
  try {
    const {
      params: { id },
      body: { comment },
      user,
    } = req;
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
    });
    video.comments.push(newComment.id);
    video.save();
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(400);
  }
};

import routes from '../routes';
import User from '../models/User';
import passport from 'passport';

export const getJoin = (req, res) => {
  res.render('join', { pageTitle: 'Join' });
};

export const postJoin = async (req, res, next) => {
  try {
    const {
      body: { name, email, password, password2 },
    } = req;
    if (password !== password2) {
      res.status(400);
      res.redirect(routes.getJoin);
    } else {
      // TODO: Register User
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getLogin = (req, res) => {
  res.render('login', { pageTitle: 'Login' });
};
export const postLogin = passport.authenticate('local', {
  failureRedirect: routes.getLogin,
  successRedirect: routes.home,
});

export const githubLogin = passport.authenticate('github');

export const githubLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  try {
    const {
      _json: { id, avatar_url: avatarUrl, name, email },
    } = profile;
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const fbLogin = passport.authenticate('facebook');

export const fbLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  try {
    console.log(accessToken, refreshToken, profile);
  } catch (error) {
    return cb(error);
  }
};

export const postFbLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const me = (req, res) => {
  res.render('user-detail', { pageTitle: 'User Detail', user: req.user });
};

export const userDetail = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const user = await User.findById(id);
    res.render('user-detail', { pageTitle: 'User Detail', user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const editProfile = (req, res) =>
  res.render('edit-profile', { pageTitle: 'Edit Profile' });

export const changePassword = (req, res) =>
  res.render('change-password', { pageTitle: 'Change Password' });

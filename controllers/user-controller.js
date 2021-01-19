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

export const logout = (req, res) => res.send('logout');

export const userDetail = (req, res) => {
  res.render('user-detail', { pageTitle: 'User Detail' });
};

export const editProfile = (req, res) =>
  res.render('edit-profile', { pageTitle: 'Edit Profile' });

export const changePassword = (req, res) =>
  res.render('change-password', { pageTitle: 'Change Password' });

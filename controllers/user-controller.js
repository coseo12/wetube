import routes from '../routes';

export const getJoin = (req, res) => {
  res.render('join', { pageTitle: 'Join' });
};

export const postJoin = (req, res) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400);
    res.redirect(routes.getJoin);
  } else {
    // TODO: Register User
    // ..
    // TODO: User Login
    // ..
    res.redirect(routes.home);
  }
};

export const getLogin = (req, res) => {
  res.render('login', { pageTitle: 'Login' });
};
export const postLogin = (req, res) => {
  const {
    body: { email, password },
  } = req;
  res.redirect(routes.home);
};

export const logout = (req, res) => res.send('logout');

export const userDetail = (req, res) => {
  res.render('user-detail', { pageTitle: 'User Detail' });
};

export const editProfile = (req, res) =>
  res.render('edit-profile', { pageTitle: 'Edit Profile' });

export const changePassword = (req, res) =>
  res.render('change-password', { pageTitle: 'Change Password' });

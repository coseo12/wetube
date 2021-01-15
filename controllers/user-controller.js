export const join = (req, res) => res.render('join', {pageTitle: 'Join'});
export const login = (req, res) => res.render('login', {pageTitle: 'Login'});
export const logout = (req, res) => res.render('logout', {pageTitle: 'Logout'});
export const users = (req, res) => res.render('users', {pageTitle: 'Users'});
export const userDetail = (req, res) => res.render('user-detail', {pageTitle: 'User Detail'});
export const editProfile = (req, res) => res.render('edit-profile', {pageTitle: 'Edit Profile'});
export const changePassword = (req, res) => res.render('change-password', {pageTitle: 'Change Password'});

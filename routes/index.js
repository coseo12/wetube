//? Global
const HOME = '/';
const GET_JOIN = '/join';
const POST_JOIN = '/join-confirm';
const GET_LOGIN = '/login';
const POST_LOGIN = '/login-confirm';
const LOGOUT = '/logout';
const SEARCH = '/search';

//? Users
const USERS = '/users';
const USER_DETAIL = '/:id';
const EDIT_PROFILE = '/edit-profile';
const CHANGE_PASSWORD = '/change-password';

//? Videos
const VIDEOS = '/videos';
const GET_UPLOAD = '/upload';
const POST_UPLOAD = '/upload-confirm';
const VIDEO_DETAIL = '/:id';
const EDIT_VIDEO = '/:id/edit';
const DELETE_VIDEO = '/:id/delete';

const routes = {
  home: HOME,
  postJoin: POST_JOIN,
  getJoin: GET_JOIN,
  getLogin: GET_LOGIN,
  postLogin: POST_LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  userDetail: id => {
    if (id) {
      return `${USERS}/${id}`;
    } else {
      return USER_DETAIL;
    }
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  videos: VIDEOS,
  getUpload: GET_UPLOAD,
  postUpload: POST_UPLOAD,
  videoDetail: id => {
    if (id) {
      return `${VIDEOS}/${id}`;
    } else {
      return VIDEO_DETAIL;
    }
  },
  editVideo: id => {
    if (id) {
      return `${VIDEOS}/${id}/edit`;
    } else {
      return EDIT_VIDEO;
    }
  },
  deleteVideo: id => {
    if (id) {
      return `${VIDEOS}/${id}/delete`;
    } else {
      return DELETE_VIDEO;
    }
  },
};

export default routes;

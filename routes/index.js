// ? Global
const HOME = '/';
const GET_JOIN = '/join';
const POST_JOIN = '/join-confirm';
const GET_LOGIN = '/login';
const POST_LOGIN = '/login-confirm';
const LOGOUT = '/logout';
const SEARCH = '/search';

// ? Users
const USERS = '/users';
const USER_DETAIL = '/:id';
const EDIT_PROFILE = '/edit-profile';
const CHANGE_PASSWORD = '/change-password';
const ME = '/me';

// ? Videos
const VIDEOS = '/videos';
const GET_UPLOAD = '/upload';
const POST_UPLOAD = '/upload-confirm';
const VIDEO_DETAIL = '/:id';
const GET_EDIT_VIDEO = '/:id/edit';
const POST_EDIT_VIDEO = '/edit-confirm';
const DELETE_VIDEO = '/:id/delete';

// ? Github
const GITHUB = '/auth/github';
const GITHUB_CALLBACK = '/auth/github/callback';

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
    }
    return USER_DETAIL;
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  videos: VIDEOS,
  getUpload: GET_UPLOAD,
  postUpload: POST_UPLOAD,
  videoDetail: id => {
    if (id) {
      return `${VIDEOS}/${id}`;
    }
    return VIDEO_DETAIL;
  },
  editVideo: id => {
    if (id) {
      return `${VIDEOS}/${id}/edit`;
    }
    return GET_EDIT_VIDEO;
  },
  postEditVideo: POST_EDIT_VIDEO,
  deleteVideo: id => {
    if (id) {
      return `${VIDEOS}/${id}/delete`;
    }
    return DELETE_VIDEO;
  },
  github: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  me: ME,
};

export default routes;

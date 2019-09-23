// Home
const HOME = '/';



// Board

const BOARD = "/boards";
const UPLOAD = "/";
const BOARDLIST = "/";
const BOARDDETAIL = "/:id";
const BOARDDELETE = "/:id";
const BOARDUPDATE = "/:id";
const IMAGES = '/images';
const VIDEO = '/video';
const REMOVEIMAGE = '/image/:fileName';
const COMMENT = '/:id/comment';

// USER
const USER = "/user";
const USERJOIN = "/";
const USERLOGIN = "/login";
const USERLOGOUT = '/logout';
const LOADUSER = '/';

const routes = {
  board: BOARD,
  upload: UPLOAD,
  boardList: BOARDLIST,
  boardDetail: BOARDDETAIL,
  boardDelete: BOARDDELETE,
  boardUpdate: BOARDUPDATE,
  images: IMAGES,
  video: VIDEO,
  removeImage: REMOVEIMAGE,
  user: USER,
  userJoin: USERJOIN,
  userLogin: USERLOGIN,
  userLogout: USERLOGOUT,
  loadUser: LOADUSER,
  home: HOME,
  comment: COMMENT
};

export default routes;

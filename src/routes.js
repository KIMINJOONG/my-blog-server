// Home
const HOME = '/';



// Board

const BOARD = "/boards";
const UPLOAD = "/";
const BOARDLIST = "/";
const BOARDDETAIL = "/:id";
const BOARDDELETE = "/:id";
const BOARDUPDATE = "/:id";
const UPLOADIMAGES = '/images';
const COMMENT = '/:id/comment';

// USER
const USER = "/user";
const USERJOIN = "/";
const USERLOGIN = "/login";
const USERLOGOUT = '/logout';
const LOADUSER = '/detail';

const routes = {
  board: BOARD,
  upload: UPLOAD,
  boardList: BOARDLIST,
  boardDetail: BOARDDETAIL,
  boardDelete: BOARDDELETE,
  boardUpdate: BOARDUPDATE,
  uploadImages: UPLOADIMAGES,
  user: USER,
  userJoin: USERJOIN,
  userLogin: USERLOGIN,
  userLogout: USERLOGOUT,
  loadUser: LOADUSER,
  home: HOME,
  comment: COMMENT
};

export default routes;

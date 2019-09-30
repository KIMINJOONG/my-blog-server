// Home
const HOME = '/';



// Board

const BOARDS = "/boards";
const BOARD = '/board';
const UPLOAD = "/";
const BOARDLIST = "/:categoryId";
const BOARDDETAIL = "/:id";
const BOARDDELETE = "/:id";
const BOARDUPDATE = "/:id";
const IMAGES = '/images';
const REMOVEIMAGE = '/image/:fileName';
const COMMENT = '/:id/comment';

// USER
const USER = "/user";
const USERJOIN = "/";
const USERLOGIN = "/login";
const USERLOGOUT = '/logout';
const LOADUSER = '/';

const routes = {
  boards: BOARDS,
  board: BOARD,
  upload: UPLOAD,
  boardList: BOARDLIST,
  boardDetail: BOARDDETAIL,
  boardDelete: BOARDDELETE,
  boardUpdate: BOARDUPDATE,
  images: IMAGES,
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

// Home
const HOME = '/';



// Board

const BOARD = "/board";
const UPLOAD = "/upload";
const SEARCH = '/list/:searchTerm';
const BOARDLIST = "/list";
const BOARDDETAIL = "/:id";
const BOARDDELETE = "/:id";
const BOARDUPDATE = "/:id";
const UPLOADIMAGES = '/images';
const COMMENT = '/:id/comment';

// USER
const USER = "/user";
const USERJOIN = "/join";
const USERLOGIN = "/login";
const USERLOGOUT = '/logout';
const LOADUSER = '/detail';

const routes = {
  board: BOARD,
  upload: UPLOAD,
  search: SEARCH,
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

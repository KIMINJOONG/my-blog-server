import express from "express";
import routes from "../routes";
import {
  postUpload,
  searchBoard,
  getList,
  getDetail,
  boardDelete,
  boardUpdate,
  uploadImages,
  postAddComment
} from "../controller/BoardController";
import { isLoggedIn } from "../utils/checkLogin";
import multer from 'multer';
import path from 'path';

const boardRouter = express.Router();
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + new Date().valueOf() + ext);
    }
  }),
  limits: { fileSize: 20 * 1024 * 1024}
});

boardRouter.post(routes.upload, postUpload);
boardRouter.get(routes.search, searchBoard)
boardRouter.get(routes.boardList, getList);
boardRouter.get(routes.boardDetail, getDetail);
boardRouter.delete(routes.boardDelete, boardDelete);
boardRouter.put(routes.boardUpdate, boardUpdate);
boardRouter.post(routes.uploadImages, upload.array('image') ,uploadImages);
boardRouter.post(routes.comment, isLoggedIn, postAddComment);

export default boardRouter;

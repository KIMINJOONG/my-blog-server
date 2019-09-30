import express from "express";
import routes from "../routes";
import {
  postUpload,
  getList,
  getDetail,
  boardDelete,
  boardUpdate,
  uploadImages,
  postAddComment,
  removeImage
} from "../controller/BoardController";
import { isLoggedIn, isNotLoggedIn } from "../utils/checkLogin";
import multer from 'multer';
import path from 'path';
import { uploadImage, multerImages } from "../middlewares";

const boardRouter = express.Router();
// 파일업로드를 위한 multer 설정
const upload = multer({
  storage: multer.diskStorage({
      destination(req, file, done) {
          done(null, 'src/uploads');
      },  
      filename(req, file, done) {
          const ext = path.extname(file.originalname);
          const basename = path.basename(file.originalname, ext); // 제로초.png, ext=== .png, basename === 제로초
          done(null, basename + new Date().valueOf() + ext); // 파일명이 같더라도 업로드하는 시간을 넣어줌으로써 기존파일에 덮어씌우는것을 방지
      }
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, //용량을 제한 현재 최대 20mb 해커들이 서버를 공격못하게 제한해주는게 좋다
});

boardRouter.post(routes.upload, isLoggedIn, multerImages.none(), postUpload);
boardRouter.get(routes.boardDetail, getDetail);
boardRouter.delete(routes.boardDelete, isLoggedIn, boardDelete);
boardRouter.delete(routes.removeImage, isLoggedIn, removeImage);
boardRouter.put(routes.boardUpdate, isLoggedIn, boardUpdate);
boardRouter.post(routes.images, isLoggedIn, multerImages.array('image') ,uploadImages);
boardRouter.post(routes.comment, isLoggedIn, postAddComment);

export default boardRouter;

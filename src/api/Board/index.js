import express from 'express';
import boardController from './controller';
import { isLoggedIn } from '../../utils/checkLogin';
import { multerImages } from '../../middlewares';

const router = express.Router();
router.post('/', isLoggedIn, multerImages.none(), boardController.uploadBoard);
router.put('/:id', isLoggedIn, boardController.updateBoard);
router.delete('/:id', isLoggedIn, boardController.deleteBoard);
router.get('/:id', boardController.getBoard);
router.post(
  '/images',
  isLoggedIn,
  multerImages.array('image'),
  boardController.uploadImages,
);
router.delete('/image/:fileName', isLoggedIn, boardController.removeImage);
router.post('/:id/comment', isLoggedIn, boardController.insertComment);

export default router;

import express from 'express';
import boardsController from './controller';

const router = express.Router();
router.get('/:categoryId', boardsController.getBoardList);

export default router;
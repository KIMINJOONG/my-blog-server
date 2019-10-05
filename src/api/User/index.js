import express from 'express';
import userController from './controller';

const router = express.Router();
router.post('/', userController.join);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/', userController.getUser);

export default router;
import express from 'express';
import userController from './controller';
import { isLoggedIn, isNotLoggedIn } from '../../utils/checkLogin';

const router = express.Router();
router.post('/', userController.join);
router.post('/login', isNotLoggedIn, userController.login);
router.post('/logout', isLoggedIn, userController.logout);
router.get('/', isLoggedIn, userController.getUser);

export default router;

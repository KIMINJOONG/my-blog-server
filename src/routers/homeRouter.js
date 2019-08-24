import express from 'express';
import routes from '../routes';
import { loadUser } from '../controller/UserController';
import { isLoggedIn } from '../utils/checkLogin';

const homeRouter = express.Router();

homeRouter.get(routes.home, isLoggedIn ,loadUser);

export default homeRouter;

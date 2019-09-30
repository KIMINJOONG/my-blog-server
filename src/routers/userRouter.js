import express from "express";
import routes from "../routes";
import { userJoin, postLogin, userLogout, loadUser } from "../controller/UserController";
import { isLoggedIn, isNotLoggedIn } from "../utils/checkLogin";

const userRouter = express.Router();

userRouter.post(routes.userJoin, isNotLoggedIn, userJoin);
userRouter.post(routes.userLogin, postLogin);
userRouter.post(routes.userLogout, isLoggedIn, userLogout);
userRouter.get(routes.loadUser, isLoggedIn, loadUser);

export default userRouter;

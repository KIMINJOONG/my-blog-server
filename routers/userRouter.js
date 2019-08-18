import express from "express";
import routes from "../routes";
import { userJoin, postLogin, userLogout, loadUser } from "../controller/UserController";
import { isLoggedIn } from "../utils/checkLogin";

const userRouter = express.Router();

userRouter.post(routes.userJoin, userJoin);
userRouter.post(routes.userLogin, postLogin);
userRouter.post(routes.userLogout, userLogout);
userRouter.post(routes.loadUser,isLoggedIn, loadUser);

export default userRouter;

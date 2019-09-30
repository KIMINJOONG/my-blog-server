import express from "express";
import routes from "../routes";
import { getList } from "../controller/BoardController";

const boardsRouter = express.Router();

boardsRouter.get(routes.boardList, getList);

export default boardsRouter;
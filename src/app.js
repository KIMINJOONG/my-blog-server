import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import boardRouter from "./routers/boardRouter";
import userRouter from "./routers/userRouter";
import routes from "./routes";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import expressSession from "express-session";
import cookieParser from "cookie-parser";
import homeRouter from "./routers/homeRouter";
dotenv.config();
const app = express();
app.use(helmet());
app.use(morgan("dev"));
// app.use('/', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
    expressSession({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
        secure: false //https를 쓸때 true
      },
    })
  );


app.use(routes.home, homeRouter);
app.use(routes.board, boardRouter);
app.use(routes.user, userRouter);

export default app;

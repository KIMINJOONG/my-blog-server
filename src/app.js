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
import passportConfig from './passport';
import passport from 'passport';

dotenv.config();
passportConfig();
const app = express();
const prod = process.env.PRODUCTION;

if (prod) {
  app.use(morgan('combined'));
  app.use(cors({
    origin: /kohubi\.me$/,
    credentials: true,
  }));
} else {
  app.use(morgan('dev'));
  app.use(cors({
    origin: true,
    credentials: true,
  }));
}
app.use(helmet());
app.use('/', express.static('./src/uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
    expressSession({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
        secure: prod, // https를 쓸 때 true
        domain: prod && '.kohubi',
      },
    })
  );
app.use(passport.initialize());
app.use(passport.session());

app.use(routes.home, homeRouter);
app.use(routes.board, boardRouter);
app.use(routes.user, userRouter);

export default app;

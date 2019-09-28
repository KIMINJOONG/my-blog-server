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
app.set('trust proxy', 1); // nginx로 proxy_pass설정을 하여 접근할때 가장 중요! 꼭 추가해주기 안해주면 쿠키안심어짐
app.use(
    expressSession({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
        secure: prod, // https를 쓸 때 true
        domain: prod ? 'kohubi.me' : 'localhost',
      },
    })
  );
app.use(passport.initialize());
app.use(passport.session());

app.use(routes.home, homeRouter);
app.use(routes.board, boardRouter);
app.use(routes.user, userRouter);

export default app;

import User from "../models/User";
import { savePassword, comparePassword } from "../utils/password";
import createJWT from "../utils/createJWT";

export const userJoin = async (req, res) => {
  const {
    body: {
      id,
      password
    }
  } = req;
  const user = await User.findOne({id});
  if(user) {
    return res.status(401).send("이미 존재하는 아이디입니다.");
  }
  const hashedPassword = await savePassword(password);
  await User.create({
    id,
    password: hashedPassword
  });
  return res.status(200).json({ok : true});
};

export const userLogout = (req, res) => {
  res.clearCookie("token")
  res.send("로그아웃 성공");
}

export const postLogin = async (req, res) => {
  const {
    body: {
      id, 
      password
    }
  } = req;
  const user = await User.findOne({ id });
  const isLogin = await comparePassword(password, user.password);
  if (isLogin) {
    const token = createJWT(user.id);
    res.cookie("token", token);
    res.cookie('token', token, { expires: new Date(Date.now() + 900000) });
    const filteredUser = Object.assign({}, user.toJSON());
    delete filteredUser.password;
    return res.status(200).json(filteredUser);
  } else {
    return res.status(401).json({
      token: null,
      ok: false,
      error: "패스워드를 잘못입력하셨습니다."
    });
  }
};

export const loadUser = async (req, res) => {
  const user = req.user;
  if(user) {
    const filteredUser = Object.assign({}, user.toJSON());
    delete filteredUser.password;
    return res.json(filteredUser);
  } else {
    return res.status(401).send('로그인을 재시도하여주세요.');
  }
  
}

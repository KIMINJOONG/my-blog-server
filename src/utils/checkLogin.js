import decodeJWT from './decodeJWT';

export const isLoggedIn = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).send('로그인이 필요합니다.');
  // const token = req.headers.cookie ? req.headers.cookie.split('=')[1] : ''
  // if(token) {
  //     const user = await decodeJWT(token);
  //     if(user){
  //         req.user = user;
  //         next();
  //     } else {
  //         res.status(401).send('알수없는 유저입니다.');
  //     }
  // } else {
  //     res.status(401).send('로그인을 해주세요.');
  // }
};

export const isNotLoggedIn = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  return res.status(401).send('이미 로그인 되어있습니다.');
};

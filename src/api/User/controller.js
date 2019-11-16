import passport from 'passport';
import userService from './service';
import { responseMessage } from '../../statusMessage';

export default {
  join: async (req, res) => {
    const {
      body: { id, password },
    } = req;
    try {
      await userService.join(id, password, res);
      return res.json(responseMessage(true, '회원가입 성공'));
    } catch (error) {
      console.error(error);
      return res.json(error);
    }
  },
  login: async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.json(responseMessage(false, err));
      }
      if (info) {
        return res.json(responseMessage(false, info.reason));
      }
      return req.login(user, async err => {
        // 세션에다 사용자 정보 저장 (어떻게? serializeUser => passport/index.js)
        if (err) {
          return res.json(responseMessage(false, err));
        }
        return res.json(responseMessage(true, '', user));
      });
    })(req, res, next);
  },
  logout: async (req, res, next) => {
    if (req.isAuthenticated()) {
      req.logout();
      req.session.destroy();
      return res.json(responseMessage(true, '로그아웃 되었습니다.'));
    } else {
      return res.json(responseMessage(true, '로그아웃을 실패하였습니다.'));
    }
  },
  getUser: async (req, res, next) => {
    const user = req.user;
    if (user) {
      const filteredUser = await userService.getUser(user);
      return res.json(responseMessage(true, '', filteredUser));
    } else {
      return res.status(401).send('로그인을 재시도하여주세요.');
    }
  },
};

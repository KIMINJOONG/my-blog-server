import passport from 'passport';
import userService from './service';

export default {
    join: async(req, res) => {
        const {
            body: {
              id,
              password
            }
          } = req;
          try {
            await userService.join(id, password);
            return res.status(200).json('회원 가입 성공')
          }catch(error) {
            console.error(error);
            return res.status(500).json(error);
          }
    },
    login: async(req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if(err) {
                console.error(err);
                return next(err);
            }
            if(info) {
                return res.status(401).send(info.reason);
            }
            return req.login(user, async (err) => { // 세션에다 사용자 정보 저장 (어떻게? serializeUser => passport/index.js)
                if(err) {
                    console.error(err);
                    return next(err);
                }
                return res.json(user);
            });
          })(req, res, next);
    },
    logout: async(req, res, next) => {
        if(req.isAuthenticated()) {
            req.logout();
            req.session.destroy();
            return res.status(200).send('로그아웃 되었습니다.');
          } else {
            return res.status(401).send('로그인이 되지 않았습니다.');
          }
    },
    getUser: async(req, res, next) => {
        const user = req.user;
        if(user) {
          const filteredUser = userService.getUser(user);
            return res.json(filteredUser);
        } else {
            return res.status(401).send('로그인을 재시도하여주세요.');
        }
    }
}
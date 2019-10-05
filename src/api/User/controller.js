import User from "../../models/User";
import { savePassword } from "../../utils/password";
import passport from 'passport';

export default {
    join: async(req, res) => {
        const {
            body: {
              id,
              password
            }
          } = req;
          try {
            const user = await User.findOne({id});
            if(user) {
              return res.status(401).send("이미 존재하는 아이디입니다.");
            }
            const hashedPassword = await savePassword(password);
            const loginUser = await User.create({
              id,
              password: hashedPassword
            });
            if(!loginUser) {
              return res.status(401).send('비밀번호가 틀렸습니다.');
            }
            return res.status(200).json({ok : true});
          }catch(error) {
            console.error(error);
            return res.status(500).send('회원가입 서버 오류');
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
            const filteredUser = Object.assign({}, user.toJSON());
            delete filteredUser.password;
            return res.json(filteredUser);
        } else {
            return res.status(401).send('로그인을 재시도하여주세요.');
        }
    }
}
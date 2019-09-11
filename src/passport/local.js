import passport from 'passport';
import { comparePassword } from '../utils/password';
import User from '../models/User';
import { Strategy } from 'passport-local';

export default () => {
    passport.use(new Strategy({
        usernameField: 'id', // req.body.id
        passwordField: 'password', // req.body.password
    }, async (id, password, done) => {
        try {
            const exUser = await User.findOne({ id });
            if(!exUser) {
                //done(에러, 성공, 실패)
                return done(null, false, { reason: '존재하지 않는 사용자입니다.' });
            }
            const result = await comparePassword(password, exUser.password);
            if(result) {
                return done(null, exUser);
            } else {
                return done(null, false, { reason : '비밀번호가 틀립니다.' });
            }
        }catch(err) {
            console.log(err);
            return done(err);
        }
        
    }));
};
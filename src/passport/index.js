import passport from 'passport';
import local from './local';
import User from "../models/User";

export default () => {
    passport.serializeUser((user, done) => {
        return done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try{
            const user = await User.findOne({ id });
            return done(null, user); // req.user 와 req.isAuthenticated() === true 로 만들어줌
        } catch(err) {
            console.error(err);
            return done(err);
        }
        

    });
    local();
}
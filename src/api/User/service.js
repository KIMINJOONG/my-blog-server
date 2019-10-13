import { savePassword } from "../../utils/password";
import User from '../../models/User';

export default {
    join: async(id, password) => {
          try {
            const user = await User.findOne({id});
            if(user) {
              throw Error('이미 존재하는 아이디입니다.');
            }
            const hashedPassword = await savePassword(password);
            const joinUser = await User.create({
              id,
              password: hashedPassword
            });
          }catch(error) {
              throw Error(error);
          }
    },
    getUser: async(user) => {
            const filteredUser = Object.assign({}, user.toJSON());
            delete filteredUser.password;
            return filteredUser;
    }
}
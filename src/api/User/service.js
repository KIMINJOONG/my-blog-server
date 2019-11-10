import { savePassword } from "../../utils/password";
import User from '../../models/User';
import { responseMessage } from "../../statusMessage";

export default {
    join: async(id, password, res) => {
          try {
            const user = await User.findOne({id});
            if(user) {
              return res.json(responseMessage(false, '이미 존재하는 아이디입니다.'));
            }
            const hashedPassword = await savePassword(password);
            const joinUser = await User.create({
              id,
              password: hashedPassword
            });
          }catch(error) {
              return res.json(responseMessage(false, error));
          }
    },
    getUser: async(user) => {
            const filteredUser = Object.assign({}, user.toJSON());
            delete filteredUser.password;
            return filteredUser;
    }
}
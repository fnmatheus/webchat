import User from '../database/schemas/User';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/auth';

class LoginService {
  public async login(email, password) {
    const user = await User.findOne({ email });
    if (user) {
      const validatePassoword = await bcrypt.compare(password, user.password).then((res) => res);
      if (!validatePassoword) return { type: 'Wrong', message:'WrongPassoword' };
      const token = generateToken({ username: user.username, email: user.email });
      return { type: null, message: token };
    }
    return { type: 'NotFound', message: 'UserNotFound' };
  }
};

export default new LoginService;

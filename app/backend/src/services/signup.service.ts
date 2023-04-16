import User from '../database/schemas/User';
import bcrypt from 'bcrypt';

class SignUpService {
  public async newUser(username, email, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      return { type: null, message: user };
    } catch (error) {
      return { type: 'Registration Error', message: error };
    }
  }
};

export default new SignUpService;

import User from '../database/schemas/User';

class UserSerive {
  public async findUser(username) {
    const user = await User.findOne({ username });
    if (user) return user.username;
    return false;
  }
}

export default new UserSerive;

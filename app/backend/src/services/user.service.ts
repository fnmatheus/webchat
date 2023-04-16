import User from '../database/schemas/User';

class UserSerive {
  public async findUser(username) {
    const user = await User.findOne({ username });
    if (user) return { user: user.username, socketId: user.socketId };
    return false;
  }

  public async insertSocketId(id, username) {
    await User.updateOne({ username }, { socketId: id });
  }
}

export default new UserSerive;

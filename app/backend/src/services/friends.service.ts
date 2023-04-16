import Friends from '../database/schemas/Friends';

class FriendsService {
  public async createUserFriendList(username) {
    await Friends.create({ _id: username, friends: [],
      requests: [] });
  }
  public async getFriendList(username) {
    const friendList = await Friends.findById(username);
    if (friendList) return friendList;
    return false
  }
  public async addRequest(username, requestUsername) {
    const friendList = await Friends.findById(requestUsername);
    if (friendList) {
      const { requests } = friendList;
      if (requests.includes(username)) return false;
      await Friends.updateOne({ _id: requestUsername }, { requests: [...requests, username] });
      const newFriendList = await Friends.findById(requestUsername);
      return newFriendList;
    }
  }
};

export default new FriendsService;

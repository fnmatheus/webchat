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
    const requestFriendList = await Friends.findById(requestUsername);
    const userFriendList = await Friends.findById(username);
    if (requestFriendList && userFriendList) {
      const { requests, friends } = requestFriendList;
      if (requests.includes(username)
        || userFriendList.requests.includes(requestUsername)
        || friends.includes(username)
      ) return false;
      await Friends.updateOne({ _id: requestUsername }, { requests: [...requests, username] });
      const newFriendList = await Friends.findById(requestUsername);
      return newFriendList;
    }
  }
  public async acceptRequest(username, requestUsername) {
    const userFriendList = await Friends.findById(username);
    const requestFriendList = await Friends.findById(requestUsername);
    if (userFriendList && requestFriendList) {
      const { requests, friends } = userFriendList
      const newRequests = requests.filter((request) => request !== requestUsername);
      await Friends.updateOne({ _id: username }, { requests: [...newRequests], friends: [...friends, requestUsername] });
      await Friends.updateOne({ _id: requestUsername }, { friends: [...requestFriendList.friends, username] });
      const newUserFriendList = await Friends.findById(username);
      const newRequestFriendList = await Friends.findById(requestUsername);
      if (newUserFriendList && newRequestFriendList) return { newUserFriendList, newRequestFriendList };
    }
  }
};

export default new FriendsService;

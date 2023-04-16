import { io } from './app';
import { ITokenPayload } from './interfaces';
import jwt_decode from 'jwt-decode';
import FriendsService from './services/friends.service';
import UserService from './services/user.service';

io.on('connection', (socket) => {
  socket.on('login', async (data) => {
    const { token } = data;
    if (token) {
      const { username }: ITokenPayload = jwt_decode(token);
      await UserService.insertSocketId(socket.id, username);
      const friendListExist = await FriendsService.getFriendList(username);
      if (!friendListExist) {
        await FriendsService.createUserFriendList(username);
      }
      const friendList = await FriendsService.getFriendList(username);
      socket.emit('friendList', { friendList });
    }
  });
  socket.on('friendRequest', async (data) => {
    const { token, requestUsername } = data;
    if (token) {
      const { username }: ITokenPayload = jwt_decode(token);
      if (username !== requestUsername) {
        const isValidUser = await UserService.findUser(requestUsername);
        if (!isValidUser) socket.emit('requestFail');
        if (isValidUser) {
          const friendListExist = await FriendsService.getFriendList(requestUsername);
          if (!friendListExist) {
            await FriendsService.createUserFriendList(requestUsername);
          }
          const newFriendList = await FriendsService.addRequest(username, requestUsername);
          if (!newFriendList) socket.emit('requestAlreadySent');
          if (newFriendList) {
            socket.emit('requestSent');
            io.to(isValidUser.socketId).emit('friendList', { friendList: newFriendList });
          }
        }
      }
    }
  });
});

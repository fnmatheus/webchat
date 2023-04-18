import { io } from './app';
import { IAcceptRequest, ITokenPayload } from './interfaces';
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
  socket.on('acceptRequest', async (data) => {
    const { token, requestUsername } = data;
    if (token) {
      const { username }: ITokenPayload = jwt_decode(token);
      const isValidUser = await UserService.findUser(username);
      const isValidRequestUser = await UserService.findUser(requestUsername);
      const response = await FriendsService.acceptRequest(username, requestUsername);
      if (response && isValidUser && isValidRequestUser) {
        const { newRequestFriendList, newUserFriendList } = response;
        io.to(isValidUser.socketId).emit('friendList', { friendList: newUserFriendList });
        io.to(isValidRequestUser.socketId).emit('friendList', { friendList: newRequestFriendList });
      }
    }
  });
  socket.on('declineRequest', async () => {});
});

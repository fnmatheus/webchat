export interface ITokenPayload {
  username:string,
  email:string,
}

export interface IFriendIterface {
  _id: String | undefined,
  friends: [String],
  requests: [String],
}

export interface IAcceptRequest {
  newUserFriendList: IFriendIterface,
  newRequestFriendList: IFriendIterface,
} 

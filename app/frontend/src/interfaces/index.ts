export interface IRequestListProps {
  setRequestInput: Function,
  handleAdd: Function,
  failRequest: String | undefined,
  sucessRequest: String | undefined,
  requestList: [String] | undefined,
}

export interface IFriendListProps {
  setSearchFriendInput: Function,
  friendList: [String] | undefined,
}

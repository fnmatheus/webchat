export interface IRequestListProps {
  setRequestInput: Function,
  handleAdd: Function,
  failRequest: String | undefined,
  sucessRequest: String | undefined,
  requestList: [String] | undefined,
  handleAccept: Function,
  handleDecline: Function,
}

export interface IFriendListProps {
  friendList: [String] | undefined,
  setSearchFriendInput: Function,
}

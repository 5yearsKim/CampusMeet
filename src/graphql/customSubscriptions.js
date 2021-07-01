export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($chatRoomID: ID!) {
    onCreateMessage(chatRoomID: $chatRoomID) {
      id
      type
      createdAt
      content
      userID
      chatRoomID
      updatedAt
      checked
      user {
        id
        gender
        name
        imageKeys
      }
    }
  }
`;

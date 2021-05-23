export const createMatch = /* GraphQL */ `
  mutation CreateMatch(
    $input: CreateMatchInput!
    $condition: ModelMatchConditionInput
  ) {
    createMatch(input: $input, condition: $condition) {
      id
      fromID
      toID
      chatRoomID
      createdAt
      updatedAt
    }
  }
`;
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
      userID
      boardID
      nickname
      title
      content
      imageKeys
      deleted
      comments {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;

export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      userID
      postID
      nickname
      content
      deleted
      nestedComments {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;

export const createNestedComment = /* GraphQL */ `
  mutation CreateNestedComment(
    $input: CreateNestedCommentInput!
    $condition: ModelNestedCommentConditionInput
  ) {
    createNestedComment(input: $input, condition: $condition) {
      id
      userID
      commentID
      nickname
      content
      deleted
      createdAt
      updatedAt
    }
  }
`;

export const createSignal = /* GraphQL */ `
  mutation CreateSignal(
    $input: CreateSignalInput!
    $condition: ModelSignalConditionInput
  ) {
    createSignal(input: $input, condition: $condition) {
      id
      fromID
      toID
      alive
      message
      createdAt
      updatedAt
    }
  }
`;

export const updateSignal = /* GraphQL */ `
  mutation UpdateSignal(
    $input: UpdateSignalInput!
    $condition: ModelSignalConditionInput
  ) {
    updateSignal(input: $input, condition: $condition) {
      id
      fromID
      toID
      alive
      message
      createdAt
      updatedAt
    }
  }
`;


export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      id
      type
      createdAt
      content
      userID
      chatRoomID
      updatedAt
    }
  }
`;

export const createLikePost = /* GraphQL */ `
  mutation CreateLikePost(
    $input: CreateLikePostInput!
    $condition: ModelLikePostConditionInput
  ) {
    createLikePost(input: $input, condition: $condition) {
      id
      userID
      postID
      createdAt
      updatedAt
    }
  }
`;
export const createLikeComment = /* GraphQL */ `
  mutation CreateLikeComment(
    $input: CreateLikeCommentInput!
    $condition: ModelLikeCommentConditionInput
  ) {
    createLikeComment(input: $input, condition: $condition) {
      id
      userID
      commentID
      createdAt
      updatedAt
    }
  }
`;

export const createChatRoom = /* GraphQL */ `
  mutation CreateChatRoom(
    $input: CreateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    createChatRoom(input: $input, condition: $condition) {
      id
      lastMessageID
      createdAt
      updatedAt
    }
  }
`;

export const createBoard = /* GraphQL */ `
  mutation CreateBoard(
    $input: CreateBoardInput!
    $condition: ModelBoardConditionInput
  ) {
    createBoard(input: $input, condition: $condition) {
      id
      userID
      name
      description
      type
      like
      createdAt
      updatedAt
    }
  }
`;

export const deleteSignal = /* GraphQL */ `
  mutation DeleteSignal(
    $input: DeleteSignalInput!
    $condition: ModelSignalConditionInput
  ) {
    deleteSignal(input: $input, condition: $condition) {
      id
      fromID
      toID
      message
      createdAt
      updatedAt
    }
  }
`;


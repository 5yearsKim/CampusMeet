/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      gender
      name
      campus
      graduate
      year
      department
      division
      imageKeys
      profileMessage
      profileDescription
      status
      pushToken
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      gender
      name
      campus
      graduate
      year
      department
      division
      imageKeys
      profileMessage
      profileDescription
      status
      pushToken
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      gender
      name
      campus
      graduate
      year
      department
      division
      imageKeys
      profileMessage
      profileDescription
      status
      pushToken
      createdAt
      updatedAt
    }
  }
`;
export const createPreference = /* GraphQL */ `
  mutation CreatePreference(
    $input: CreatePreferenceInput!
    $condition: ModelPreferenceConditionInput
  ) {
    createPreference(input: $input, condition: $condition) {
      id
      likeGender
      likeGraduate
      likeCampus
      likeDepartment
      createdAt
      updatedAt
    }
  }
`;
export const updatePreference = /* GraphQL */ `
  mutation UpdatePreference(
    $input: UpdatePreferenceInput!
    $condition: ModelPreferenceConditionInput
  ) {
    updatePreference(input: $input, condition: $condition) {
      id
      likeGender
      likeGraduate
      likeCampus
      likeDepartment
      createdAt
      updatedAt
    }
  }
`;
export const deletePreference = /* GraphQL */ `
  mutation DeletePreference(
    $input: DeletePreferenceInput!
    $condition: ModelPreferenceConditionInput
  ) {
    deletePreference(input: $input, condition: $condition) {
      id
      likeGender
      likeGraduate
      likeCampus
      likeDepartment
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
      state
      checked
      message
      createdAt
      receiver {
        id
        gender
        name
        campus
        graduate
        year
        department
        division
        imageKeys
        profileMessage
        profileDescription
        status
        pushToken
        createdAt
        updatedAt
      }
      sender {
        id
        gender
        name
        campus
        graduate
        year
        department
        division
        imageKeys
        profileMessage
        profileDescription
        status
        pushToken
        createdAt
        updatedAt
      }
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
      state
      checked
      message
      createdAt
      receiver {
        id
        gender
        name
        campus
        graduate
        year
        department
        division
        imageKeys
        profileMessage
        profileDescription
        status
        pushToken
        createdAt
        updatedAt
      }
      sender {
        id
        gender
        name
        campus
        graduate
        year
        department
        division
        imageKeys
        profileMessage
        profileDescription
        status
        pushToken
        createdAt
        updatedAt
      }
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
      state
      checked
      message
      createdAt
      receiver {
        id
        gender
        name
        campus
        graduate
        year
        department
        division
        imageKeys
        profileMessage
        profileDescription
        status
        pushToken
        createdAt
        updatedAt
      }
      sender {
        id
        gender
        name
        campus
        graduate
        year
        department
        division
        imageKeys
        profileMessage
        profileDescription
        status
        pushToken
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
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
      matcher {
        id
        gender
        name
        campus
        graduate
        year
        department
        division
        imageKeys
        profileMessage
        profileDescription
        status
        pushToken
        createdAt
        updatedAt
      }
      chatRoom {
        id
        lastMessageID
        lastMessage {
          id
          type
          createdAt
          content
          userID
          chatRoomID
          checked
          updatedAt
        }
        matches {
          nextToken
        }
        messages {
          nextToken
        }
        createdAt
        updatedAt
      }
      deleted
      checked
      updatedAt
    }
  }
`;
export const updateMatch = /* GraphQL */ `
  mutation UpdateMatch(
    $input: UpdateMatchInput!
    $condition: ModelMatchConditionInput
  ) {
    updateMatch(input: $input, condition: $condition) {
      id
      fromID
      toID
      chatRoomID
      createdAt
      matcher {
        id
        gender
        name
        campus
        graduate
        year
        department
        division
        imageKeys
        profileMessage
        profileDescription
        status
        pushToken
        createdAt
        updatedAt
      }
      chatRoom {
        id
        lastMessageID
        lastMessage {
          id
          type
          createdAt
          content
          userID
          chatRoomID
          checked
          updatedAt
        }
        matches {
          nextToken
        }
        messages {
          nextToken
        }
        createdAt
        updatedAt
      }
      deleted
      checked
      updatedAt
    }
  }
`;
export const deleteMatch = /* GraphQL */ `
  mutation DeleteMatch(
    $input: DeleteMatchInput!
    $condition: ModelMatchConditionInput
  ) {
    deleteMatch(input: $input, condition: $condition) {
      id
      fromID
      toID
      chatRoomID
      createdAt
      matcher {
        id
        gender
        name
        campus
        graduate
        year
        department
        division
        imageKeys
        profileMessage
        profileDescription
        status
        pushToken
        createdAt
        updatedAt
      }
      chatRoom {
        id
        lastMessageID
        lastMessage {
          id
          type
          createdAt
          content
          userID
          chatRoomID
          checked
          updatedAt
        }
        matches {
          nextToken
        }
        messages {
          nextToken
        }
        createdAt
        updatedAt
      }
      deleted
      checked
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
      lastMessage {
        id
        type
        createdAt
        content
        userID
        chatRoomID
        checked
        user {
          id
          gender
          name
          campus
          graduate
          year
          department
          division
          imageKeys
          profileMessage
          profileDescription
          status
          pushToken
          createdAt
          updatedAt
        }
        chatRoom {
          id
          lastMessageID
          createdAt
          updatedAt
        }
        updatedAt
      }
      matches {
        items {
          id
          fromID
          toID
          chatRoomID
          createdAt
          deleted
          checked
          updatedAt
        }
        nextToken
      }
      messages {
        items {
          id
          type
          createdAt
          content
          userID
          chatRoomID
          checked
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateChatRoom = /* GraphQL */ `
  mutation UpdateChatRoom(
    $input: UpdateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    updateChatRoom(input: $input, condition: $condition) {
      id
      lastMessageID
      lastMessage {
        id
        type
        createdAt
        content
        userID
        chatRoomID
        checked
        user {
          id
          gender
          name
          campus
          graduate
          year
          department
          division
          imageKeys
          profileMessage
          profileDescription
          status
          pushToken
          createdAt
          updatedAt
        }
        chatRoom {
          id
          lastMessageID
          createdAt
          updatedAt
        }
        updatedAt
      }
      matches {
        items {
          id
          fromID
          toID
          chatRoomID
          createdAt
          deleted
          checked
          updatedAt
        }
        nextToken
      }
      messages {
        items {
          id
          type
          createdAt
          content
          userID
          chatRoomID
          checked
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteChatRoom = /* GraphQL */ `
  mutation DeleteChatRoom(
    $input: DeleteChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    deleteChatRoom(input: $input, condition: $condition) {
      id
      lastMessageID
      lastMessage {
        id
        type
        createdAt
        content
        userID
        chatRoomID
        checked
        user {
          id
          gender
          name
          campus
          graduate
          year
          department
          division
          imageKeys
          profileMessage
          profileDescription
          status
          pushToken
          createdAt
          updatedAt
        }
        chatRoom {
          id
          lastMessageID
          createdAt
          updatedAt
        }
        updatedAt
      }
      matches {
        items {
          id
          fromID
          toID
          chatRoomID
          createdAt
          deleted
          checked
          updatedAt
        }
        nextToken
      }
      messages {
        items {
          id
          type
          createdAt
          content
          userID
          chatRoomID
          checked
          updatedAt
        }
        nextToken
      }
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
      checked
      user {
        id
        gender
        name
        campus
        graduate
        year
        department
        division
        imageKeys
        profileMessage
        profileDescription
        status
        pushToken
        createdAt
        updatedAt
      }
      chatRoom {
        id
        lastMessageID
        lastMessage {
          id
          type
          createdAt
          content
          userID
          chatRoomID
          checked
          updatedAt
        }
        matches {
          nextToken
        }
        messages {
          nextToken
        }
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
      id
      type
      createdAt
      content
      userID
      chatRoomID
      checked
      user {
        id
        gender
        name
        campus
        graduate
        year
        department
        division
        imageKeys
        profileMessage
        profileDescription
        status
        pushToken
        createdAt
        updatedAt
      }
      chatRoom {
        id
        lastMessageID
        lastMessage {
          id
          type
          createdAt
          content
          userID
          chatRoomID
          checked
          updatedAt
        }
        matches {
          nextToken
        }
        messages {
          nextToken
        }
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
      id
      type
      createdAt
      content
      userID
      chatRoomID
      checked
      user {
        id
        gender
        name
        campus
        graduate
        year
        department
        division
        imageKeys
        profileMessage
        profileDescription
        status
        pushToken
        createdAt
        updatedAt
      }
      chatRoom {
        id
        lastMessageID
        lastMessage {
          id
          type
          createdAt
          content
          userID
          chatRoomID
          checked
          updatedAt
        }
        matches {
          nextToken
        }
        messages {
          nextToken
        }
        createdAt
        updatedAt
      }
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
      type
      createdAt
      updatedAt
    }
  }
`;
export const updateLikePost = /* GraphQL */ `
  mutation UpdateLikePost(
    $input: UpdateLikePostInput!
    $condition: ModelLikePostConditionInput
  ) {
    updateLikePost(input: $input, condition: $condition) {
      id
      userID
      postID
      type
      createdAt
      updatedAt
    }
  }
`;
export const deleteLikePost = /* GraphQL */ `
  mutation DeleteLikePost(
    $input: DeleteLikePostInput!
    $condition: ModelLikePostConditionInput
  ) {
    deleteLikePost(input: $input, condition: $condition) {
      id
      userID
      postID
      type
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
      type
      createdAt
      updatedAt
    }
  }
`;
export const updateLikeComment = /* GraphQL */ `
  mutation UpdateLikeComment(
    $input: UpdateLikeCommentInput!
    $condition: ModelLikeCommentConditionInput
  ) {
    updateLikeComment(input: $input, condition: $condition) {
      id
      userID
      commentID
      type
      createdAt
      updatedAt
    }
  }
`;
export const deleteLikeComment = /* GraphQL */ `
  mutation DeleteLikeComment(
    $input: DeleteLikeCommentInput!
    $condition: ModelLikeCommentConditionInput
  ) {
    deleteLikeComment(input: $input, condition: $condition) {
      id
      userID
      commentID
      type
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
      createdAt
      updatedAt
    }
  }
`;
export const updateBoard = /* GraphQL */ `
  mutation UpdateBoard(
    $input: UpdateBoardInput!
    $condition: ModelBoardConditionInput
  ) {
    updateBoard(input: $input, condition: $condition) {
      id
      userID
      name
      description
      type
      createdAt
      updatedAt
    }
  }
`;
export const deleteBoard = /* GraphQL */ `
  mutation DeleteBoard(
    $input: DeleteBoardInput!
    $condition: ModelBoardConditionInput
  ) {
    deleteBoard(input: $input, condition: $condition) {
      id
      userID
      name
      description
      type
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
        items {
          id
          userID
          postID
          nickname
          content
          deleted
          createdAt
          updatedAt
        }
        nextToken
      }
      likes {
        items {
          id
          userID
          postID
          type
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      userID
      boardID
      nickname
      title
      content
      imageKeys
      deleted
      comments {
        items {
          id
          userID
          postID
          nickname
          content
          deleted
          createdAt
          updatedAt
        }
        nextToken
      }
      likes {
        items {
          id
          userID
          postID
          type
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
      userID
      boardID
      nickname
      title
      content
      imageKeys
      deleted
      comments {
        items {
          id
          userID
          postID
          nickname
          content
          deleted
          createdAt
          updatedAt
        }
        nextToken
      }
      likes {
        items {
          id
          userID
          postID
          type
          createdAt
          updatedAt
        }
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
        items {
          id
          userID
          commentID
          nickname
          content
          deleted
          createdAt
          updatedAt
        }
        nextToken
      }
      likes {
        items {
          id
          userID
          commentID
          type
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      userID
      postID
      nickname
      content
      deleted
      nestedComments {
        items {
          id
          userID
          commentID
          nickname
          content
          deleted
          createdAt
          updatedAt
        }
        nextToken
      }
      likes {
        items {
          id
          userID
          commentID
          type
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      userID
      postID
      nickname
      content
      deleted
      nestedComments {
        items {
          id
          userID
          commentID
          nickname
          content
          deleted
          createdAt
          updatedAt
        }
        nextToken
      }
      likes {
        items {
          id
          userID
          commentID
          type
          createdAt
          updatedAt
        }
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
      likes {
        items {
          id
          userID
          commentID
          type
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateNestedComment = /* GraphQL */ `
  mutation UpdateNestedComment(
    $input: UpdateNestedCommentInput!
    $condition: ModelNestedCommentConditionInput
  ) {
    updateNestedComment(input: $input, condition: $condition) {
      id
      userID
      commentID
      nickname
      content
      deleted
      likes {
        items {
          id
          userID
          commentID
          type
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteNestedComment = /* GraphQL */ `
  mutation DeleteNestedComment(
    $input: DeleteNestedCommentInput!
    $condition: ModelNestedCommentConditionInput
  ) {
    deleteNestedComment(input: $input, condition: $condition) {
      id
      userID
      commentID
      nickname
      content
      deleted
      likes {
        items {
          id
          userID
          commentID
          type
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createBlock = /* GraphQL */ `
  mutation CreateBlock(
    $input: CreateBlockInput!
    $condition: ModelBlockConditionInput
  ) {
    createBlock(input: $input, condition: $condition) {
      id
      userID
      objectID
      objectType
      createdAt
      updatedAt
    }
  }
`;
export const updateBlock = /* GraphQL */ `
  mutation UpdateBlock(
    $input: UpdateBlockInput!
    $condition: ModelBlockConditionInput
  ) {
    updateBlock(input: $input, condition: $condition) {
      id
      userID
      objectID
      objectType
      createdAt
      updatedAt
    }
  }
`;
export const deleteBlock = /* GraphQL */ `
  mutation DeleteBlock(
    $input: DeleteBlockInput!
    $condition: ModelBlockConditionInput
  ) {
    deleteBlock(input: $input, condition: $condition) {
      id
      userID
      objectID
      objectType
      createdAt
      updatedAt
    }
  }
`;

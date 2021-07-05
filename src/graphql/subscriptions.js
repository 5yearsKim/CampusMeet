/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($chatRoomID: ID!) {
    onCreateMessage(chatRoomID: $chatRoomID) {
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
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreatePreference = /* GraphQL */ `
  subscription OnCreatePreference {
    onCreatePreference {
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
export const onUpdatePreference = /* GraphQL */ `
  subscription OnUpdatePreference {
    onUpdatePreference {
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
export const onDeletePreference = /* GraphQL */ `
  subscription OnDeletePreference {
    onDeletePreference {
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
export const onCreateSignal = /* GraphQL */ `
  subscription OnCreateSignal {
    onCreateSignal {
      id
      fromID
      toID
      alive
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
export const onUpdateSignal = /* GraphQL */ `
  subscription OnUpdateSignal {
    onUpdateSignal {
      id
      fromID
      toID
      alive
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
export const onDeleteSignal = /* GraphQL */ `
  subscription OnDeleteSignal {
    onDeleteSignal {
      id
      fromID
      toID
      alive
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
export const onCreateMatch = /* GraphQL */ `
  subscription OnCreateMatch {
    onCreateMatch {
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
        createdAt
        updatedAt
      }
      deleted
      checked
      updatedAt
    }
  }
`;
export const onUpdateMatch = /* GraphQL */ `
  subscription OnUpdateMatch {
    onUpdateMatch {
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
        createdAt
        updatedAt
      }
      deleted
      checked
      updatedAt
    }
  }
`;
export const onDeleteMatch = /* GraphQL */ `
  subscription OnDeleteMatch {
    onDeleteMatch {
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
        createdAt
        updatedAt
      }
      deleted
      checked
      updatedAt
    }
  }
`;
export const onCreateChatRoom = /* GraphQL */ `
  subscription OnCreateChatRoom {
    onCreateChatRoom {
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
  }
`;
export const onUpdateChatRoom = /* GraphQL */ `
  subscription OnUpdateChatRoom {
    onUpdateChatRoom {
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
  }
`;
export const onDeleteChatRoom = /* GraphQL */ `
  subscription OnDeleteChatRoom {
    onDeleteChatRoom {
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
  }
`;
export const onCreateLikePost = /* GraphQL */ `
  subscription OnCreateLikePost {
    onCreateLikePost {
      id
      userID
      postID
      type
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateLikePost = /* GraphQL */ `
  subscription OnUpdateLikePost {
    onUpdateLikePost {
      id
      userID
      postID
      type
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteLikePost = /* GraphQL */ `
  subscription OnDeleteLikePost {
    onDeleteLikePost {
      id
      userID
      postID
      type
      createdAt
      updatedAt
    }
  }
`;
export const onCreateLikeComment = /* GraphQL */ `
  subscription OnCreateLikeComment {
    onCreateLikeComment {
      id
      userID
      commentID
      type
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateLikeComment = /* GraphQL */ `
  subscription OnUpdateLikeComment {
    onUpdateLikeComment {
      id
      userID
      commentID
      type
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteLikeComment = /* GraphQL */ `
  subscription OnDeleteLikeComment {
    onDeleteLikeComment {
      id
      userID
      commentID
      type
      createdAt
      updatedAt
    }
  }
`;
export const onCreateBoard = /* GraphQL */ `
  subscription OnCreateBoard {
    onCreateBoard {
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
export const onUpdateBoard = /* GraphQL */ `
  subscription OnUpdateBoard {
    onUpdateBoard {
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
export const onDeleteBoard = /* GraphQL */ `
  subscription OnDeleteBoard {
    onDeleteBoard {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
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
      likes {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
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
      likes {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
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
      likes {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
      id
      userID
      postID
      nickname
      content
      deleted
      nestedComments {
        nextToken
      }
      likes {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
      id
      userID
      postID
      nickname
      content
      deleted
      nestedComments {
        nextToken
      }
      likes {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
      id
      userID
      postID
      nickname
      content
      deleted
      nestedComments {
        nextToken
      }
      likes {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateNestedComment = /* GraphQL */ `
  subscription OnCreateNestedComment {
    onCreateNestedComment {
      id
      userID
      commentID
      nickname
      content
      deleted
      likes {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateNestedComment = /* GraphQL */ `
  subscription OnUpdateNestedComment {
    onUpdateNestedComment {
      id
      userID
      commentID
      nickname
      content
      deleted
      likes {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteNestedComment = /* GraphQL */ `
  subscription OnDeleteNestedComment {
    onDeleteNestedComment {
      id
      userID
      commentID
      nickname
      content
      deleted
      likes {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;

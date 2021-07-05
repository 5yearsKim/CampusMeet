/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getPreference = /* GraphQL */ `
  query GetPreference($id: ID!) {
    getPreference(id: $id) {
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
export const listPreferences = /* GraphQL */ `
  query ListPreferences(
    $filter: ModelPreferenceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPreferences(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        likeGender
        likeGraduate
        likeCampus
        likeDepartment
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSignal = /* GraphQL */ `
  query GetSignal($id: ID!) {
    getSignal(id: $id) {
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
export const listSignals = /* GraphQL */ `
  query ListSignals(
    $filter: ModelSignalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSignals(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        fromID
        toID
        alive
        checked
        message
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMatch = /* GraphQL */ `
  query GetMatch($id: ID!) {
    getMatch(id: $id) {
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
export const listMatchs = /* GraphQL */ `
  query ListMatchs(
    $filter: ModelMatchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMatchs(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getChatRoom = /* GraphQL */ `
  query GetChatRoom($id: ID!) {
    getChatRoom(id: $id) {
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
export const listChatRooms = /* GraphQL */ `
  query ListChatRooms(
    $filter: ModelChatRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        lastMessageID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
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
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getLikePost = /* GraphQL */ `
  query GetLikePost($id: ID!) {
    getLikePost(id: $id) {
      id
      userID
      postID
      type
      createdAt
      updatedAt
    }
  }
`;
export const listLikePosts = /* GraphQL */ `
  query ListLikePosts(
    $filter: ModelLikePostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLikePosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getLikeComment = /* GraphQL */ `
  query GetLikeComment($id: ID!) {
    getLikeComment(id: $id) {
      id
      userID
      commentID
      type
      createdAt
      updatedAt
    }
  }
`;
export const listLikeComments = /* GraphQL */ `
  query ListLikeComments(
    $filter: ModelLikeCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLikeComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getBoard = /* GraphQL */ `
  query GetBoard($id: ID!) {
    getBoard(id: $id) {
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
export const listBoards = /* GraphQL */ `
  query ListBoards(
    $filter: ModelBoardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBoards(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        name
        description
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
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
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        boardID
        nickname
        title
        content
        imageKeys
        deleted
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
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
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getNestedComment = /* GraphQL */ `
  query GetNestedComment($id: ID!) {
    getNestedComment(id: $id) {
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
export const listNestedComments = /* GraphQL */ `
  query ListNestedComments(
    $filter: ModelNestedCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNestedComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const signalByFrom = /* GraphQL */ `
  query SignalByFrom(
    $fromID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSignalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    signalByFrom(
      fromID: $fromID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        fromID
        toID
        alive
        checked
        message
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const signalByTo = /* GraphQL */ `
  query SignalByTo(
    $toID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSignalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    signalByTo(
      toID: $toID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        fromID
        toID
        alive
        checked
        message
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const matchByFrom = /* GraphQL */ `
  query MatchByFrom(
    $fromID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMatchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    matchByFrom(
      fromID: $fromID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const matchByChatRoom = /* GraphQL */ `
  query MatchByChatRoom(
    $chatRoomID: ID
    $fromID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMatchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    matchByChatRoom(
      chatRoomID: $chatRoomID
      fromID: $fromID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const messagesByChatRoom = /* GraphQL */ `
  query MessagesByChatRoom(
    $chatRoomID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesByChatRoom(
      chatRoomID: $chatRoomID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const likeByPost = /* GraphQL */ `
  query LikeByPost(
    $postID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelLikePostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    likeByPost(
      postID: $postID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const likeByComment = /* GraphQL */ `
  query LikeByComment(
    $commentID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelLikeCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    likeByComment(
      commentID: $commentID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const postByBoard = /* GraphQL */ `
  query PostByBoard(
    $boardID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postByBoard(
      boardID: $boardID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        boardID
        nickname
        title
        content
        imageKeys
        deleted
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const postByUser = /* GraphQL */ `
  query PostByUser(
    $userID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postByUser(
      userID: $userID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        boardID
        nickname
        title
        content
        imageKeys
        deleted
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const commentByPost = /* GraphQL */ `
  query CommentByPost(
    $postID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentByPost(
      postID: $postID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const commentByUser = /* GraphQL */ `
  query CommentByUser(
    $userID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentByUser(
      userID: $userID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const nestedCommentByUser = /* GraphQL */ `
  query NestedCommentByUser(
    $userID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelNestedCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    nestedCommentByUser(
      userID: $userID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;

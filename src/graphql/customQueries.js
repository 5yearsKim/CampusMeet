

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      gender
      name
      campus
      graduate
      year
      division
      imageKeys
      profileMessage
      profileDescription
      status
      createdAt
      updatedAt
    }
  }
`;

export const listCandidateUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        gender
        campus
        graduate
        year
        division
        profileMessage
        profileDescription
        status
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
        message
        createdAt
        updatedAt
        receiver {
          id
          gender
          campus
          graduate
          division
          year
          profileMessage
          profileDescription
        }
      }
      nextToken
    }
  }
`;

export const signalByFromToday = /* GraphQL */ `
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
        message
        createdAt
        updatedAt
        sender {
          id
          name
          gender
          campus
          graduate
          division
          year
          profileMessage
          imageKeys
        }
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
        updatedAt
        matcher {
          id
          gender
          name
          imageKeys
        }
        chatRoom {
          id
          lastMessageID
          lastMessage {
            createdAt
            content
            type
          }
        }
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
        updatedAt
        user {
          id
          gender
          name
          imageKeys
        }
      }
      nextToken
    }
  }
`;

export const likeBoardByUser = /* GraphQL */ `
  query LikeBoardByUser(
    $userID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelLikeBoardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    likeBoardByUser(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        boardID
        boards {
          id
          userID
          name
          description
          type
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
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
        comments {
          items {
            id
          }
        }
        likes {
          items {
            userID
          }
        }
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
        likes {
          items {
            userID
          }
        }
        createdAt
        updatedAt
        nestedComments {
          items {
            id
            userID
            commentID
            nickname
            content
            deleted
            likes {
              items {
                userID
              }
            }
            createdAt
            updatedAt
          }
        }
      }
      nextToken
    }
  }
`;

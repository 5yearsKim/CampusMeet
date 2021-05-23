import {API, graphqlOperation} from 'aws-amplify';
import {createBoard, createPost, createComment, createNestedComment, createLikePost, createLikeComment} from 'src/graphql/customMutations';
import {getUser, listBoards, boardByType, postByBoard, commentByPost} from 'src/graphql/customQueries';
import config from 'src/config';

export const makeBoard = async (userID, boardName, description, type) => {
  const boardInput = {
    userID: userID,
    name: boardName,
    description: description,
    type: type,
  };
  try {
    const newBoard = await API.graphql(
        graphqlOperation(
            createBoard, {input: boardInput},
        ),
    );
    console.log(newBoard, 'created');
  } catch (err) {
    console.warn(err);
  }
};

export const makePost = async (userID, boardID, nickname, title, content, imageKeys) => {
  const postInput = {
    userID: userID,
    boardID: boardID,
    nickname: nickname,
    title: title,
    content: content,
    imageKeys: imageKeys,
    deleted: false,
  };
  try {
    const newPost = await API.graphql(
        graphqlOperation(
            createPost, {input: postInput},
        ),
    );
    return newPost;
  } catch (err) {
    console.warn(err);
  }
};

export const makeComment = async (userID, postID, nickname, content) => {
  const inputData = {
    userID: userID,
    postID: postID,
    nickname: nickname,
    content: content,
    deleted: false,
  };
  try {
    const commentData = await API.graphql(
        graphqlOperation(
            createComment, {input: inputData},
        ),
    );
    return commentData;
  } catch (err) {
    console.warn(err);
  }
};

export const makeNestedComment = async (userID, commentID, nickname, content) => {
  const inputData = {
    userID: userID,
    commentID: commentID,
    nickname: nickname,
    content: content,
    deleted: false,
  };
  try {
    const commentData = await API.graphql(
        graphqlOperation(
            createNestedComment, {input: inputData},
        ),
    );
    return commentData;
  } catch (err) {
    console.log(err);
  }
};

export const makeLikePost = async (userID, postID) => {
  const inputLike = {
    userID: userID,
    postID: postID,
  };
  try {
    const likeData = await API.graphql(
        graphqlOperation(
            createLikePost, {input: inputLike},
        ),
    );
    return likeData;
  } catch (err) {
    console.warn(err);
  }
};

export const makeLikeComment = async (userID, commentID) => {
  const inputLike = {
    userID: userID,
    commentID: commentID,
  };
  try {
    const likeData = await API.graphql(
        graphqlOperation(
            createLikeComment, {input: inputLike},
        ),
    );
    return likeData;
  } catch (err) {
    console.warn(err);
  }
};

export const bringBoardAll = async () => {
  try {
    const boardData = await API.graphql(
        graphqlOperation(
            listBoards,
        ),
    );
    return boardData.data.listBoards.items;
  } catch (err) {
    console.warn(err);
  }
};

export const bringBoardByType = async (type) => {
  try {
    const boardData = await API.graphql(
        graphqlOperation(
            boardByType, {type: type},
        ),
    );
    console.log(boardData);
    return boardData.data.boardByType.items;
  } catch (err) {
    console.warn(err);
  }
};

export const bringPost = async (boardID, nextToken, limit=20) => {
  const inputData = {
    boardID: boardID,
    limit: limit,
    sortDirection: 'DESC',
  };
  if (nextToken) {
    inputData.nextToken = nextToken;
  }
  try {
    const postData = await API.graphql(
        graphqlOperation(
            postByBoard, inputData,
        ),
    );
    return [postData.data.postByBoard.items, postData.data.postByBoard.nextToken];
  } catch (err) {
    console.warn(err);
  }
};

export const bringComment = async (postID) => {
  try {
    const commentData = await API.graphql(
        graphqlOperation(
            commentByPost, {postID: postID},
        ),
    );
    return commentData.data.commentByPost.items;
  } catch (err) {
    console.warn(err);
  }
};


export const getNickname = async (userID, boardType) => {
  const boardOptions = config.community.boardOptions;
  try {
    const userData = await API.graphql(
        graphqlOperation(
            getUser, {id: userID},
        ),
    );
    const user = userData.data.getUser;
    // if boardType == '학교/학과 공개'
    if (boardType == boardOptions[1]) {
      return `${user.gender}|${user.campus} ${user.division} ${user.year}`;
    } else {
      return `${user.gender}|익명`;
    }
  } catch (err) {
    console.warn(err);
  }
};


import React, {useEffect, useState, useContext, useRef} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {UserContext} from 'src/context';
import {bringComment} from 'src/utils/Community';
import CommentInput from './CommentInput';
import Comment from './Comment';
import PostHeader from './PostHeader';
import {ChatContext} from 'src/context';

function Post({navigation, route}) {
  const {board, post} = route.params;
  const [isNested, setIsNested] = useState(false); // false when not turned on, commentID when turned on
  const [refreshComment, setRefreshComment] = useState(false);
  const [comment, setComment] = useState('');
  const commentList = useRef(null);
  const {refreshBoard, setRefreshBoard, blockList} = useContext(UserContext);

  useEffect(() => {
    return () => setRefreshBoard(!refreshBoard);
  }, []);

  useEffect(() => {
    const m_bringComment = async () => {
      const commentData = await bringComment(post.id);
      const blockIdList = blockList.map((item) => item.objectID);
      const newCommentList = commentData.map((item) => {
        if (blockIdList.includes(item.id)) {
          item.isHide = true;
        };
        const nestedComment = item.nestedComments.items;
        if (nestedComment.length > 0) {
          const newNestedComment = nestedComment.map((item) => {
            if (blockIdList.includes(item.id)) {
              item.isHide = true;
            }
            return item;
          });
          // console.log(newNestedComment);
          item.nestedComments.items = newNestedComment;
        }
        return item;
      });
      setComment(newCommentList);
    };
    m_bringComment();
  }, [refreshComment]);

  const focusComment = (idx) => {
    commentList.current.scrollToIndex({index: idx, viewPosition: 0.3});
  };

  const refresh = () => setRefreshComment(!refreshComment);

  return (
    <ChatContext.Provider value={{isNested, setIsNested}}>
      <FlatList
        ref={commentList}
        data={comment}
        contentContainerStyle={styles.flatlistContainer}
        ListHeaderComponent={() => <PostHeader post={post} board={board} navigation={navigation}/>}
        renderItem={({item, index}) => <Comment item={item} index={index} board={board} focusComment={focusComment} refresh={refresh}/>}
        keyExtractor={(item) => item.id}
      />
      <CommentInput
        board={board}
        post={post}
        refresh={refresh}
      />
    </ChatContext.Provider>
  );
}

const styles = StyleSheet.create({
  flatlistContainer: {
    paddingBottom: 350, // textinput not to hide contents
  },

});

export default Post;

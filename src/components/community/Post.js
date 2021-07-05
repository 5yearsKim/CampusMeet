import React, {useEffect, useState, useContext, useRef} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {UserContext} from 'src/context';
import {bringComment, bringPost} from 'src/utils/Community';
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
  const {refreshBoard, setRefreshBoard} = useContext(UserContext);

  useEffect(() => {
    return () => setRefreshBoard(!refreshBoard);
  }, []);

  useEffect(() => {
    const m_bringComment = async () => {
      const commentData = await bringComment(post.id);
      setComment(commentData);
    };
    m_bringComment();
  }, [refreshComment]);

  const focusComment = (idx) => {
    commentList.current.scrollToIndex({index: idx, viewPosition: 0.3});
  };

  return (
    <ChatContext.Provider value={{isNested, setIsNested}}>
      <FlatList
        ref={commentList}
        data={comment}
        contentContainerStyle={styles.flatlistContainer}
        ListHeaderComponent={() => <PostHeader post={post} board={board}/>}
        renderItem={({item, index}) => <Comment item={item} index={index} board={board} focusComment={focusComment}/>}
        keyExtractor={(item) => item.id}
      />
      <CommentInput
        board={board}
        post={post}
        refresh={() => setRefreshComment(!refreshComment)}
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

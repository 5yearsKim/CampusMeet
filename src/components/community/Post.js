import React, {useEffect, useState, useRef} from 'react';
import {KeyboardAvoidingView, View, FlatList, StyleSheet} from 'react-native';
import {bringComment} from 'src/utils/Community';
import CommentInput from './CommentInput';
import Comment from './Comment';
import PostHeader from './PostHeader';
import {ChatContext} from 'src/context';

function Post({navigation, route}) {
  const {board, post} = route.params;
  const [isNested, setIsNested] = useState(false); // false when not turned on, commentID when turned on
  const [refresh, setRefresh] = useState(false);
  const [comment, setComment] = useState('');
  const commentList = useRef(null);

  useEffect(() => {
    const m_bringComment = async () => {
      const commentData = await bringComment(post.id);
      setComment(commentData);
    };
    m_bringComment();
  }, [refresh]);

  const refreshComment = () => {
    setRefresh(!refresh);
  };

  const focusComment = (idx) => {
    commentList.current.scrollToIndex({index: idx, viewPosition: 0.3});
  };

  return (
    <View style={styles.container}>
      <ChatContext.Provider value={{isNested, setIsNested}}>
        <FlatList
          ref={commentList}
          data={comment}
          contentContainerStyle={styles.flatlistContainer}
          ListHeaderComponent={() => <PostHeader post={post} board={board} />}
          renderItem={({item, index}) => <Comment item={item} index={index} board={board} focusComment={focusComment}/>}
          keyExtractor={(item) => item.id}
        />
        <CommentInput
          board={board}
          post={post}
          refresh={refreshComment}
        />
      </ChatContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlistContainer: {
    // paddingBottom: 350, // textinput not to hide contents
  },

});

export default Post;

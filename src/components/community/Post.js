import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
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

  return (
    <View style={styles.container}>
      <ChatContext.Provider value={{nested: {isNested, setIsNested}}}>
        <FlatList
          data={comment}
          contentContainerStyle={styles.flatlistContainer}
          ListHeaderComponent={() => <PostHeader post={post} board={board} />}
          renderItem={({item}) => <Comment item={item} board={board} />}
          keyExtractor={(item) => item.id}
        />
        <View style={styles.commentInput}>
          <CommentInput
            board={board}
            post={post}
            refresh={refreshComment}
          />
        </View>
      </ChatContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlistContainer: {
    paddingBottom: 100, // textinput not to hide contents
  },
  commentInput: {
    position: 'absolute',
    flex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'green',
  },
});

export default Post;

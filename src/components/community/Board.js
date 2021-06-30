import React, {useState, useEffect, useContext} from 'react';
import {View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';
import {bringPost} from 'src/utils/Community';
import PostListItem from './PostItem';
import {UserContext} from 'src/context';

function Board({navigation, route}) {
  const {board} = route.params;
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextToken, setNextToken] = useState('');
  const {refreshBoard, setRefreshBoard} = useContext(UserContext);

  useEffect(() => {
    const m_bringPost = async () => {
      setLoading(true);
      const [postData, tokenData] = await bringPost(board.id, '', 20);
      setPostList(postData);
      setNextToken(tokenData);
      setLoading(false);
    };
    m_bringPost();
  }, [refreshBoard]);

  const onEndReached = () => {
    const m_bringPost = async () => {
      setLoading(true);
      const [postData, tokenData] = await bringPost(board.id, nextToken, 20);
      setPostList([...postList, ...postData]);
      setNextToken(tokenData);
      setLoading(false);
    };
    if (nextToken) {
      m_bringPost();
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={postList}
        renderItem={({item}) => <PostListItem item={item} board={board} navigation={navigation}/>}
        keyExtractor={(item) => item.id}
        onEndReached={() => onEndReached()}
        refreshing={loading}
        onRefresh={() => setRefreshBoard(!refreshBoard)}
        removeClippedSubviews={false}
      />
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('CreatePost', {board: board})}>
          <FontAwesome5 name="pen" size={32} color='#444444'/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'white',
    height: 50,
    width: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Board;

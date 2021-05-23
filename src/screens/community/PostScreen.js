import React from 'react';
import {View, StyleSheet} from 'react-native';
import Post from 'src/components/community/Post';

function PostScreen(props) {
  return (
    <View style={styles.container}>
      <Post {...props}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default PostScreen;

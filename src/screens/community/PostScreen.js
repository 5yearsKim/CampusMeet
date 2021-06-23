import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Post from 'src/components/community/Post';

function PostScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
      <Post {...props}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default PostScreen;

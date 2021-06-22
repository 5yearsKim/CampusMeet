import React from 'react';
import {SafeAreaView} from 'react-native';
import CreatePost from 'src/components/community/CreatePost';

function CreatePostScreen(props) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <CreatePost {...props}/>
    </SafeAreaView>
  );
}

export default CreatePostScreen;

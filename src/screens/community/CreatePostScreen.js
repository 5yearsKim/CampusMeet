import React from 'react';
import {SafeAreaView, KeyboardAvoidingView} from 'react-native';
import CreatePost from 'src/components/community/CreatePost';
import {useKeyboard} from 'src/blocks/Keyboard';

function CreatePostScreen(props) {
  const {iosPadding} = useKeyboard();
  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
        keyboardVerticalOffset={iosPadding}
      >
        <CreatePost {...props}/>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default CreatePostScreen;

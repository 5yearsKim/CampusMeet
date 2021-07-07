import React from 'react';
import {useKeyboard} from 'src/blocks/Keyboard';
import {SafeAreaView, KeyboardAvoidingView} from 'react-native';
import CreateProfile from 'src/components/mypage/CreateProfile';

function CreateProfileScreen(props) {
  const {iosPadding} = useKeyboard();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, justifyContent: 'center'}}
      keyboardVerticalOffset={iosPadding}
    >
      <CreateProfile {...props}/>
    </KeyboardAvoidingView>
  );
}

export default CreateProfileScreen;

import React from 'react';
import {SafeAreaView, KeyboardAvoidingView} from 'react-native';
import {useKeyboard} from 'src/blocks/Keyboard';
import CreateProfile from 'src/components/mypage/CreateProfile';

function CreateProfileScreen(props) {
  const {iosPadding} = useKeyboard();
  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1, padding: 20}}
        keyboardVerticalOffset={iosPadding}
      >
        <CreateProfile {...props}/>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default CreateProfileScreen;

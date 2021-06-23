import React from 'react';
import {View, KeyboardAvoidingView} from 'react-native';
import ModifyProfile from 'src/components/mypage/ModifyProfile';

function ModifyProfileScreen(props) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, justifyContent: 'center'}}
      keyboardVerticalOffset={200}
    >
      <ModifyProfile {...props}/>
    </KeyboardAvoidingView>
  );
}

export default ModifyProfileScreen;

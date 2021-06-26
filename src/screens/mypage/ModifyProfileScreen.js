import React from 'react';
import {View, KeyboardAvoidingView, ScrollView} from 'react-native';
import ModifyProfile from 'src/components/mypage/ModifyProfile';

function ModifyProfileScreen(props) {
  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    //   style={{flex: 1, justifyContent: 'center'}}
    //   keyboardVerticalOffset={200}
    // >
    //   <ModifyProfile {...props}/>
    // </KeyboardAvoidingView>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, justifyContent: 'center'}}
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <ModifyProfile {...props}/>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default ModifyProfileScreen;

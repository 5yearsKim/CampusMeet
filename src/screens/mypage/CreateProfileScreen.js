import React from 'react';
import {ScrollView} from 'react-native';
import CreateProfile from 'src/components/mypage/CreateProfile';

function CreateProfileScreen(props) {
  return (
    <ScrollView>
      <CreateProfile {...props}/>
    </ScrollView>
  );
}

export default CreateProfileScreen;

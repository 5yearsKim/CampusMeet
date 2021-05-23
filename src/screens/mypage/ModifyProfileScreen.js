import React from 'react';
import {ScrollView} from 'react-native';
import ModifyProfile from 'src/components/mypage/ModifyProfile';

function ModifyProfileScreen(props) {
  return (
    <ScrollView>
      <ModifyProfile {...props}/>
    </ScrollView>
  );
}

export default ModifyProfileScreen;

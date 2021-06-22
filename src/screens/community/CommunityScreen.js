import React from 'react';
import {SafeAreaView} from 'react-native';
import Community from 'src/components/community/Community';

function CommunityScreen(props) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Community {...props}/>
    </SafeAreaView>
  );
}

export default CommunityScreen;

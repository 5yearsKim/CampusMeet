import React from 'react';
import {ScrollView} from 'react-native';
import Mypage from 'src/components/mypage/Mypage';


function MypageScreen(props) {
  return (
    <ScrollView>
      <Mypage {...props}/>
    </ScrollView>
  );
};

export default MypageScreen;

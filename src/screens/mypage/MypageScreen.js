import React from 'react';
import {ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import Mypage from 'src/components/mypage/Mypage';


function MypageScreen(props) {
  return (
    <ScrollView>
      <Mypage {...props}/>
      {/* <Button onPress={() => props.navigation.push('CreateProfile')}>
        createProvile
      </Button> */}
    </ScrollView>
  );
};

export default MypageScreen;

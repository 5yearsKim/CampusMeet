import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import Mypage from 'src/components/mypage/Mypage';


function MypageScreen(props) {
  return (
    <View>
      <Mypage {...props}/>
      {/* <Button
        mode='outlined'
        onPress={() => props.navigation.navigate('CreateProfile')}
      >
        Create Profile
      </Button> */}
    </View>
  );
};

export default MypageScreen;

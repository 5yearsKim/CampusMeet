import React from 'react';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import MypageList from 'src/components/mypage/MypageList';


function MypageScreen(props) {
  return (
    <View>
      <MypageList {...props}/>
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

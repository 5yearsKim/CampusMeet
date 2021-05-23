import React from 'react';
import {Button} from 'react-native';

function MypageButton(props) {
  return (
    <Button
      onPress={() => props.navigation.navigate('Mypage')}
      title='mypage'
    />
  );
}

export default MypageButton;

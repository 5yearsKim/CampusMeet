import React from 'react';
import {View, Image, StyleSheet, Platform} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
  {
    key: '1',
    image: Platform.OS == 'ios' ? require('assets/images/intro/ios_preview1.png' ) : require('assets/images/intro/android_preview1.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: '2',
    image: Platform.OS === 'ios' ? require('assets/images/intro/ios_preview2.png' ) : require('assets/images/intro/android_preview2.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: '3',
    image: Platform.OS === 'ios' ? require('assets/images/intro/ios_preview3.png' ) : require('assets/images/intro/android_preview3.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: '4',
    image: Platform.OS === 'ios' ? require('assets/images/intro/ios_preview4.png' ) : require('assets/images/intro/android_preview4.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: '5',
    image: Platform.OS === 'ios' ? require('assets/images/intro/ios_preview5.png' ) : require('assets/images/intro/android_preview5.png'),
    backgroundColor: '#59b2ab',
  },
];

export default function IntroSlider({onDone}) {
  const renderItem = ({item}) => {
    return (
      <View>
        <Image source={item.image} resizeMode='cover' style={{width: '100%', height: '100%'}}/>
      </View>
    );
  };

  return (
    <AppIntroSlider
      data={slides}
      renderItem={renderItem}
      onDone={onDone}
    />
  );
}

const styles = StyleSheet.create({

});

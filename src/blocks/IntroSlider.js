import React from 'react';
import {View, Dimensions, Image, StyleSheet, Platform} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import config from 'src/config';

const {width, height} = Dimensions.get('window');

const ratio = height/width;
const threshold = 1.85;
const bgcolor = config.colors.main.primary;

const slides = [
  {
    key: '1',
    image: Platform.OS == 'android' ?
      require('assets/images/intro/android_preview1.png') :
      ratio < threshold ?
        require('assets/images/intro/ios_preview1(5.5).png' ) :
        require('assets/images/intro/ios_preview1(6.5).png' ),
    backgroundColor: bgcolor,
  },
  {
    key: '2',
    image: Platform.OS === 'android' ?
      require('assets/images/intro/android_preview2.png') :
      ratio < threshold ?
        require('assets/images/intro/ios_preview2(5.5).png' ) :
        require('assets/images/intro/ios_preview2(6.5).png' ),
    backgroundColor: bgcolor,
  },
  {
    key: '3',
    image: Platform.OS === 'android' ?
      require('assets/images/intro/android_preview3.png') :
      ratio < threshold ?
        require('assets/images/intro/ios_preview3(5.5).png' ) :
        require('assets/images/intro/ios_preview3(6.5).png' ),
    backgroundColor: bgcolor,
  },
  {
    key: '4',
    image: Platform.OS === 'android' ?
      require('assets/images/intro/android_preview4.png') :
      ratio < threshold ?
        require('assets/images/intro/ios_preview4(5.5).png' ) :
        require('assets/images/intro/ios_preview4(6.5).png' ),
    backgroundColor: bgcolor,
  },
  {
    key: '5',
    image: Platform.OS === 'android' ?
      require('assets/images/intro/android_preview5.png') :
      ratio < threshold ?
        require('assets/images/intro/ios_preview5(5.5).png' ) :
        require('assets/images/intro/ios_preview5(6.5).png' ),
    backgroundColor: bgcolor,
  },
];

export default function IntroSlider({onDone}) {
  const renderItem = ({item}) => {
    return (
      <View>
        <Image source={item.image} resizeMode='contain' style={{width: '100%', height: '100%'}}/>
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

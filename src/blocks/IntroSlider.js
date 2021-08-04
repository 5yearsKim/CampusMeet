import React from 'react';
import {View, StyleSheet} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
  {
    image: require('src/assets/images/intro/android_preview1.png'),
    backgroundColor: '#59b2ab',
  },
  {
    image: require('src/assets/images/intro/android_preview2.png'),
    backgroundColor: '#59b2ab',
  },
  {
    image: require('src/assets/images/intro/android_preview3.png'),
    backgroundColor: '#59b2ab',
  },
  {
    image: require('src/assets/images/intro/android_preview4.png'),
    backgroundColor: '#59b2ab',
  },
  {
    image: require('src/assets/images/intro/android_preview5.png'),
    backgroundColor: '#59b2ab',
  },
];

export default function IntroSlider() {
  const renderItem = ({item}) => {
    return (
      <View>
        <Image source={item.image}/>
      </View>
    );
  }
  return (
    <AppIntroSlider
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({

});

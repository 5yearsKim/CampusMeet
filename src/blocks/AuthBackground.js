import React from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import {StyleSheet} from 'react-native';
import config from 'src/config';

const colors = config.colors;

export default function AuthBackground() {
  return (
    <LinearGradient
      colors={[colors.main.primary, 'white']}
      style={styles.background}
    />
  );
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

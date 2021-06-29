import React from 'react';
import {View, StyleSheet} from 'react-native';
import Text from './Text';

export default function Loading({content}) {
  if (!content) {
    content = 'Loading..';
  }
  return (
    <View style={styles.container}>
      <Text style={styles.notiText}>{content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: 'center',
  },
  notiText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'gray',
  },
});

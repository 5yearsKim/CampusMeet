import React from 'react';
import {View, StyleSheet} from 'react-native';
import Text from './Text';

export default function Badge({content, containerStyle, labelStyle}) {
  return (
    <View>
      <View style={[styles.container, containerStyle]}>
        {!!content &&
          <Text style={[styles.badgeText, labelStyle]}>{content}</Text>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF0044',
    borderRadius: 20,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 10,
    minWidth: 10,
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
  },
});

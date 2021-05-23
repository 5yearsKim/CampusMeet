import React from 'react';
import {Image, StyleSheet} from 'react-native';
import Text from 'src/blocks/Text';
import config from 'src/config';

export function TextMessage({text, isMyMessage}) {
  return (
    <Text
      style={[
        styles.messageBox, isMyMessage? styles.myBox: styles.yourBox,
      ]}
    >
      {text}
    </Text>
  );
}

export function GifMessage({gifUrl, isMyMessage}) {
  const style = {
    width: 120,
    height: 90,
  };
  return (
    <Image
      source={{
        uri: gifUrl,
      }}
      style={style}
    />
  );
}

export function ImageMessage({imageKey, isMyMessage}) {
  return (
    <Text>Image</Text>
  );
}

const colors = config.colors.chat;
const styles = StyleSheet.create({
  messageBox: {
    borderRadius: 15,
    padding: 9,
    fontSize: 14,
  },
  myBox: {
    backgroundColor: colors.myMessageBox,
    color: colors.myMessageText,
    marginRight: 5,
  },
  yourBox: {
    backgroundColor: colors.yourMessageBox,
    color: colors.yourMessageText,
    marginLeft: 10,
  },
});

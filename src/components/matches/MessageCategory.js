import React, {useState} from 'react';
import {View, Image, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import Text from 'src/blocks/Text';
import {KeyImage} from 'src/blocks/Image';
import {ImageViewer} from 'src/blocks/ImageViewer';
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
  const [modalVisible, setModalVisible] = useState(false);
  const modalSwitch = () => setModalVisible(!modalVisible);
  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <KeyImage imgKey={imageKey} style={styles.image}/>
      </TouchableOpacity>
      <Modal visible={modalVisible}>
        <ImageViewer imageKeys={[imageKey]} modalSwitch={modalSwitch}/>
      </Modal>
    </View>
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
  image: {
    width: 160,
    height: 120,
  },
});

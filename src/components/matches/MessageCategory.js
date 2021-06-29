import React, {useState} from 'react';
import {View, Image, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import Text from 'src/blocks/Text';
import {KeyImage} from 'src/blocks/Image';
import {ImageViewer} from 'src/blocks/ImageViewer';
import {AntDesign} from '@expo/vector-icons';
import config from 'src/config';

export function TextMessage({text, isMyMessage}) {
  return (
    <Text
      style={[styles.messageBox, isMyMessage? styles.myBox : styles.yourBox]}
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
    <View style={styles.gifContainer}>
      <Image
        source={{
          uri: gifUrl,
        }}
        style={style}
      />
    </View>
  );
}

export function ImageMessage({imageKey, isMyMessage}) {
  const [modalVisible, setModalVisible] = useState(false);
  const modalSwitch = () => setModalVisible(!modalVisible);
  return (
    <View style={styles.imageContainer}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <KeyImage imgKey={imageKey} style={styles.image}/>
      </TouchableOpacity>
      <Modal visible={modalVisible}>
        <ImageViewer imageKeys={[imageKey]} modalSwitch={modalSwitch}/>
      </Modal>
    </View>
  );
}

export function AdminMessage({content}) {
  return (
    <View style={styles.alertBox}>
      <View style={styles.alertWrapper}>
        <AntDesign name='sound' size={28} color='yellow'/>
        <Text style={styles.alertText}>{content}</Text>
      </View>
    </View>
  );
}

const colors = config.colors.chat;
const styles = StyleSheet.create({
  messageBox: {
    borderRadius: 10,
    padding: 9,
    fontSize: 14,
    overflow: 'hidden',
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
  imageContainer: {
    margin: 10,
  },
  gifContainer: {
    margin: 10,
  },
  alertBox: {
    backgroundColor: 'white',
    marginBottom: 5,
  },
  alertWrapper: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

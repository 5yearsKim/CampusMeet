import React, {useState} from 'react';
import {Dimensions, View, Image, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import Text from 'src/blocks/Text';
import {KeyImage} from 'src/blocks/Image';
import {ImageViewer} from 'src/blocks/ImageViewer';
import {AntDesign} from '@expo/vector-icons';
import config from 'src/config';

const {width, height} = Dimensions.get('window');

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
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.gifContainer}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image
          source={{
            uri: gifUrl,
          }}
          style={styles.gifImage}
          resizeMode='contain'
        />
      </TouchableOpacity>
      <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <ImageViewer imageKeys={[gifUrl]}/>
      </Modal>
    </View>
  );
}

export function ImageMessage({imageKey, isMyMessage}) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.imageContainer}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <KeyImage imgKey={imageKey} cached={true} style={styles.image} resizeMode='contain'/>
      </TouchableOpacity>
      <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <ImageViewer imageKeys={[imageKey]}/>
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
    maxWidth: width * 0.6,
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
    width: 180,
    height: 160,
  },
  gifImage: {
    minWidth: 160,
    minHeight: 120,
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

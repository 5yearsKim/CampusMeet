import React, {useState} from 'react';
import {Dimensions, View, Image, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import Text from 'src/blocks/Text';
import {KeyImage} from 'src/blocks/Image';
import {ImageViewer, ImageSwipeOff} from 'src/blocks/ImageViewer';
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
          resizeMode='cover'
        />
      </TouchableOpacity>
      <ImageSwipeOff setModalVisible={setModalVisible}>
        <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <ImageViewer imageKeys={[gifUrl]}/>
        </Modal>
      </ImageSwipeOff>
    </View>
  );
}

export function ImageMessage({imageKey, isMyMessage}) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.imageContainer}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <KeyImage imgKey={imageKey} cached={true} style={styles.image} resizeMode='cover'/>
      </TouchableOpacity>
      <ImageSwipeOff setModalVisible={setModalVisible}>
        <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <ImageViewer imageKeys={[imageKey]}/>
        </Modal>
      </ImageSwipeOff>
    </View>
  );
}

export function AdminMessage({content}) {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
      <View style={styles.alertBox}>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <AntDesign name='sound' size={28} color='#f3f333'/>
          <Text style={styles.alertText}>{content}</Text>
        </View>
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
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 3,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
  },
  alertText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

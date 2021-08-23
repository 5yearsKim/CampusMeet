import React, {useState, useContext} from 'react';
import {StyleSheet, ActivityIndicator, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native';
import {Portal, Modal} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import {Storage} from 'aws-amplify';
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import {GifSearch, poweredByGiphyLogoGrey} from 'react-native-gif-search';
import {useKeyboard} from 'src/blocks/Keyboard';
import {MyContext} from 'src/context';
import {makeMessage} from 'src/utils/Chat';
import {sendPushNotification} from 'src/utils/PushNotification';
import config from 'src/config';

import Dialog from 'src/blocks/Dialog';

function InputBox({route, chatUser}) {
  const {chatRoomID} = route.params;
  const {user, name}= useContext(MyContext);
  const userSub = user.sub;
  const [message, setMessage] = useState('');
  const [gifVisible, setGifVisible] = useState(false);
  const [sending, setSending] = useState(false);
  const {iosPadding} = useKeyboard();

  const sendMessage = async (content, type) => {
    try {
      await makeMessage(userSub, chatRoomID, content, type);
    } catch (err) {
      console.warn(err);
    };

    try {
      chatUser.forEach((item) => {
        if (item.id == userSub) {
          return;
        }
        let msg = '';
        if (type == 'image') {
          msg = '새 이미지';
        } else if (type == 'gif') {
          msg = 'gif';
        } else if (type == 'text') {
          msg = content;
        };
        sendPushNotification(item.id, name, msg, {type: 'message', chatRoomID: chatRoomID, name: name});
      });
    } catch (err) {
      console.warn(err);
    }
  };

  const onSendImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        // allowsEditing: true,
        // aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setSending(true);
        const rsp = await fetch(result.uri);
        const blob = await rsp.blob();
        const path = `chat/${chatRoomID}/`;
        const key = result.uri.split('/').pop();
        const awsrsp = await Storage.put(path + key, blob);
        sendMessage(awsrsp.key, 'image');
        setSending(false);
      }
    } catch (err) {
      console.warn('error:', err);
      setSending(false);
    }
  };

  const onGifSelected = (gifUrl) => {
    sendMessage(gifUrl, 'gif');
    setGifVisible(false);
  };

  const onClickSendIcon = () => {
    if (message) {
      if (message.trim() == '') {
        setMessage('');
        return;
      }
      sendMessage(message.trim(), 'text');
      setMessage('');
    } else {
      onSendImage();
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={iosPadding}
    >
      <Portal>
        <Modal visible={gifVisible} onDismiss={() => setGifVisible(false)} contentContainerStyle={styles.gifContainer}>
          <GifSearch
            giphyApiKey={config.giphyApiKey}
            onGifSelected={onGifSelected}
            style={{backgroundColor: '#9fd4ab', height: 300}}
            textInputStyle={{fontWeight: 'bold', color: 'black'}}
            loadingSpinnerColor={'black'}
            placeholderTextColor={'grey'}
            numColumns={5}
            provider={'giphy'}
            providerLogo={poweredByGiphyLogoGrey}
            showScrollBar={false}
            noGifsFoundText={'No Gifs found :('}
          />
        </Modal>
      </Portal>
      <View style={styles.container}>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.textInput}
            multiline
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity onPress={() => setGifVisible(true)}>
            <MaterialCommunityIcons name='gif' size={28}/>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onClickSendIcon}>
          <View style={styles.buttonContainer}>
            {message ?
              <Ionicons name='send-sharp' size={28} color='white'/> :
              sending ?
                <ActivityIndicator color='white' size='large'/> :
                <Ionicons name='camera' size={28} color='white'/>
            }
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const colors = config.colors.inputBox;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputBox: {
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 25,
    marginRight: 10,
    flex: 1,
  },
  textInput: {
    flex: 1,
    marginHorizontal: 10,
  },
  icon: {
    marginHorizontal: 5,
  },
  buttonContainer: {
    backgroundColor: colors.mainButton,
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gifContainer: {
    backgroundColor: 'white',
    padding: 20,
    height: 350,
  },
});

export default InputBox;

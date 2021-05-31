import React, {useState, useContext} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native';
import {Portal, Modal} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import {Storage} from 'aws-amplify';
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import {GifSearch, poweredByGiphyLogoGrey} from 'react-native-gif-search';
import {makeMessage, modifyChatRoom} from 'src/utils/Chat';
import {MyContext} from 'src/context';
import config from 'src/config';

function InputBox({route}) {
  const {chatRoomID} = route.params;
  const auth = useContext(MyContext);
  const [message, setMessage] = useState('');
  const [gifVisible, setGifVisible] = useState(false);

  const sendMessage = async (content, type) => {
    const userSub = auth.user.attributes.sub;
    const message = await makeMessage(userSub, chatRoomID, content, type);
    try {
      const data = {lastMessageID: message.id};
      modifyChatRoom(chatRoomID, data);
    } catch (err) {
      console.warn(err);
    }
  };

  const onSendImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        const rsp = await fetch(result.uri);
        const blob = await rsp.blob();
        const path = `chat/${chatRoomID}/`;
        const key = result.uri.split('/').pop();
        const awsrsp = await Storage.put(path + key, blob);
        sendMessage(awsrsp.key, 'image');
      }
    } catch (err) {
      console.log('error:', err);
    }
  };

  const onGifSelected = (gifUrl) => {
    sendMessage(gifUrl, 'gif');
    setGifVisible(false);
  };

  const onClickSendIcon = () => {
    if (message) {
      sendMessage(message, 'text');
      setMessage('');
    } else {
      onSendImage();
    }
  };
  return (
    <View>
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
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios'? 'padding': 'height'}
        keyboardVerticalOffset={100}
        style={{
          width: '100%',
        }}
      >
        <View style={styles.container}>
          <View style={styles.mainContainer}>
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
              {!message?
                <Ionicons name='camera' size={28} color='white'/>:
                <Ionicons name='send-sharp' size={28} color='white'/>
              }
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>

  );
}

const colors = config.colors.inputBox;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
  },
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
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

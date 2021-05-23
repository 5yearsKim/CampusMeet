import React from 'react';
import ChatRoom from 'src/components/matches/ChatRoom';
import InputBox from 'src/components/matches/InputBox';
import {View, StyleSheet} from 'react-native';
import config from 'src/config';

function ChatRoomScreen(props) {
  return (
    <View style={styles.container}>
      <ChatRoom {...props}/>
      <InputBox {...props}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    backgroundColor: config.colors.chat.background,
  },
});

export default ChatRoomScreen;

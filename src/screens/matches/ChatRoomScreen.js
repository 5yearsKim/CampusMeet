import React from 'react';
import ChatRoom from 'src/components/matches/ChatRoom';
import InputBox from 'src/components/matches/InputBox';
import {SafeAreaView, StyleSheet} from 'react-native';
import config from 'src/config';

function ChatRoomScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
      <ChatRoom {...props}/>
      <InputBox {...props}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: config.colors.chat.background,
  },
});

export default ChatRoomScreen;

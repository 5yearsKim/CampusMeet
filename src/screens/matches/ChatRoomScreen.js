import React, {useState, useEffect} from 'react';
import ChatRoom from 'src/components/matches/ChatRoom';
import InputBox from 'src/components/matches/InputBox';
import {SafeAreaView, StyleSheet} from 'react-native';
import config from 'src/config';
import SimpleAlert from 'src/blocks/SimpleAlert';
import {bringMatchByChatRoom} from 'src/utils/Match';

function ChatRoomScreen(props) {
  const {chatRoomID} = props.route.params;
  const [chatUser, setChatUser] = useState([]);
  const [disableInput, setDisableInput] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    const m_bringMatchByChatRoom = async () => {
      try {
        const matches = await bringMatchByChatRoom(chatRoomID);
        setChatUser(matches.map((item) => ({id: item.toID, name: item.matcher.name})));
      } catch (err) {
        console.warn(err);
        setChatUser([]);
      }
    };
    m_bringMatchByChatRoom();
  }, []);

  useEffect(() => {
    console.log(chatUser);
    if (chatUser.length == 1) {
      setDisableInput(true);
      setAlertOpen(true);
    }
  }, [chatUser])

  return (
    <SafeAreaView style={styles.container}>
      <ChatRoom {...props}/>
      {!disableInput &&
        <InputBox {...props} chatUser={chatUser}/>
      }
      <SimpleAlert
        modalOpen={alertOpen}
        setModalOpen={setAlertOpen}
        title='상대가 방을 나갔습니다.'
        content='채팅을 이용할 수 없습니다.'
        onOk={() => {}}
      />
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

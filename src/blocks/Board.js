import React, {useContext, useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Text from './Text';
import SimpleAlert from './SimpleAlert';
import config from 'src/config';
import Dialog from 'src/blocks/Dialog';
import SendSignalModal from './SendSignalModal';
import {MyContext, ThemeContext, UserContext} from 'src/context';

// boardOptions = ['익명', '학교/학과 공개']
const boardOptions = config.community.boardOptions;

export function Nickname({type, nickname, userID, style}) {
  const {theme} = useContext(ThemeContext);
  const [gender, name] = nickname.split('|');

  // if board type is '익명'
  if (type == boardOptions[0]) {
    return (
      <Text style={style}>{name}</Text>
    );
  }
  const {user} = useContext(MyContext);
  const userSub = user.sub;
  const {signalCnt} = useContext(UserContext);
  const [menuShow, setMenuShow] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  // if (type == boardOptions[1])
  if (!userID || userSub == userID) {
    return (
      <Text style={[style, gender=='남자'?{color: theme.men}:{color: theme.women}]}>{name}</Text>
    );
  };
  return (
    <View>
      <TouchableOpacity onPress={() => setMenuShow(true)}>
        <Text style={[style, gender=='남자'?{color: theme.men}:{color: theme.women}]}>{name}</Text>
      </TouchableOpacity>
      <Dialog visible={menuShow} onDismiss={() => setMenuShow(false)}>
        <TouchableOpacity onPress={() => {
          if (signalCnt >= config.manage.signalMax) {
            setAlertOpen(true);
            setMenuShow(false);
          } else {
            setPopupVisible(true);
            setMenuShow(false);
          }
        }}>
          <Text style={styles.menuText}>시그널 보내기</Text>
        </TouchableOpacity>
      </Dialog>
      <SimpleAlert
        modalOpen={alertOpen}
        setModalOpen={setAlertOpen}
        title='Signal 이 부족합니다.'
        content='Signal은 매일 새로 충전됩니다.'
        onOk={() => {}}
      />
      <SendSignalModal toID={userID} popupVisible={popupVisible} setPopupVisible={setPopupVisible}/>
    </View>
  );
}

const styles = StyleSheet.create({
  menuText: {
    padding: 5,
    fontSize: 14,
  },
});

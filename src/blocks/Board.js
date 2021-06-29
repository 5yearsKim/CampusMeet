import React, {useContext, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Text from './Text';
import SimpleAlert from './SimpleAlert';
import config from 'src/config';
import {Portal, Dialog} from 'react-native-paper';
import SendSignalModal from './SendSignalModal';
import {ThemeContext, UserContext} from 'src/context';

// boardOptions = ['익명', '학교/학과 공개']
const boardOptions = config.community.boardOptions;

export function Nickname({type, nickname, userID, style}) {
  const {theme} = useContext(ThemeContext);
  const [gender, name] = nickname.split('|');
  // if board type is '익명'
  if (type == boardOptions[0]) {
    return (
      <Text style={[style, {color: theme.subText}]}>{name}</Text>
    );
  }
  const {signalCnt} = useContext(UserContext);
  const [dialog, setDialog] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  if (type == boardOptions[1]) {
    return (
      <View>
        <TouchableOpacity onPress={() => setDialog(true)}>
          <Text style={[style, gender=='남자'?{color: theme.men}:{color: theme.women}]}>{name}</Text>
        </TouchableOpacity>
        <Portal>
          <Dialog visible={dialog} onDismiss={() => setDialog(false)}>
            <Dialog.Content>
              <TouchableOpacity onPress={() => {
                if (signalCnt >= config.manage.signalMax) {
                  setAlertOpen(true);
                  setDialog(false);
                } else {
                  setPopupVisible(true);
                  setDialog(false);
                }
              }}>
                <Text style={{color: 'black'}}>시그널 보내기</Text>
              </TouchableOpacity>
            </Dialog.Content>
          </Dialog>
        </Portal>
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
}

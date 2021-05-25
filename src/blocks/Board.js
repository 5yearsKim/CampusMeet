import React, {useContext, useState} from 'react';
import {View, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import Text from './Text';
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

  if (type == boardOptions[1]) {
    return (
      <View>
        <TouchableOpacity onPress={() => setDialog(true)}>
          <Text style={[style, gender=='남자'?{color: config.colors.main.men}:{color: config.colors.main.women}]}>{name}</Text>
        </TouchableOpacity>

        <Portal>
          <Dialog visible={dialog} onDismiss={() => setDialog(false)}>
            <Dialog.Content>
              <TouchableOpacity onPress={() => {
                if (signalCnt >= config.manage.signalMax) {
                  Alert.alert(
                      'Signal 이 부족합니다.',
                      'Signal은 매일 새로 충전됩니다.',
                  );
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

        <SendSignalModal toID={userID} popupVisible={popupVisible} setPopupVisible={setPopupVisible}/>

      </View>
    );
  }
}

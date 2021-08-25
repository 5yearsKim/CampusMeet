import React, {useEffect, useState, useContext} from 'react';
import Text from './Text';
import SimpleAlert from './SimpleAlert';
import {Button, TextInput} from 'react-native-paper';
import {View, KeyboardAvoidingView, Dimensions, TouchableWithoutFeedback, Modal, StyleSheet} from 'react-native';
import {MyContext, ThemeContext, UserContext} from 'src/context';
import {makeSignal} from 'src/utils/Signal';
import {sendSignalNotification} from 'src/utils/PushNotification';


const {width, height} = Dimensions.get('window');

export default function SendSignalModal({toID, popupVisible, setPopupVisible, onConfirmSend}) {
  const auth = useContext(MyContext);
  const userSub = auth.user.sub;
  const {theme} = useContext(ThemeContext);
  const {signalCnt, setSignalCnt, refreshCandidate, setRefreshCandidate, refreshSentSignal, setRefreshSentSignal, setNewCand} = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [popupError, setPopupError] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    return () => {
      setRefreshCandidate(!refreshCandidate);
      setRefreshSentSignal(!refreshSentSignal);
    };
  }, []);

  const onSendSignal = async () => {
    try {
      setNewCand(true);
      setSignalCnt(signalCnt + 1);
      await makeSignal(userSub, toID, message);
      sendSignalNotification(toID);
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View>
      <Modal visible={popupVisible} onRequestClose={() => setPopupVisible(false)} transparent={true}>
        <TouchableWithoutFeedback onPress={() => setPopupVisible(false)}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.modalContainer}
          >
            <TouchableWithoutFeedback onPress={() => {}}>
              <View
                style={[styles.popupContainer, {backgroundColor: theme.background}]}
              >
                <Text style={styles.popupTitleText}>한 줄로 메세지를 전해보세요!</Text>
                <TextInput
                  mode='flat'
                  label='Message'
                  placeholder='메세지가 상대에게 전달됩니다.'
                  onChangeText={(text) => setMessage(text)}
                  maxLength={300}
                  multiline={true}
                  style = {{backgroundColor: 'transparent', maxHeight: 120}}
                  value={message}
                />
                {popupError.length > 0 &&
                  <Text style={styles.errorText}>{popupError}</Text>
                }
                <View style={styles.popupButtonWrapper}>
                  <Button
                    mode='text'
                    onPress={() => setPopupVisible(false)}
                    labelStyle={styles.popupButtonText}
                  >
                    취소
                  </Button>
                  <Button
                    mode='text'
                    onPress={() => {
                      if (message.trim() == '') {
                        setPopupError('메세지를 입력해주세요.');
                      } else {
                        onSendSignal();
                        setPopupVisible(false);
                        setAlertOpen(true);
                      }
                      setMessage('');
                    }}
                    labelStyle={styles.popupButtonText}
                  >
                    전송
                  </Button>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
      <SimpleAlert
        modalOpen={alertOpen}
        setModalOpen={setAlertOpen}
        title='시그널이 전송되었습니다'
        content='Signal 탭에서 확인하세요.'
        onOk={() => {
          if (onConfirmSend) {
            onConfirmSend();
          }
        }}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0, 0.5)',
    alignItems: 'center',
  },
  popupContainer: {
    width: width*0.9,
    // height: height*0.3,
    borderRadius: 15,
    padding: 10,
  },
  popupButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
    margin: 10,
  },
  popupButtonText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  popupTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    marginTop: 20,
  },
  errorText: {
    color: 'red',
  },
});

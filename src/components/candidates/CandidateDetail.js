import React, {useState, useContext} from 'react';
import {Dimensions, ScrollView, View, Image, TouchableWithoutFeedback, Modal, Alert, StyleSheet} from 'react-native';
import Text from 'src/blocks/Text';
import {TextInput} from 'react-native-paper';
import {Button} from 'react-native-paper';
import config from 'src/config';
import {MyContext, ThemeContext} from 'src/context';
import {makeSignal} from 'src/utils/Signal';


const {width, height} = Dimensions.get('window');

function CandidateDetail({item, signalCnt, refresh, useAction}) {
  const auth = useContext(MyContext);
  const {theme} = useContext(ThemeContext);
  const [sent, setSent] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [popupError, setPopupError] = useState('');

  const onSendSignal = () => {
    const userSub = auth.user.attributes.sub;
    makeSignal(userSub, item.id, message);
    refresh();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.titleText}>{item.campus} {item.graduate}</Text>
        <Text style={styles.subtitleText}>{item.division} {item.year}학번</Text>
      </View>
      <View style={styles.middleContainer}>
        <View style={styles.imageWrapper}>
          <Image
            source={require('src/assets/images/no_profile3.png')}
            style={[styles.avatar, {borderColor: item.gender=='남자'?config.colors.main.men: config.colors.main.women}]}
          />
          <Text style={styles.messageText}>{item.profileMessage}</Text>
        </View>
        <View style={{padding: 5}}>
          <View style={styles.itemWrapper}>
            <Text style={styles.categoryText}>성별</Text>
            <Text style={styles.detailText}>{item.gender}</Text>
          </View>
          <View style={styles.itemWrapper}>
            <Text style={styles.categoryText}>소개</Text>
            <Text style={styles.detailText}>{item.profileDescription}</Text>
          </View>
        </View>
      </View>
      {useAction == true &&
        <View style={styles.bottomContainer}>
          {sent ?
            <Text style={styles.sentText}>Signal을 보냈습니다!</Text>:
            <Button
              mode='text'
              onPress={() => {
                if (signalCnt >= config.manage.signalMax) {
                  Alert.alert(
                      'Signal 이 부족합니다.',
                      'Signal은 매일 새로 충전됩니다.',
                  );
                } else {
                  setPopupVisible(true);
                }
              }}
            >
              Signal 보내기
            </Button>
          }
        </View>
      }
      <Modal visible={popupVisible} onRequestClose={() => setPopupVisible(false)} transparent={true}>
        <TouchableWithoutFeedback onPress={() => setPopupVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={[styles.popupContainer, {backgroundColor: theme.background}]}>
                <Text style={styles.popupTitleText}>한 줄로 메세지를 전해보세요!</Text>
                <TextInput
                  mode='flat'
                  label='Message'
                  placeholder='메세지가 상대에게 전달됩니다.'
                  value={message}
                  onChangeText={(text) => setMessage(text)}
                  multiline={true}
                  style = {{backgroundColor: 'transparent'}}
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
                      if (message.trim().length == 0) {
                        setPopupError('메세지를 입력해주세요.');
                      } else {
                        onSendSignal();
                        setSent(true);
                        setMessage('');
                        setPopupVisible(false);
                      }
                    }}
                    labelStyle={styles.popupButtonText}
                  >
                    전송
                  </Button>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
  },
  topContainer: {
    alignItems: 'center',
    // backgroundColor: 'green',
  },
  titleText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitleText: {
    marginTop: 3,
    fontSize: 14,
    color: 'gray',
  },
  middleContainer: {
    padding: 10,
    // backgroundColor: 'pink',
  },
  imageWrapper: {
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 50,
    borderWidth: 5,
  },
  messageText: {
    fontSize: 18,
    color: 'gray',
    fontWeight: 'bold',
  },
  itemWrapper: {
    margin: 10,
  },
  categoryText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  detailText: {
    color: 'gray',
    fontSize: 14,
  },
  bottomContainer: {
    alignItems: 'center',
  },
  sentText: {
    fontWeight: 'bold',
    color: config.colors.main.primary,
  },
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

export default CandidateDetail;

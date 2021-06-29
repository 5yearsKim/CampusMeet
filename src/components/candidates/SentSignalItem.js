import React, {useState, useContext} from 'react';
import {Dimensions, View, Image, TouchableWithoutFeedback, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import SimpleAlert from 'src/blocks/SimpleAlert';
import Text from 'src/blocks/Text';
import {Button} from 'react-native-paper';
import CandidateDetail from './CandidateDetail';
import {removeSignal} from 'src/utils/Signal';
import {relativeTimePrettify} from 'src/utils/Time';
import {ThemeContext, UserContext} from 'src/context';

const {width, height} = Dimensions.get('window');

function LeftContent({gender}) {
  const {theme} = useContext(ThemeContext);
  return (
    <Image
      source={require('assets/images/no_profile3.png')}
      style={[styles.avatar, {borderColor: gender=='남자'?theme.men:theme.women}]}
    />
  );
}

function SentSignalItem({item}) {
  const receiver = item.receiver;
  const [popupVisible, setPopupVisible] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const {theme} = useContext(ThemeContext);
  const {refreshSentSignal, setRefreshSentSignal} = useContext(UserContext);

  const onRemoveSignal = async () => {
    try {
      await removeSignal(item.id);
      setRefreshSentSignal(!refreshSentSignal);
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setPopupVisible(true)}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <LeftContent gender={receiver.gender}/>
          <View>
            <Text style={[styles.titleText, {color: theme.text}]}>{receiver.campus} {receiver.graduate}</Text>
            <Text style={[styles.subtitleText, {color: theme.subText}]}>{receiver.division} {receiver.year}학번</Text>
            <Text style={[styles.messageText, {color: theme.subText}]}>{item.message}</Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.timeText}>{relativeTimePrettify(item.createdAt, 'week')}</Text>
          {item.alive?
            <Button
              onPress={() => setAlertOpen(true)}
              labelStyle={styles.buttonText}
            >
              Signal 취소
            </Button>:
            <Button
              onPress={() => alertRemoveSignal()}
              labelStyle={[styles.buttonText, {color: 'red'}]}
            >
              거절됨
            </Button>
          }
        </View>
      </TouchableOpacity>
      <Modal visible={popupVisible} onRequestClose={() => setPopupVisible(false)} transparent={true}>
        <TouchableWithoutFeedback onPress={() => setPopupVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.cardContainer}>
                <CandidateDetail item={receiver}/>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <SimpleAlert
        modalOpen={alertOpen}
        setModalOpen={setAlertOpen}
        title='시그널 삭제'
        content='시그널이 삭제되고 상대는 더 이상 나를 확인할 수 없습니다.'
        onCancel={() => {}}
        onOk={() => onRemoveSignal()}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  avatar: {
    margin: 15,
    height: 70,
    width: 70,
    borderRadius: 50,
    borderWidth: 3,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  subtitleText: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
  messageText: {
    marginTop: 10,
    marginLeft: 5,
    fontSize: 13,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#444444',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    color: 'gray',
    fontSize: 12,
    marginLeft: 20,
  },
  buttonText: {
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
  },
  cardContainer: {
    width: width*0.8,
    height: height*0.6,
    borderRadius: 15,
    backgroundColor: 'white',
  },
});

export default SentSignalItem;

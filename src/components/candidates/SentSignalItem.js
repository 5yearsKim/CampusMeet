import React, {useState, useContext} from 'react';
import {Dimensions, View, Image, TouchableWithoutFeedback, TouchableOpacity, Modal, Alert, StyleSheet} from 'react-native';
import Text from 'src/blocks/Text';
import {Button} from 'react-native-paper';
import CandidateDetail from './CandidateDetail';
import {removeSignal} from 'src/utils/Signal';
import {relativeTimePrettify} from 'src/utils/Time';
import config from 'src/config';
import {ThemeContext, UserContext} from 'src/context';

const {width, height} = Dimensions.get('window');

function LeftContent({gender}) {
  return (
    <Image
      source={require('src/assets/images/no_profile3.png')}
      style={[styles.avatar, {borderColor: gender=='남자'?config.colors.main.men:config.colors.main.women}]}
    />
  );
}

function SentSignalItem({item}) {
  const receiver = item.receiver;
  const [popupVisible, setPopupVisible] = useState(false);
  const {theme} = useContext(ThemeContext);
  const {refreshSentSignal, setRefreshSentSignal} = useContext(UserContext);

  const alertRemoveSignal = () => {
    Alert.alert(
        'Signal 삭제',
        'Signal이 삭제되고 상대는 더 이상 나를 볼 수 없습니다.',
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => onRemoveSignal(),
          },
        ],
    );
  };

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
              onPress={() => alertRemoveSignal()}
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
    borderWidth: 5,
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

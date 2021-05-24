import React, {useState, useContext} from 'react';
import {View, Dimensions, Modal, TouchableOpacity, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import Text from 'src/blocks/Text';
import {Button} from 'react-native-paper';
import {AntDesign} from '@expo/vector-icons';
import CandidateDetail from './CandidateDetail';
import config from 'src/config';
import {ThemeContext} from 'src/context';

const {width, height} = Dimensions.get('window');

function LeftContent({gender}) {
  return (
    <View style={styles.leftContainer}>
      <View style={styles.avatar}>
        <AntDesign name='heart' size={40} color={gender=='남자'?config.colors.main.men:config.colors.main.women}/>
      </View>
    </View>
  );
}

function CandidateItem({item, signalCnt, refresh}) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [isHide, setIsHide] = useState(false);
  const {theme} = useContext(ThemeContext);

  if (isHide) {
    console.log('hide:', isHide);
    return (
      <View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setPopupVisible(true)}>
        <View style={{flexDirection: 'row'}}>
          <LeftContent gender={item.gender} />
          <View style={{marginLeft: 10}}>
            <Text style={[styles.titleText, {color: theme.text}]}>{item.campus} {item.graduate}</Text>
            <Text style={[styles.subtitleText, {color: theme.subText}]}>{item.division} {item.year}학번</Text>
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            mode='text'
            onPress={() => setIsHide(true)}
            labelStyle={styles.buttonText}
          >
            숨기기
          </Button>
        </View>
      </TouchableOpacity>
      <Modal visible={popupVisible} onRequestClose={() => setPopupVisible(false)} transparent={true}>
        <TouchableWithoutFeedback onPress={() => setPopupVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={[styles.cardContainer, {backgroundColor: theme.background}]}>
                <CandidateDetail item={item} signalCnt={signalCnt} useAction={true} refresh={refresh}/>
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
  leftContainer: {
    justifyContent: 'center',
    marginLeft: 20,
  },
  avatar: {
    backgroundColor: '#fffac4',
    justifyContent: 'center',
    borderRadius: 50,
    padding: 15,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 20,
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
  },
});

export default CandidateItem;

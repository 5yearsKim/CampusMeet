import React, {useState, useContext} from 'react';
import {View, Dimensions, Modal, TouchableOpacity, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {KeyImage} from 'src/blocks/Image';
import Text from 'src/blocks/Text';
import {Button} from 'react-native-paper';
import CandidateDetail from './CandidateDetail';
import {ThemeContext} from 'src/context';
import {campusDict} from 'assets/campusLogos';

const {width, height} = Dimensions.get('window');

function LeftContent({item}) {
  const {theme} = useContext(ThemeContext);
  const logo = campusDict[item.campus];
  const customStyle = {};
  customStyle.borderColor = item.gender=='남자'? theme.men : theme.women;
  if (!logo) {
    return (
      <View style={{justifyContent: 'center', marginLeft: 20}}>
        <View style={[styles.logo, customStyle, {justifyContent: 'center', backgroundColor: 'white', alignItems: 'center'}]}>
          <Text style={styles.avatarText}>{item.campus.slice(0, 3)}</Text>
        </View>
      </View>
    );
  }
  if (logo.logo.includes('.gif')) {
    customStyle.overlayColor= theme.background;
  }
  return (
    <View style={{justifyContent: 'center', marginLeft: 20}}>
      <KeyImage imgKey={logo.logo} style={[styles.logo, customStyle]}/>
    </View>
  );
}

function CandidateItem({item}) {
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
          <LeftContent item={item} />
          <View style={{marginLeft: 10, paddingTop: 10}}>
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
                <CandidateDetail item={item} useAction={true}/>
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
  logo: {
    height: 70,
    width: 70,
    borderRadius: 50,
    borderWidth: 3,
  },
  avatar: {
    backgroundColor: '#fffac4',
    justifyContent: 'center',
    borderRadius: 50,
    padding: 15,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
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

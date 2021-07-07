import React, {useState, useContext} from 'react';
import {View, Dimensions, Modal, TouchableOpacity, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {KeyImage} from 'src/blocks/Image';
import Text from 'src/blocks/Text';
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
          <Text ellipsizeMode='tail' numberOfLines={2} style={styles.avatarText}>{item.campus}</Text>
          {/* <Text ellipsizeMode='tail' numberOfLines={2} style={styles.avatarText}>Harverd University</Text> */}
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
  const {theme} = useContext(ThemeContext);
  const clearModal = () => setPopupVisible(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setPopupVisible(true)}>
        <View style={{flexDirection: 'row'}}>
          <LeftContent item={item} />
          <View style={{marginLeft: 10, paddingTop: 10}}>
            <Text style={[styles.titleText, {color: theme.text}]}>{item.campus} {item.division}</Text>
            <Text style={[styles.subtitleText, {color: theme.subText}]}>{item.graduate} {item.year}학번</Text>
            <Text style={[styles.messageText]}>{item.profileMessage}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <Modal visible={popupVisible} onRequestClose={() => setPopupVisible(false)} transparent={true}>
        <TouchableWithoutFeedback onPress={() => setPopupVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={[styles.cardContainer, {backgroundColor: theme.background}]}>
                <CandidateDetail item={item} useAction={true} clearModal={clearModal}/>
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
    margin: 5,
    marginBottom: 10,
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    paddingBottom: 15,
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  subtitleText: {
    fontSize: 13,
    // fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
    // marginLeft: 70,
  },
  messageText: {
    fontSize: 13,
    marginTop: 8,
    fontStyle: 'italic',
    color: 'gray',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
  },
  cardContainer: {
    width: width*0.8,
    minHeight: height*0.3,
    borderRadius: 15,
  },
});

export default CandidateItem;

import React, {useState, useEffect, useContext} from 'react';
import {Dimensions, View, FlatList, Modal, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import Text from 'src/blocks/Text';
import {Button} from 'react-native-paper';
import {FontAwesome5} from '@expo/vector-icons';
import {bringCandidate} from 'src/utils/User';
import CandidateItem from './CandidateItem';
import Preference from './Preference';
import {ThemeContext, UserContext} from 'src/context';
import config from 'src/config';

const {width, height} = Dimensions.get('window');
const signalMax = config.manage.signalMax;

function CandidateHeader() {
  const {theme} = useContext(ThemeContext);
  const {signalCnt} = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.headerContainer} key='header'>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={[styles.heartText, {color: theme.subText}]}>signal left: </Text>
        {[...Array(Math.max(0, signalMax - signalCnt))].map((_, index) => {
          return (
            <FontAwesome5 name="heartbeat" size={24} color="pink" key={index} style={{margin: 2}}/>
          );
        })}
      </View>
      <Button icon='filter' mode='text' onPress={() => setModalVisible(true)}>
        FILTER
      </Button>
      <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)} transparent={true}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={[styles.filterContainer, {backgroundColor: theme.background}]}>
                <Preference onClose={() => setModalVisible(false)}/>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

function Candidate({navigation}) {
  const {refreshCandidate} = useContext(UserContext);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const m_bringCandidate = async () => {
      try {
        const userData = await bringCandidate();
        setUserList(userData);
      } catch (err) {
        console.warn(err);
        setUserList([]);
      }
    };
    m_bringCandidate();
  }, [refreshCandidate]);


  return (
    <View>
      <FlatList
        data={userList}
        renderItem={({item}) => <CandidateItem item={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => <CandidateHeader/>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    paddingLeft: 20,
  },
  heartText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
  },
  filterContainer: {
    width: width*0.85,
    // height: height*0.7,
    borderRadius: 15,
  },
});

export default Candidate;

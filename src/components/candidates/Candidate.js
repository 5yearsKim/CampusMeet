import React, {useState, useEffect, useContext} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import Text from 'src/blocks/Text';
import {Button} from 'react-native-paper';
import {FontAwesome5} from '@expo/vector-icons';
import {bringCandidate} from 'src/utils/User';
import CandidateItem from './CandidateItem';
import {MyContext, ThemeContext, UserContext} from 'src/context';
import config from 'src/config';

const signalMax = config.manage.signalMax;

function CandidateHeader() {
  const {theme} = useContext(ThemeContext);
  const {signalCnt} = useContext(UserContext);
  return (
    <View style={styles.headerContainer} key='header'>
      <View style={{flexDirection: 'row'}}>
        <Text style={[styles.heartText, {color: theme.subText}]}>signal left:</Text>
        {[...Array(signalMax - signalCnt)].map((_, index) => {
          return (
            <FontAwesome5 name="heartbeat" size={24} color="pink" key={index}/>
          );
        })}
      </View>
      <Button icon='filter' mode='text'>
        FILTER
      </Button>
    </View>
  );
}

function Candidate() {
  const [userList, setUserList] = useState([]);
  const {refreshCandidate} = useContext(UserContext);

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
  },
  heartText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Candidate;

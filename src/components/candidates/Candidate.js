import React, {useState, useEffect, useContext} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import Text from 'src/blocks/Text';
import {Button} from 'react-native-paper';
import {FontAwesome5} from '@expo/vector-icons';
import {bringCandidate} from 'src/utils/User';
import {bringSentSignalToday} from 'src/utils/Signal';
import CandidateItem from './CandidateItem';
import {MyContext, ThemeContext} from 'src/context';
import config from 'src/config';

const signalMax = config.manage.signalMax;

function CandidateHeader({signalCnt}) {
  const {theme} = useContext(ThemeContext);
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
  const auth = useContext(MyContext);
  const userSub = auth.user.attributes.sub;
  const [userList, setUserList] = useState([]);
  const [signalCnt, setSignalCnt] = useState(signalMax); // total sent signal today
  const [refresh, setRefresh] = useState(false);
  const refreshCandidate = () => setRefresh(!refresh);

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
  }, []);

  useEffect(() => {
    const m_bringSentSignalToday = async (fromID) => {
      try {
        const signalData = await bringSentSignalToday(userSub);
        setSignalCnt(signalData.length);
      } catch (err) {
        console.warn(err);
      }
    };
    m_bringSentSignalToday();
  }, [refresh]);

  const renderCandidate = ({item}) => {
    return <CandidateItem item={item} signalCnt={signalCnt} refresh={refreshCandidate}/>;
  };

  return (
    <View>
      <FlatList
        data={userList}
        renderItem={renderCandidate}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => <CandidateHeader signalCnt={signalCnt}/>}
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

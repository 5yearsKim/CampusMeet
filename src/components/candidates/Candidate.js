import React, {useState, useEffect, useContext} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import Text from 'src/blocks/Text';
import NotiText from 'src/blocks/NotiText';
import {Button} from 'react-native-paper';
import {FontAwesome5} from '@expo/vector-icons';
import {bringCandidate} from 'src/utils/User';
import CandidateItem from './CandidateItem';
import Preference from './Preference';
import {MyContext, ThemeContext, UserContext} from 'src/context';
import config from 'src/config';
import {bringUser, checkCandidate, setupIndividual} from 'src/utils/User';
import {bringSentSignalToday} from 'src/utils/Signal';

import StartSetting from 'src/components/StartSetting';

const signalMax = config.manage.signalMax;

function CandidateHeader() {
  const {theme} = useContext(ThemeContext);
  const {signalCnt} = useContext(UserContext);
  const [filterOpen, setFilterOpen] = useState(false);
  return (
    <View style={styles.headerContainer} key='header'>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={[styles.heartText, {color: theme.subText}]}>Signals: </Text>
        {[...Array(Math.max(0, signalMax - signalCnt))].map((_, index) => {
          return (
            <FontAwesome5 name="heartbeat" size={24} color="pink" key={index} style={{margin: 2}}/>
          );
        })}
      </View>
      <Preference filterOpen={filterOpen} setFilterOpen={setFilterOpen}/>
      <Button icon='filter' mode='text' onPress={() => setFilterOpen(true)}>
        FILTER
      </Button>
    </View>
  );
}

function CandidateFooter({loading, setLoading}) {
  const {refreshCandidate, setRefreshCandidate, newCand, setNewCand} = useContext(UserContext);
  if (loading || !newCand) {
    return null;
  }
  const newCandidate = async () => {
    await setupIndividual();
    setNewCand(false);
    setLoading(true);
    setRefreshCandidate(!refreshCandidate);
    checkCandidate();
  };
  return (
    <View>
      <Button
        onPress={() => newCandidate()}
      >
        새로추천받기
      </Button>
    </View>
  );
}

function Candidate({navigation}) {
  const auth = useContext(MyContext);
  const userSub = auth.user.attributes.sub;
  const {refreshCandidate, setRefreshCandidate} = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userList, setUserList] = useState([]);


  useEffect(() => {
    const m_bringCandidate = async () => {
      try {
        let sentSignalList = await bringSentSignalToday(userSub);
        sentSignalList = sentSignalList.map((item) => item.toID);
        const userData = await bringCandidate();
        setUserList(userData.filter((item) => !sentSignalList.includes(item.id)));
        setLoading(false);
      } catch (err) {
        console.warn(err);
        setUserList([]);
      }
    };
    m_bringCandidate();
  }, [refreshCandidate]);

  useEffect(() => {
    checkCandidate();
  }, []);

  useEffect(() => {
    const m_bringUser = async () => {
      try {
        const userData = await bringUser(userSub);
        setUser(userData);
      } catch (err) {
        console.warn(err);
      }
    };
    m_bringUser();
  }, []);

  return (
    <View style={{flex: 1}}>
      <StartSetting navigation={navigation} user={user}/>
      <FlatList
        data={userList}
        renderItem={({item}) => <CandidateItem item={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<CandidateHeader/>}
        ListFooterComponent={<CandidateFooter loading={loading} setLoading={setLoading}/>}
        onRefresh={() => {
          setLoading(true);
          setRefreshCandidate(!refreshCandidate);
        }}
        ListEmptyComponent={!loading && <NotiText content='추천 카드가 없습니다.'/>}
        refreshing={loading}
        removeClippedSubviews={false}
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
});

export default Candidate;

import React, {useState, useEffect, useContext} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import Text from 'src/blocks/Text';
import {Button} from 'react-native-paper';
import {FontAwesome5} from '@expo/vector-icons';
import {bringCandidate} from 'src/utils/User';
import CandidateItem from './CandidateItem';
import Preference from './Preference';
import {MyContext, ThemeContext, UserContext} from 'src/context';
import config from 'src/config';
import {bringUser, checkCandidate} from 'src/utils/User';

import PushNotification from 'src/components/PushNotification';

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
        const userData = await bringCandidate();
        setUserList(userData);
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
      <PushNotification navigation={navigation} user={user}/>
      <FlatList
        data={userList}
        renderItem={({item}) => <CandidateItem item={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<CandidateHeader/>}
        onRefresh={() => {
          setLoading(true);
          setRefreshCandidate(!refreshCandidate);
        }}
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

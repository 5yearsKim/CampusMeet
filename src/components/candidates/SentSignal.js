import React, {useState, useEffect, useContext} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import Text from 'src/blocks/Text';
import NotiText from 'src/blocks/NotiText';
import {bringSentSignal} from 'src/utils/Signal';
import SentSignalItem from './SentSignalItem';
import {MyContext, UserContext} from 'src/context';

function SentSignal({navigation}) {
  const auth = useContext(MyContext);
  const userSub = auth.user.attributes.sub;
  const [userList, setUserList] = useState([]);
  const {refreshSentSignal, setRefreshSentSignal} = useContext(UserContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const m_bringSentSignal = async () => {
      try {
        const userData = await bringSentSignal(userSub);
        setUserList(userData);
        setLoading(false);
      } catch (err) {
        console.warn(err);
        setUserList([]);
      }
    };
    m_bringSentSignal();
  }, [refreshSentSignal]);

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={userList}
        renderItem={({item}) => <SentSignalItem item={item}/>}
        ListEmptyComponent={<NotiText content='보낸 시그널이 없습니다.'/>}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={() => {
          setLoading(true);
          setRefreshSentSignal(!refreshSentSignal);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  noSignalText: {
    fontWeight: 'bold',
    color: 'gray',
    fontSize: 15,
  },
});

export default SentSignal;

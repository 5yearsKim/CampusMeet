import React, {useState, useEffect, useContext} from 'react';
import {View, FlatList} from 'react-native';
import NotiText from 'src/blocks/NotiText';
import ReceivedSignalItem from './ReceivedSignalItem';
import {MyContext, UserContext, BadgeContext} from 'src/context';
import {makeMatch} from 'src/utils/Match';
import {bringReceivedSignal, removeSignal, rejectSignal} from 'src/utils/Signal';
import {sendMatchNotification} from 'src/utils/PushNotification';

function ReceivedSignal({navigation}) {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);

  const auth = useContext(MyContext);
  const userSub = auth.user.attributes.sub;
  const {refreshReceivedSignal, setRefreshReceivedSignal, refreshMatch, setRefreshMatch} = useContext(UserContext);
  const {setSignalBadge} = useContext(BadgeContext);

  useEffect(() => {
    const m_bringReceivedSignal = async () => {
      try {
        const userData = await bringReceivedSignal(userSub);
        setUserList(userData);
        setLoading(false);
      } catch (err) {
        console.warn(err);
        setUserList([]);
      }
    };
    m_bringReceivedSignal();
  }, [refreshReceivedSignal]);

  useEffect(() => {
    const newList = userList.filter((item) => !item.checked);
    setSignalBadge(newList.length);
  }, [userList]);

  const onReject = async (signalID) => {
    try {
      await rejectSignal(signalID);
      setUserList(userList.filter((item) => item.id != signalID));
    } catch (err) {
      console.warn(err);
    }
  };

  const onMatch = async (signalID, senderID) => {
    try {
      await makeMatch(userSub, senderID);
      await removeSignal(signalID);
      sendMatchNotification(senderID);
      setUserList(userList.filter((item) => item.id != signalID));
      setRefreshMatch(!refreshMatch);
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={userList}
        renderItem={({item}) => (
          <ReceivedSignalItem
            item={item}
            navigation={navigation}
            onReject={onReject}
            onMatch={onMatch}
          />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={!loading && <NotiText content='받은 시그널이 없습니다.'/>}
        refreshing={loading}
        onRefresh={() => {
          setLoading(true);
          setRefreshReceivedSignal(!refreshReceivedSignal);
        }}
        removeClippedSubviews={false}
      />
    </View>
  );
}

export default ReceivedSignal;

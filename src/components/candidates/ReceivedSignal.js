import React, {useState, useEffect, useContext} from 'react';
import {View, FlatList} from 'react-native';
import Loading from 'src/blocks/Loading';
import ReceivedSignalItem from './ReceivedSignalItem';
import {MyContext} from 'src/context';
import {makeMatch} from 'src/utils/Match';
import {bringReceivedSignal, removeSignal, rejectSignal} from 'src/utils/Signal';

function ReceivedSignal({navigation}) {
  const [userList, setUserList] = useState([]);
  const auth = useContext(MyContext);
  const userSub = auth.user.attributes.sub;

  useEffect(() => {
    const m_bringReceivedSignal = async () => {
      try {
        const userData = await bringReceivedSignal(userSub);
        setUserList(userData);
      } catch (err) {
        console.warn(err);
        setUserList([]);
      }
    };
    m_bringReceivedSignal();
  }, []);

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
      setUserList(userList.filter((item) => item.id != signalID));
    } catch (err) {
      console.warn(err);
    }
  };

  if (userList.length <= 0) {
    return (
      <Loading content='받은 시그널이 없습니다.'/>
    );
  }
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
      />
    </View>
  );
}

export default ReceivedSignal;

import React, {useState, useEffect, useContext} from 'react';
import {View, FlatList} from 'react-native';
import Text from 'src/blocks/Text';
import ReceivedSignalItem from './ReceivedSignalItem';
import {bringReceivedSignal} from 'src/utils/Signal';
import {MyContext} from 'src/context';

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
  const renderReceivedSignal = ({item}) => {
    return <ReceivedSignalItem item={item} navigation={navigation}/>;
  };
  if (userList.length <= 0) {
    return (
      <View>
        <Text>No signal today</Text>
      </View>
    );
  }
  return (
    <View>
      <FlatList
        data={userList}
        renderItem={renderReceivedSignal}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default ReceivedSignal;

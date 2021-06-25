import React, {useState, useEffect, useContext} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
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
      <View style={styles.container}>
        <Text style={styles.noSignalText}>받은 시그널이 없습니다.</Text>
      </View>
    );
  }
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={userList}
        renderItem={renderReceivedSignal}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
  },
  noSignalText: {
    fontWeight: 'bold',
    color: 'gray',
    fontSize: 15,
  },
});

export default ReceivedSignal;

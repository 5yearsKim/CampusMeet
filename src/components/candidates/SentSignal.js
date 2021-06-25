import React, {useState, useEffect, useContext} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import Text from 'src/blocks/Text';
import {bringSentSignal} from 'src/utils/Signal';
import SentSignalItem from './SentSignalItem';
import {MyContext, UserContext} from 'src/context';

function SentSignal({navigation}) {
  const auth = useContext(MyContext);
  const userSub = auth.user.attributes.sub;
  const [userList, setUserList] = useState([]);
  const {refreshSentSignal} = useContext(UserContext);

  useEffect(() => {
    const m_bringSentSignal = async () => {
      try {
        const userData = await bringSentSignal(userSub);
        setUserList(userData);
      } catch (err) {
        console.warn(err);
        setUserList([]);
      }
    };
    m_bringSentSignal();
  }, [refreshSentSignal]);

  if (userList.length <= 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noSignalText}>보낸 시그널이 없습니다.</Text>
      </View>
    );
  }
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={userList}
        renderItem={({item}) => <SentSignalItem item={item}/>}
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

export default SentSignal;

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
      <View style={styles.noSignal}>
        <Text>보낸 메세지가 없습니다.</Text>
      </View>
    );
  }
  return (
    <View>
      <FlatList
        data={userList}
        renderItem={({item}) => <SentSignalItem item={item}/>}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  noSignal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SentSignal;

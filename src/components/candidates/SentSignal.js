import React, {useState, useEffect, useContext} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import Text from 'src/blocks/Text';
import {bringSentSignal} from 'src/utils/Signal';
import SentSignalItem from './SentSignalItem';
import {MyContext} from 'src/context';

function SentSignal({navigation, parentNavigation}) {
  const auth = useContext(MyContext);
  const userSub = auth.user.attributes.sub;
  const [userList, setUserList] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const refreshSignal = () => setRefresh(!refresh);

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
  }, [refresh]);

  useEffect(() => {
    const unsubscribe = parentNavigation.addListener('tabPress', (e) => {
      refreshSignal();
    });
    return unsubscribe;
  }, [parentNavigation]);

  const renderSentSignal = ({item}) => {
    return <SentSignalItem item={item} refresh={refreshSignal}/>;
  };

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
        renderItem={renderSentSignal}
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

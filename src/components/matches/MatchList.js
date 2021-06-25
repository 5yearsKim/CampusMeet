import React, {useState, useEffect, useContext} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import Text from 'src/blocks/Text';
import MatchListItem from './MatchListItem';
import {bringMatch} from 'src/utils/Match';
import {MyContext} from 'src/context';

function MatchList({navigation}) {
  const auth = useContext(MyContext);
  const userSub = auth.user.attributes.sub;
  const [loading, setLoading] = useState(true);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      m_bringMatch();
    });
    return unsubscribe;
  }, [navigation]);

  const m_bringMatch = async () => {
    try {
      const userData = await bringMatch(userSub);
      const orderedMatch = userData.sort((a, b) => {
        const getMessageTime = (message) => new Date(message.chatRoom.lastMessage.createdAt).getTime();
        if (getMessageTime(a) < getMessageTime(b)) {
          return 1;
        }
        if (getMessageTime(a) > getMessageTime(b)) {
          return -1;
        }
        return 0;
      });
      setUserList(orderedMatch);
      setLoading(false);
    } catch (err) {
      console.warn(err);
      setUserList([]);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.notiText}>Loading..</Text>
      </View>
    );
  }
  if (userList.length == 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.notiText}>쪽지가 없습니다.</Text>
      </View>
    );
  }
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={userList}
        renderItem={({item}) => <MatchListItem item={item} navigation={navigation}/>}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: 'center',
  },
  notiText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'gray',
  },
});

export default MatchList;

import React, {useState, useEffect, useContext} from 'react';
import {View, FlatList} from 'react-native';
import MatchListItem from './MatchListItem';
import {bringMatch} from 'src/utils/Match';
import {MyContext} from 'src/context';

function MatchList({navigation}) {
  const auth = useContext(MyContext);
  const userSub = auth.user.attributes.sub;
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      m_bringMatch();
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
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
    } catch (err) {
      console.warn(err);
      setUserList([]);
    }
  };

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

export default MatchList;

import React, {useState, useEffect, useContext} from 'react';
import {View, FlatList} from 'react-native';
import NotiText from 'src/blocks/NotiText';
import MatchListItem from './MatchListItem';
import {bringMatch, modifyMatch} from 'src/utils/Match';
import {MyContext, UserContext} from 'src/context';

function MatchList({navigation}) {
  const auth = useContext(MyContext);
  const userSub = auth.user.attributes.sub;
  const {refreshMatch, setRefreshMatch} = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const m_bringMatch = async () => {
      try {
        setLoading(true);
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
    m_bringMatch();
  }, [refreshMatch]);


  const deleteMatch = async (matchID) => {
    try {
      await modifyMatch(matchID, {deleted: true});
      setUserList(userList.filter((item) => item.id != matchID));
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={userList}
        renderItem={({item}) => <MatchListItem item={item} navigation={navigation} deleteMatch={deleteMatch}/>}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<NotiText content='쪽지가 없습니다.'/>}
        refreshing={loading}
        onRefresh={() => {
          setLoading(true);
          setRefreshMatch(!refreshMatch);
        }}
      />
    </View>
  );
};

export default MatchList;

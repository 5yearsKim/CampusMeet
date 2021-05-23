import React, {useState, useEffect, useContext} from 'react';
import {View, FlatList} from 'react-native';
import MatchListItem from './MatchListItem';
import {bringMatch} from 'src/utils/Match';
import {MyContext} from 'src/context';

function MatchList({navigation}) {
  const auth = useContext(MyContext);
  const userSub = auth.user.attributes.sub;
  const [userList, setUserList] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const refreshMatch = () => setRefresh(!refresh);

  useEffect(() => {
    const m_bringMatch = async () => {
      try {
        const userData = await bringMatch(userSub);
        setUserList(userData);
      } catch (err) {
        console.warn(err);
        setUserList([]);
      }
    };
    m_bringMatch();
  }, [refresh]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      refreshMatch();
    });
    return unsubscribe;
  }, [navigation]);

  const renderMatch = ({item}) => {
    return <MatchListItem item={item} navigation={navigation}/>;
  };
  return (
    <View>
      <FlatList
        data={userList}
        renderItem={renderMatch}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default MatchList;

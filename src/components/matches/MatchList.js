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
      setUserList(userData);
    } catch (err) {
      console.warn(err);
      setUserList([]);
    }
  };

  return (
    <View>
      <FlatList
        data={userList}
        renderItem={({item}) => <MatchListItem item={item} navigation={navigation}/>}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default MatchList;

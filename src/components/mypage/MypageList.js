import React, {useContext, useEffect, useState} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Text from 'src/blocks/Text';
import {logout} from 'src/utils/Auth';
import {bringUser} from 'src/utils/User';
import {MyContext, ThemeContext} from 'src/context';

// import {makeMessage} from 'src/utils/Chat';

function MypageList({navigation}) {
  const auth = useContext(MyContext);
  const userSub = auth.user.attributes.sub;
  const {theme} = useContext(ThemeContext);
  const [user, setUser] = useState({
    campus: '',
    graduate: '',
    division: '',
    year: '',
    name: '',
  });
  // makeMessage(userSub, 'no', 'start', 'text');

  useEffect(() => {
    const m_bringUser = async () => {
      try {
        const userData = await bringUser(userSub);
        setUser(userData);
        console.log(user);
      } catch (err) {
        console.warn(err);
      }
    };
    m_bringUser();
  }, []);

  const onLogout = async () => {
    try {
      await logout(auth);
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.sectionBox}>
        <Text style={[styles.itemText, {color: theme.text}]}>{user.campus} {user.graduate}</Text>
        <Text>{user.division} {user.year}학번</Text>
        <Text>{user.name}</Text>
      </View>
      <View style={styles.sectionBox}>
        <Text style={[styles.sectionText, {color: theme.text}]}>프로필</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ModifyProfile')}>
          <Text style={[styles.itemText, {color: theme.text}]}>프로필 수정</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sectionBox}>
        <Text style={[styles.sectionText, {color: theme.text}]}>기타</Text>
        <TouchableOpacity onPress={() => onLogout()}>
          <Text style={[styles.itemText, {color: theme.text}]}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  sectionBox: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 5,
    marginBottom: 15,
  },
  sectionText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemText: {
    marginTop: 2,
    fontSize: 15,
  },
});

export default MypageList;


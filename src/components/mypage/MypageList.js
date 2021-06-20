import React, {useContext, useEffect, useState} from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Text from 'src/blocks/Text';
import {KeyImage} from 'src/blocks/Image';
import {logout} from 'src/utils/Auth';
import {bringUser} from 'src/utils/User';
import {MyContext, ThemeContext, UserContext} from 'src/context';

// import {makeMessage} from 'src/utils/Chat';

function TopIntro({user, navigation}) {
  if (!user || user.id == '') {
    return null;
  }
  const {theme} = useContext(ThemeContext);
  return (
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity onPress={() => navigation.navigate('ViewProfile', {userID: user.id})}>
        {user.imageKeys.length > 0 ?
          <KeyImage
            imgKey={user.imageKeys[0]}
            cached={false}
            resizemode='contain'
            style={[styles.avatar, {borderColor: user.gender=='남자'?theme.men:theme.women}]}
          /> :
          <Image
            source={require('assets/images/no_profile3.png')}
            style={[styles.avatar, {borderColor: user.gender=='남자'?theme.men:theme.women}]}
          />
        }
      </TouchableOpacity>
      <Text style={styles.nameText}>{user.name}</Text>
      <Text style={styles.messageText}>{user.profileMessage}</Text>
    </View>
  );
}

function MypageList({navigation}) {
  const auth = useContext(MyContext);
  const userSub = auth.user.attributes.sub;
  const {theme} = useContext(ThemeContext);
  const [user, setUser] = useState({
    id: '',
    campus: '',
    graduate: '',
    division: '',
    year: '',
    name: '',
  });
  const {refreshMypage} = useContext(UserContext);


  useEffect(() => {
    const m_bringUser = async () => {
      try {
        const userData = await bringUser(userSub);
        setUser(userData);
      } catch (err) {
        console.warn(err);
      }
    };
    m_bringUser();
  }, [refreshMypage]);

  const onLogout = async () => {
    try {
      await logout(auth);
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <View style={styles.container}>
      <TopIntro navigation={navigation} user={user}/>
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
  avatar: {
    margin: 5,
    height: 80,
    width: 80,
    borderRadius: 50,
    borderWidth: 4,
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 3,
  },
  messageText: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 15,
  },
  container: {
    padding: 15,
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


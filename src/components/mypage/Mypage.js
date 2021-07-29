import React, {useContext, useEffect, useState} from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Text from 'src/blocks/Text';
import {KeyImage} from 'src/blocks/Image';
import {bringUser} from 'src/utils/User';
import {MyContext, ThemeContext, UserContext} from 'src/context';
import {MyModifyProfile, MyLogout, MyDeactivate, MyPushNoti, MyFont, MyVerifyCampus} from './MypageItem';

// import {makeMessage} from 'src/utils/Chat';

function TopIntro({user, navigation}) {
  if (!user || user.id == '') {
    return null;
  }
  const {theme} = useContext(ThemeContext);
  return (
    <View style={{alignItems: 'center', minHeight: 100}}>
      <TouchableOpacity onPress={() => navigation.navigate('ViewProfile', {userID: user.id})}>
        {user.imageKeys[0] ?
          <KeyImage
            imgKey={user.imageKeys[0]}
            cached={true}
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

export default function Mypage({navigation}) {
  const auth = useContext(MyContext);
  const userSub = auth.user.sub;
  const {theme} = useContext(ThemeContext);
  const {refreshMypage} = useContext(UserContext);
  const [user, setUser] = useState({
    id: '',
    campus: '',
    graduate: '',
    division: '',
    year: '',
    name: '',
  });

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

  // console.log(user);

  return (
    <View style={styles.container}>
      <TopIntro navigation={navigation} user={user}/>
      <View style={styles.sectionBox}>
        <Text style={[styles.sectionText, {color: theme.text}]}>프로필</Text>
        <MyModifyProfile navigation={navigation}/>
        <MyVerifyCampus navigation={navigation}/>
      </View>
      <View style={styles.sectionBox}>
        <Text style={[styles.sectionText, {color: theme.text}]}>앱 설정</Text>
        <MyPushNoti/>
        <MyFont/>
      </View>
      <View style={styles.sectionBox}>
        <Text style={[styles.sectionText, {color: theme.text}]}>계정</Text>
        <MyLogout/>
        <MyDeactivate navigation={navigation}/>
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
    borderWidth: 3,
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
    borderColor: '#bbbbbb',
    padding: 5,
    marginBottom: 15,
  },
  sectionText: {
    fontWeight: 'bold',
    fontSize: 16,
    margin: 5,
  },

});

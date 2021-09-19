import React, {useContext, useEffect, useState} from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import Text from 'src/blocks/Text';
import {KeyImage} from 'src/blocks/Image';
import {bringUser} from 'src/utils/User';
import {MyContext, ThemeContext, UserContext} from 'src/context';
import config from 'src/config';
import {MyLogout, MyDeactivate, MyPushNoti, MyFont,
  MyVerifyCampus, MyPolicy, MyDeleteAccount, MyContactDeveloper,
  MyIntroSlider, MyEvent} from './MypageItem';

// import {makeMessage} from 'src/utils/Chat';

function TopIntro({user, navigation}) {
  if (!user || user.id == '') {
    return (
      <View style={{minHeight: 120}}/>
    );
  }
  const {theme} = useContext(ThemeContext);

  return (
    <View style={{margin: 5}}>
      <View style={{flexDirection: 'row', minHeight: 100}}>
        <View style={{flex: 5, alignItems: 'center', justifyContent: 'center'}}>
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
        </View>
        <View style={{flex: 7, flexDirection: 'column', justifyContent:'space-evenly', margin: 5}}>
          <Text style={styles.nameText}>{user.name}</Text>
          <Text style={styles.messageText}>{user.profileMessage}</Text>
          <Text style={styles.descriptionText}>{user.profileDescription}</Text>
        </View>        
      </View>
      <View style={{alignItems: 'center'}}>
        <Button
          style={styles.modifyProfileButton}
          // labelStyle={{color: '#444444'}}
          onPress={() => navigation.navigate('ModifyProfile')}
        >
          프로필 수정
        </Button>
      </View>
    </View>
  );

  // return (
  //   <View style={{alignItems: 'center', minHeight: 100}}>
  //     <TouchableOpacity onPress={() => navigation.navigate('ViewProfile', {userID: user.id})}>
  //       {user.imageKeys[0] ?
  //         <KeyImage
  //           imgKey={user.imageKeys[0]}
  //           cached={true}
  //           resizemode='contain'
  //           style={[styles.avatar, {borderColor: user.gender=='남자'?theme.men:theme.women}]}
  //         /> :
  //         <Image
  //           source={require('assets/images/no_profile3.png')}
  //           style={[styles.avatar, {borderColor: user.gender=='남자'?theme.men:theme.women}]}
  //         />
  //       }
  //     </TouchableOpacity>
  //     <Text style={styles.nameText}>{user.name}</Text>
  //     <Text style={styles.messageText}>{user.profileMessage}</Text>
  //   </View>
  // );
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

      <View style={{margin: 5}}/>

      <View style={styles.sectionBox}>
        <Text style={[styles.sectionText, {color: theme.text}]}>앱 설정</Text>
        <MyPushNoti/>
        <MyFont/>
      </View>
      <View style={styles.sectionBox}>
        <Text style={[styles.sectionText, {color: theme.text}]}>계정</Text>
        <MyVerifyCampus navigation={navigation}/>
        <MyLogout/>
        <MyDeactivate navigation={navigation}/>
        <MyDeleteAccount/>
      </View>
      <View style={styles.sectionBox}>
        <Text style={[styles.sectionText, {color: theme.text}]}>기타</Text>
        <MyEvent navigation={navigation}/>
        <MyIntroSlider/>
        <MyPolicy/>
        <MyContactDeveloper/>

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
  modifyProfileButton: {
    borderWidth: 1,
    borderColor: config.colors.main.primary,
    borderRadius: 10,
    width: '80%',
    margin: 5,
  },
  nameText: {
    color: config.colors.main.primary,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  messageText: {
    fontSize: 15,
    color: '#444444',
    marginBottom: 2,
  },
  descriptionText: {
    fontSize: 15,
    color: '#aaaaaa',
  },
  container: {
    padding: 15,
  },
  sectionBox: {
    borderTopWidth: 2,
    borderColor: '#cccccc',
    padding: 10,
    paddingLeft: 15,
  },
  sectionText: {
    fontWeight: 'bold',
    fontSize: 16,
    margin: 5,
  },

});

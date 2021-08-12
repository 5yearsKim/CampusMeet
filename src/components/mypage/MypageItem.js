import React, {useState, useContext} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {RadioButton, Button} from 'react-native-paper';
import Dialog from 'src/blocks/Dialog';
import Text from 'src/blocks/Text';
import SimpleAlert from 'src/blocks/SimpleAlert';
import {MyContext, ThemeContext, UserContext} from 'src/context';
import {logout} from 'src/utils/Auth';
import {handleNotification} from 'src/utils/PushNotification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {modifyUser} from 'src/utils/User';
import config from 'src/config';

export function MyModifyProfile({navigation}) {
  const {theme} = useContext(ThemeContext);
  return (
    <TouchableOpacity onPress={() => navigation.navigate('ModifyProfile')}>
      <Text style={[styles.itemText, {color: theme.text}]}>프로필 수정</Text>
    </TouchableOpacity>
  );
}

export function MyLogout() {
  const auth = useContext(MyContext);
  const {theme} = useContext(ThemeContext);

  const onLogout = async () => {
    try {
      await logout(auth);
      handleNotification(false);
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <TouchableOpacity onPress={() => onLogout()}>
      <Text style={[styles.itemText, {color: theme.text}]}>로그아웃</Text>
    </TouchableOpacity>
  );
}

export function MyDeactivate({navigation}) {
  const auth = useContext(MyContext);
  const userSub = auth.user.sub;
  const {theme} = useContext(ThemeContext);
  const {refreshMypage, setRefreshMypage} = useContext(UserContext);
  const [alertOpen, setAlertOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const onLogout = async () => {
    try {
      await logout(auth);
      handleNotification(false);
    } catch (err) {
      console.warn(err);
    }
  };

  const deactivate = async () => {
    try {
      await modifyUser(userSub, {status: 'inactive'});
      // setConfirmOpen(true);
      // setRefreshMypage(!refreshMypage);
      await onLogout();
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <View>
      <TouchableOpacity onPress={() => setAlertOpen(true)}>
        <Text style={[styles.itemText, {color: theme.text}]}>휴면 전환</Text>
      </TouchableOpacity>
      <SimpleAlert
        modalOpen={alertOpen}
        setModalOpen={setAlertOpen}
        title='휴면전환하시겠습니까?'
        content='휴면전환하시게 되면 나의 카드가 노출되지 않고 시그널 전송, 커뮤니티 이용 등의 활동을 하실 수 없습니다.'
        onCancel={() => {}}
        onOk={() => {
          deactivate();
          navigation.navigate('Deactivate');
        }}
      />
      <SimpleAlert
        modalOpen={confirmOpen}
        setModalOpen={setConfirmOpen}
        title='휴면 전환'
        content='성공적으로 휴면전환 되었습니다!'
        onOk={() => {}}
      />
    </View>
  );
}

export function MyFont() {
  const {theme, font, setFont} = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [myFont, setMyFont] = useState(font ? font : 'nanum');
  const onOk = async () => {
    const jsonValue = JSON.stringify(myFont);
    try {
      await AsyncStorage.setItem('font', jsonValue);
      setFont(myFont);
      setMenuOpen(false);
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <View>
      <TouchableOpacity onPress={() => setMenuOpen(true)}>
        <Text style={[styles.itemText, {color: theme.text}]}>폰트 설정</Text>
      </TouchableOpacity>
      <Dialog visible={menuOpen} onDismiss={() => setMenuOpen(false)}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <RadioButton
            value='off'
            status={myFont == 'nanum' ? 'checked' : 'unchecked'}
            onPress={() => setMyFont('nanum')}
            color={config.colors.main.primary}
          />
          <Text style={styles.menuText} font='nanum'>일반</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <RadioButton
            value='on'
            status={myFont == 'cute' ? 'checked' : 'unchecked'}
            onPress={() => setMyFont('cute')}
            color={config.colors.main.primary}
          />
          <Text style={styles.menuText} font='cute'>귀여운</Text>
        </View>
        <View style={styles.buttonWrapper}>
          <Button onPress={() => onOk()}> OK </Button>
        </View>
      </Dialog>
    </View>
  );
}

export function MyPushNoti() {
  const {theme} = useContext(ThemeContext);
  const {pushNoti, setPushNoti} = useContext(MyContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isNoti, setIsNoti] = useState(pushNoti);

  const onOk = async () => {
    const jsonValue = JSON.stringify(isNoti);
    try {
      await AsyncStorage.setItem('pushNoti', jsonValue);
      setPushNoti(isNoti);
      setMenuOpen(false);
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <View>
      <TouchableOpacity onPress={() => setMenuOpen(true)}>
        <Text style={[styles.itemText, {color: theme.text}]}>푸시알림 설정</Text>
      </TouchableOpacity>
      <Dialog visible={menuOpen} onDismiss={() => setMenuOpen(false)}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <RadioButton
            value='off'
            status={!isNoti ? 'checked' : 'unchecked'}
            onPress={() => setIsNoti(false)}
            color={config.colors.main.primary}
          />
          <Text style={styles.menuText}>끄기</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <RadioButton
            value='on'
            status={isNoti ? 'checked' : 'unchecked'}
            onPress={() => setIsNoti(true)}
            color={config.colors.main.primary}
          />
          <Text style={styles.menuText}>켜기</Text>
        </View>
        <View style={styles.buttonWrapper}>
          <Button onPress={() => onOk()}> OK </Button>
        </View>
      </Dialog>
    </View>
  );
}

export function MyVerifyCampus({navigation}) {
  const {theme} = useContext(ThemeContext);
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('VerifyCampus')}>
        <Text style={[styles.itemText, {color: theme.text}]}>캠퍼스 인증</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  itemText: {
    margin: 3,
    fontSize: 15,
  },
  menuText: {
    fontSize: 14,
  },
});

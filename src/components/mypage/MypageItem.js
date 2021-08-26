import React, {useState, useContext} from 'react';
import {View, TouchableOpacity, Dimensions, ScrollView, StyleSheet} from 'react-native';
import {RadioButton, Button} from 'react-native-paper';
import Dialog from 'src/blocks/Dialog';
import Text from 'src/blocks/Text';
import IntroSlider from 'src/blocks/IntroSlider';
import {termsOfService, privacyPolicy} from 'assets/policy';
import SimpleAlert from 'src/blocks/SimpleAlert';
import {MyContext, UserContext, ThemeContext} from 'src/context';
import {logout} from 'src/utils/Auth';
import {handleNotification} from 'src/utils/PushNotification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {modifyUser, removeUser} from 'src/utils/User';
import {deleteVerification} from 'src/utils/EmailVerification';
import config from 'src/config';

const {width, height} = Dimensions.get('window');

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
  const [confirmOpen, setConfirmOpen] = useState(false);

  const onLogout = async () => {
    try {
      await logout(auth);
      handleNotification(false);
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setConfirmOpen(true)}>
        <Text style={[styles.itemText, {color: theme.text}]}>로그아웃</Text>
      </TouchableOpacity>
      <SimpleAlert
        modalOpen={confirmOpen}
        setModalOpen={setConfirmOpen}
        title='로그아웃'
        content='로그아웃 하시겠습니까?'
        onCancel={() => {}}
        onOk={() => onLogout()}
      />
    </View>
  );
}

export function MyDeactivate({navigation}) {
  const auth = useContext(MyContext);
  const userSub = auth.user.sub;
  const {theme} = useContext(ThemeContext);
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
        title='캠퍼스밋 휴면전환'
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
          <Text style={styles.menuText} font='nanum'>나눔</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <RadioButton
            value='on'
            status={myFont == 'cute' ? 'checked' : 'unchecked'}
            onPress={() => setMyFont('cute')}
            color={config.colors.main.primary}
          />
          <Text style={styles.menuText} font='cute'>큐트</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <RadioButton
            value='on'
            status={myFont == 'surround' ? 'checked' : 'unchecked'}
            onPress={() => setMyFont('surround')}
            color={config.colors.main.primary}
          />
          <Text style={styles.menuText} font='surround'>달팽이</Text>
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

export function MyPolicy() {
  const {theme} = useContext(ThemeContext);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <View>
      <TouchableOpacity onPress={() => setModalOpen(true)}>
        <Text style={[styles.itemText, {color: theme.text}]}>이용 약관</Text>
      </TouchableOpacity>
      <Dialog visible={modalOpen} onDismiss={() => setModalOpen(false)} width={width * 0.85}>
        <View style={styles.policyContainer}>
          <Text style={styles.policyText}>캠퍼스밋 서비스 이용약관</Text>
          <View style={styles.termBox}>
            <ScrollView>
              <View onStartShouldSetResponder={() => true}>
                <Text>{termsOfService}</Text>
              </View>
            </ScrollView>
          </View>
          <Text style={styles.policyText}>캠퍼스밋 개인정보 처리 방침</Text>
          <View style={styles.termBox}>
            <ScrollView>
              <View onStartShouldSetResponder={() => true}>
                <Text>{privacyPolicy}</Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </Dialog>
    </View>
  );
}

export function MyContactDeveloper() {
  const {theme} = useContext(ThemeContext);
  const [alertOpen, setAlertOpen] = useState(false);
  return (
    <View>
      <TouchableOpacity onPress={() => setAlertOpen(true)}>
        <Text style={[styles.itemText, {color: theme.text}]}>캠퍼스밋 연락처</Text>
      </TouchableOpacity>
      <SimpleAlert
        modalOpen={alertOpen}
        setModalOpen={setAlertOpen}
        title='캠퍼스밋 연락처'
        content='문의사항 및 피드백은 campusmeetask@gmail.com 으로 접수해주시기 바랍니다.'
        onOk={() => {}}
      />
    </View>
  );
}

export function MyDeleteAccount() {
  const {theme} = useContext(ThemeContext);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const auth = useContext(MyContext);
  const userSub = auth.user.sub;

  const onLogout = async () => {
    try {
      await logout(auth);
      handleNotification(false);
    } catch (err) {
      console.warn(err);
    }
  };


  const deleteAccount = async () => {
    try {
      await removeUser(userSub);
      await deleteVerification();
      await onLogout();
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <View>
      <TouchableOpacity onPress={() => setConfirmOpen(true)}>
        <Text style={[styles.itemText, {color: theme.text}]}>회원 탈퇴</Text>
      </TouchableOpacity>
      <SimpleAlert
        modalOpen={confirmOpen}
        setModalOpen={setConfirmOpen}
        title='캠퍼스밋 탈퇴'
        content='회원 탈퇴를 하시게 되면 계정 정보를 제외한 모든 프로필, 메일 인증 정보가 삭제됩니다. 탈퇴하시겠습니까?'
        onCancel={() => {}}
        onOk={() => deleteAccount()}
      />
    </View>
  );
}

export function MyIntroSlider() {
  const {theme} = useContext(ThemeContext);
  const {setIntroShow} = useContext(UserContext);
  return (
    <View>
      <TouchableOpacity onPress={() => setIntroShow(true)}>
        <Text style={[styles.itemText, {color: theme.text}]}>튜토리얼</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  termBox: {
    padding: 3,
    height: height * 0.3,
    backgroundColor: '#dddddd',
  },
  itemText: {
    margin: 4,
    fontSize: 15,
  },
  menuText: {
    fontSize: 14,
    // margin: 2,
  },
  policyText: {
    paddingTop: 10,
    paddingBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

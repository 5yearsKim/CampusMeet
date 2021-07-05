import React, {useEffect, useState, useContext} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Text from 'src/blocks/Text';
import SimpleAlert from 'src/blocks/SimpleAlert';
import {MyContext, ThemeContext, UserContext} from 'src/context';
import {logout} from 'src/utils/Auth';
import {notificationHandler} from 'src/utils/PushNotification';
import {modifyUser} from 'src/utils/User';

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
      notificationHandler(null, true);
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

export function MyDeactivate({isActive}) {
  const auth = useContext(MyContext);
  const userSub = auth.user.attributes.sub;
  const {theme} = useContext(ThemeContext);
  const {refreshMypage, setRefreshMypage} = useContext(UserContext);
  const [alertOpen, setAlertOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const deactivate = async () => {
    try {
      await modifyUser(userSub, {status: 'inactive'});
      setRefreshMypage(!refreshMypage);
      setConfirmOpen(true);
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
        onOk={() => deactivate()}
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

const styles = StyleSheet.create({
  itemText: {
    margin: 3,
    fontSize: 15,
  },
});

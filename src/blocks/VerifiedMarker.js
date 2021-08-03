import React, {useEffect, useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import SimpleAlert from 'src/blocks/SimpleAlert';
import {ThemeContext} from 'src/context';
import {Ionicons} from '@expo/vector-icons';
import {getVerification, hideEmail} from 'src/utils/EmailVerification';

export default function VerifiedMarker({userSub, size}) {
  const [email, setEmail] = useState();
  const {theme} = useContext(ThemeContext);
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    const m_getVerification = async () => {
      try {
        const rsp = await getVerification(userSub);
        if (rsp.is_success) {
          setEmail(rsp.data.email);
        }
      } catch (err) {
        console.warn(err);
      }
    };
    m_getVerification();
  }, []);

  const onMarkClicked = () => {
    setAlertOpen(true);
  };

  if (!email) {
    return null;
  }
  return (
    <View>
      <Ionicons
        name="checkmark-done"
        size={size ? size : 24}
        color={theme.verified}
        onPress={onMarkClicked}
      />
      <SimpleAlert
        modalOpen={alertOpen}
        setModalOpen={setAlertOpen}
        title='캠퍼스 메일 인증 정보'
        content={`메일 ${hideEmail(email)}로 인증하였습니다.`}
        onOk={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
});

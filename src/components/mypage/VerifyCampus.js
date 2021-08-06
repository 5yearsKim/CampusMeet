import React, {useEffect, useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import Text from 'src/blocks/Text';
import SimpleAlert from 'src/blocks/SimpleAlert';
import {TextInput, Button} from 'react-native-paper';
import {MyContext, ThemeContext} from 'src/context';
import {getVerification, createVerification, confirmVerification, checkEmailFormat, hideEmail} from 'src/utils/EmailVerification';
import {bringUser} from 'src/utils/User';
import {Ionicons} from '@expo/vector-icons';


export default function VerifyCampus() {
  const auth = useContext(MyContext);
  const {theme} = useContext(ThemeContext);
  const userSub = auth.user.sub;
  const [campus, setCampus] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState(1);
  const [sentAlertOpen, setSentAlertOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [errText, setErrText] = useState('');

  useEffect(() => {
    const m_bringUser = async () => {
      try {
        const userData = await bringUser(userSub);
        setCampus(userData.campus);
      } catch (err) {
        console.warn(err);
      }
    };
    m_bringUser();
  }, []);

  useEffect(() => {
    const m_getVerification = async () => {
      try {
        const rsp = await getVerification();
        if (rsp.is_success) {
          const data = rsp.data;
          setEmail(data.email);
          setDisabled(false);
          if (data.status == 'verified') {
            setStep(3);
          }
        }
      } catch (err) {
        console.warn(err);
      }
      setLoading(false);
    };
    m_getVerification();
  }, []);

  const onButtonPress = async () => {
    if (step == 1) {
      try {
        setDisabled(true);
        await createVerification(email);
        setDisabled(false);
        setStep(step + 1);
      } catch (err) {
        setDisabled(false);
        console.warn(err);
      }
    } else if (step == 2) {
      try {
        const rsp = await confirmVerification(code);
        if (rsp.is_success) {
          setStep(step + 1);
          setErrText('');
        } else {
          if (rsp.code == 'WrongCode') {
            setErrText('인증 코드가 틀립니다.');
          }
        }
      } catch (err) {
        console.warn(err);
      }
    } else if (step == 3) {
      setEmail('');
      setStep(1);
      setDisabled(true);
    }
  };
  if (loading) {
    return (
      <View style={{alignItems: 'center'}}>
        <Text>loading..</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.notiBox}>
        <Text style={styles.titleText}>학교 메일을 인증해주세요!</Text>
        <Text style={styles.contentText}>학교 메일을 통해 다른 사용자에게 내가 다니는 캠퍼스를 인증할 수 있어요.</Text>
      </View>
      <TextInput
        label='학교 인증 메일'
        style={styles.textInput}
        value={email}
        autoCapitalize='none'
        keyboardType='email-address'
        left={<TextInput.Icon name='email'/>}
        onChangeText={(text) => {
          setEmail(text);
          const isValid = checkEmailFormat(text);
          setDisabled(!isValid);
        }}
        editable={step < 3}
      />
      {step == 2 &&
        <View style={{paddingTop: 10}}>
          <Text style={styles.sentText}>메일로 인증코드가 전송되었습니다.</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextInput
              label='메일 인증 코드'
              style={[styles.textInput, {flex: 1}]}
              value={code}
              autoCapitalize='none'
              keyboardType='numeric'
              left={<TextInput.Icon name='email-check'/>}
              onChangeText={(text) => setCode(text)}
            />
            <Button
              compact
              disabled={disabled}
              onPress={async () => {
                setDisabled(true);
                await createVerification(email);
                setDisabled(false);
                setSentAlertOpen(true);
              }}
            >
              재전송
            </Button>
          </View>
        </View>
      }
      {step == 3 &&
        <View style={styles.verifiedBox}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="checkmark-done" size={24} color={theme.verified} />
            <Text style={styles.verifiedText}>캠퍼스 메일이 인증되었습니다!</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.campusText}>{hideEmail(email)}({campus})</Text>
          </View>
        </View>
      }
      {errText != '' &&
        <Text style={styles.errText}>{errText}</Text>
      }
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Button
          mode={step < 3 ? 'contained' : 'text'}
          style={{flex: 1, marginTop: 10}}
          labelStyle={step < 3 ? {color: 'white'} : undefined}
          onPress={onButtonPress}
          disabled={disabled}
        >
          {step == 1 &&
            '인증 코드 받기'
          }
          {step == 2 &&
            '메일 인증'
          }
          {step == 3 &&
            '다시 인증하기'
          }
        </Button>
      </View>
      <SimpleAlert
        modalOpen={sentAlertOpen}
        setModalOpen={setSentAlertOpen}
        title='인증 메일이 전송되었습니다'
        content='메일을 확인해주세요.'
        onOk={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  textInput: {
    backgroundColor: 'transparent',
  },
  notiBox: {
    backgroundColor: '#eeeecc',
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
  },
  verifiedBox: {
    alignItems: 'center',
    padding: 20,
  },
  verifiedText: {
    fontSize: 18,
  },
  campusText: {
    marginTop: 4,
    fontSize: 14,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contentText: {
    fontSize: 15,
  },
  sentText: {
    fontSize: 14,
    color: 'blue',
  },
  errText: {
    color: 'red',
    fontSize: 14,
  },
});

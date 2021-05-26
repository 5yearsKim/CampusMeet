import React, {useState, useEffect, useContext} from 'react';
import {View, Image, Dimensions, TouchableOpacity, StyleSheet} from 'react-native';
import Text from 'src/blocks/Text';
import {RadioButton, Button, TextInput} from 'react-native-paper';
import {handleSignup, confirmSignup, login} from 'src/utils/Auth';
import {MyContext} from 'src/context';

function Register() {
  const auth = useContext(MyContext);
  const [emailSent, setEmailSent] = useState(false);
  const [errText, setErrText] = useState('');

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [emailVerification, setEmailVerification] = useState('');
  const checkFormat = () => {
    if (emailSent == false) {
      setUsername(username.trim());
      setEmail(email.trim());
      if (username.length == 0) {
        setErrText('ID를 설정해주세요.');
        return false;
      }
      if (username.length < 4) {
        setErrText('ID가 너무 짧습니다');
        return false;
      }
      if (password.length < 8) {
        setErrText('비밀번호가 너무 짧습니다.');
        return false;
      }
      if (password.search(/[a-zA-Z]/) < 0) {
        setErrText('비밀번호는 최소 1개의 알파벳을 포함해야 합니다.');
        return false;
      }
      if (password.search(/\d/) < 0) {
        setErrText('비밀번호는 최소 1개의 숫자를 포함하여야 합니다.');
        return false;
      }
      if (password != passwordConfirm) {
        setErrText('비밀번호 확인이 일치하지 않습니다.');
        return false;
      }
      if (email.length == 0) {
        setErrText('메일을 입력해주세요.');
        return false;
      }
      if (email.length < 10) {
        setErrText('메일 포맷이 올바르지 않습니다.');
        return false;
      }
    }
    if (emailSent == true) {
      setEmailVerification(emailVerification.trim());
      if (emailVerification.length == 0) {
        setErrText('메일 인증 코드를 입력해주세요');
        return false;
      }
    }
    return true;
  };
  const _next = async () => {
    if (emailSent == false) {
      if (checkFormat() == false) {
        return;
      }
      try {
        await handleSignup(username, password, email);
        // console.log(rsp);
        setErrText('');
        setEmailSent(true);
      } catch (err) {
        if (err.code == 'UsernameExistsException') {
          setErrText('이미 존재하는 ID입니다.');
        }
        if (err.code == 'InvalidParameterException') {
          if (err.message == 'Invalid email address format.') {
            setErrText('올바른 이메일 형식이 아닙니다.');
          } else {
            setErrText('비밀번호가 올바르지 않습니다.');
          }
        }
        console.warn(err);
      }
    } else {
      try {
        await confirmSignup(username, emailVerification);
        await login(auth, username, password);
        setErrText('');
      } catch (err) {
        console.warn(err);
      }
    }
  };


  return (
    <View>
      <TextInput
        mode='flat'
        label='ID'
        placeholder='6 ~ 15자리 영문 숫자 조합'
        keyboardType='email-address'
        defaultValue={username}
        onChangeText={(text) => setUsername(text)}
        left={<TextInput.Icon name='account'/>}
        style={styles.textInput}
      />
      <TextInput
        mode='flat'
        label='Password'
        placeholder='비밀번호'
        secureTextEntry={true}
        defaultValue={password}
        onChangeText={(text) => setPassword(text)}
        left={<TextInput.Icon name='lock'/>}
        style={styles.textInput}
      />
      <TextInput
        mode='flat'
        label='Password confirmation'
        placeholder='비밀번호 확인'
        secureTextEntry={true}
        defaultValue={passwordConfirm}
        onChangeText={(text) => setPasswordConfirm(text)}
        left={<TextInput.Icon name='lock-check'/>}
        style={styles.textInput}
      />
      <TextInput
        mode='flat'
        label='email'
        keyboardType='email-address'
        placeholder='본인 확인용 이메일'
        defaultValue={email}
        onChangeText={(text) => setEmail(text)}
        left={<TextInput.Icon name='email'/>}
        style={styles.textInput}
      />
      {emailSent &&
      <View>
        <Text style={{color: 'blue'}}>메일로 인증코드가 발송되었습니다. 메일을 확인해주세요.</Text>
        <TextInput
          mode='flat'
          label='Verification Code'
          keyboardType='numeric'
          placeholder='메일 인증 코드'
          defaultValue={emailVerification}
          onChangeText={(text) => setEmailVerification(text)}
          left={<TextInput.Icon name='email-check'/>}
          style={styles.textInput}
        />
      </View>
      }
      {errText.length > 0 &&
        <Text style={styles.errText}>{errText}</Text>
      }
      <Button
        mode='contained'
        onPress={_next}
        labelStyle={styles.buttonText}
      >
        {emailSent?
        '회원가입':
        '메일인증'
        }
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'white',
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
  },
  errText: {
    color: 'red',
  },
});

export default Register;

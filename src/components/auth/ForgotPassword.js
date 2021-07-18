import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Text from 'src/blocks/Text';
import {TextInput, Button} from 'react-native-paper';
import {forgotPassword, forgotPasswordSubmit} from 'src/utils/Auth';

function ForgotPassword({navigation}) {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [destination, setDestination] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [emailVerification, setEmailVerification] = useState('');
  const [errText, setErrText] = useState('');


  const checkFormat1 = () => {
    if (username.length < 4) {
      setErrText('id가 너무 짧습니다.');
      return false;
    }
    return true;
  };

  const onSubmit1 = async () => {
    if (checkFormat1() == false) {
      return;
    }
    try {
      const rsp = await forgotPassword(username);
      setDestination(rsp.CodeDeliveryDetails.Destination);
      setErrText('');
      setStep(step + 1);
    } catch (err) {
      setErrText(err);
    }
  };

  const checkFormat2 = () => {
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
    if (emailVerification.length < 1) {
      setErrText('메일 인증 코드를 입력해주세요.');
      return false;
    }
    return true;
  };


  const onSubmit2 = async () => {
    if (checkFormat2() == false) {
      return;
    }
    try {
      await forgotPasswordSubmit(username, emailVerification, password);
      setErrText('');
      setStep(step + 1);
    } catch (err) {
      if (err.code == 'LimitExceededException') {
        setErrText('입력횟수제한을 초과하셨습니다. 시간이 지난 뒤에 다시 시도해주십시오.');
      } else if (err.code == 'CodeMismatchException') {
        setErrText('인증코드가 틀립니다.');
      } else if (err.code == 'InvalidParameterException') {
        setErrText('패스워드를 다시 입력해주세요.' + err.message);
      }
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      {step == 1 &&
        <React.Fragment>
          <Text>아이디를 입력해주세요. 등록된 메일로 인증코드가 발송됩니다.</Text>
          <TextInput
            mode='flat'
            label='ID'
            placeholder='ID 또는 email'
            keyboardType='default'
            defaultValue={username}
            onChangeText={(text) => setUsername(text)}
            style={{backgroundColor: 'white'}}
            left={<TextInput.Icon name='account'/>}
          />
          <View style={styles.buttonContainer}>
            <Button
              mode='contained'
              onPress={onSubmit1}
            >
              <Text style={styles.buttonText}>비밀번호 찾기</Text>
            </Button>
          </View>
        </React.Fragment>
      }
      {step == 2 &&
        <React.Fragment>
          <Text>{destination}으로 인증코드가 발송되었습니다. 인증번호를 새로운 비밀번호와 함께 입력해주세요.</Text>
          <TextInput
            mode='flat'
            label='Password'
            placeholder='비밀번호'
            secureTextEntry={true}
            defaultValue={password}
            onChangeText={(text) => setPassword(text)}
            style={{backgroundColor: 'white'}}
            left={<TextInput.Icon name='lock'/>}
          />
          <TextInput
            mode='flat'
            label='Password Confirm'
            placeholder='비밀번호 확인'
            secureTextEntry={true}
            defaultValue={passwordConfirm}
            onChangeText={(text) => setPasswordConfirm(text)}
            style={{backgroundColor: 'white'}}
            left={<TextInput.Icon name='lock-check'/>}
          />
          <View style={{marginTop: 20}}>
            <TextInput
              mode='flat'
              label='verification code'
              placeholder='메일 인증 코드'
              keyboardType='numeric'
              defaultValue={emailVerification}
              onChangeText={(text) => setEmailVerification(text)}
              style={{backgroundColor: 'white'}}
              left={<TextInput.Icon name='email-check'/>}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              mode='contained'
              onPress={onSubmit2}
            >
              <Text style={styles.buttonText}>비밀번호 찾기</Text>
            </Button>
          </View>
        </React.Fragment>
      }
      {step == 3 &&
        <React.Fragment>
          <Text style={styles.successText}>비밀번호가 새로 설정되었습니다. 다시 로그인 해 주세요.</Text>
          <View style={styles.buttonContainer}>
            <Button
              mode='contained'
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.buttonText}>로그인</Text>
            </Button>
          </View>
        </React.Fragment>
      }
      {errText.length > 0 &&
        <Text style={styles.errText}>{errText}</Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  buttonContainer: {
    marginTop: 10,
    marginBottom: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  successText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  errText: {
    color: 'red',
  },
});

export default ForgotPassword;

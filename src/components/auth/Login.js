import React, {useState, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import Text from 'src/blocks/Text';
import {Button, TextInput} from 'react-native-paper';
import {login} from 'src/utils/Auth';
import {MyContext} from 'src/context';

// todo: button disabled logic
function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errText, setErrText] = useState('');
  const auth = useContext(MyContext);

  const checkFormat = () => {
    if (username.length < 4) {
      setErrText('id가 너무 짧습니다.');
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
    return true;
  };

  const onSubmit = async () => {
    if (checkFormat() == false) {
      return;
    }
    try {
      const rsp = await login(auth, username, password);
    } catch (err) {
      if (err.code == 'NotAuthorizedException') {
        setErrText('ID 또는 비밀번호가 일치하지 않습니다.');
      };
      if (err.code == 'UserNotConfirmedException') {
        setErrText('인증되지 않은 유저입니다.');
      }
      console.warn(err);
    }
  };
  return (
    <View>
      <TextInput
        mode='flat'
        label='ID'
        placeholder='ID 또는 email'
        keyboardType='default'
        defaultValue={username}
        onChangeText={(text) => setUsername(text)}
        style={{backgroundColor: 'white'}}
        left={<TextInput.Icon name='account'/>}
        autoCapitalize='none'
      />
      <TextInput
        mode='flat'
        label='Password'
        placeholder='비밀번호'
        secureTextEntry={true}
        defaultValue={password}
        onChangeText={(text) => setPassword(text)}
        style={{backgroundColor: 'white'}}
        left={<TextInput.Icon name='lock'/>}
        autoCapitalize='none'
      />
      {errText.length > 0 &&
        <Text style={styles.errText}>{errText}</Text>
      }
      <View style={styles.buttonContainer}>
        <Button
          mode='contained'
          compact={true}
          onPress={onSubmit}
        >
          <Text style={styles.buttonText}>로그인</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    marginBottom: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  errText: {
    color: 'red',
  },
});

export default Login;

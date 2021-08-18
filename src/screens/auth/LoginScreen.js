import React, {useState} from 'react';
import {StyleSheet, ScrollView, Dimensions, TouchableOpacity, Image, Text, View, KeyboardAvoidingView, Platform} from 'react-native';
import {Button} from 'react-native-paper';
import Login from 'src/components/auth/Login';
import AuthBackground from 'src/blocks/AuthBackground';
import {Auth} from 'aws-amplify';
import Agreement from 'src/blocks/Agreement';

const {width} = Dimensions.get('window');

export default function LoginScreen(props) {
  const [mode, setMode] = useState(); // mode in ['register', 'google', 'apple']
  const [agreeOpen, setAgreeOpen] = useState(false);

  const onAgreementOk = () => {
    if (mode == 'register') {
      props.navigation.navigate('Register');
    } else if (mode == 'google') {
      Auth.federatedSignIn({provider: 'Google'});
    } else if (mode == 'apple') {
      Auth.federatedSignIn({provider: 'SignInWithApple'});
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <AuthBackground/>
      <View style={styles.loginBox}>
        <Login {...props}/>
        <Button mode='outlined' onPress={() => {
          setMode('register');
          setAgreeOpen(true);
        }}>
          회원가입
        </Button>

        <TouchableOpacity onPress={() => {
          setMode('google');
          setAgreeOpen(true);
        }}>
          <View style={styles.googleButton}>
            <Image source={require('assets/images/google_logo.png')} style={styles.googleLogo}/>
            <Text style={styles.googleText}>Google 로 로그인</Text>
          </View>
        </TouchableOpacity>

        {Platform.OS === 'ios' &&
          <TouchableOpacity onPress={() => {
            setMode('apple');
            setAgreeOpen(true);
          }}>
            <View style={styles.appleButton}>
              <Image source={require('assets/images/apple_logo.png')} style={styles.appleLogo} reesizeMode='contain'/>
              <Text style={styles.appleText}>Apple 로 로그인</Text>
            </View>
          </TouchableOpacity>
        }

        <View style={{alignItems: 'center', marginTop: 10}}>
          <TouchableOpacity onPress={() => props.navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPassword}>비밀번호를 잊으셨나요?</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Agreement
        visible={agreeOpen}
        onDismiss={() => setAgreeOpen(false)}
        onOk={onAgreementOk}
      />
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBox: {
    width: width * 0.8,
    padding: 10,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  forgotPassword: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#444444',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  googleButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#dddddd',
    padding: 5,
    margin: 5,
    marginTop: 15,
  },
  googleLogo: {
    width: 25,
    height: 25,
  },
  googleText: {
    fontSize: 15,
    marginLeft: 10,
    color: 'gray',
  },
  appleButton: {
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: '#dddddd',
    padding: 5,
    margin: 5,
  },
  appleLogo: {
    width: 20,
    height: 24,
  },
  appleText: {
    fontSize: 15,
    marginLeft: 10,
    color: 'white',
  },
});

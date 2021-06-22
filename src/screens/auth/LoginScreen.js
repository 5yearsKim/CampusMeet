import React, {useContext} from 'react';
import {StyleSheet, Dimensions, TouchableOpacity, Text, View, KeyboardAvoidingView} from 'react-native';
import {Button} from 'react-native-paper';
import {LinearGradient} from 'expo-linear-gradient';
import Login from 'src/components/auth/Login';
import config from 'src/config';

const colors = config.colors;
const {width, height} = Dimensions.get('window');

function HomeScreen(props) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <LinearGradient
        // colors={[colors.main.primary, colors.main.primary_]}
        colors={[colors.main.primary, 'transparent']}
        style={styles.background}
      />
      <View style={styles.loginBox}>
        <Login {...props}/>
        <Button
          mode='outlined'
          onPress={() => {
            props.navigation.navigate('Register');
          }}
        >
          회원가입
        </Button>
        <View style={{alignItems: 'center', marginTop: 10}}>
          <TouchableOpacity onPress={() => props.navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPassword}>비밀번호를 잊으셨나요?</Text>
          </TouchableOpacity>
        </View>
      </View>
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
});

export default HomeScreen;

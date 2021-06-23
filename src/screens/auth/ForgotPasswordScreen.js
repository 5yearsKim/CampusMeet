import React from 'react';
import {StyleSheet, Dimensions, View, KeyboardAvoidingView} from 'react-native';
import ForgotPassword from 'src/components/auth/ForgotPassword';
import AuthBackground from 'src/blocks/AuthBackground';

const {width, height} = Dimensions.get('window');

function ForgotPasswordScreen(props) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <AuthBackground/>
      <View style={styles.passwordBox}>
        <ForgotPassword {...props}/>
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
  passwordBox: {
    width: width * 0.8,
    minHeight: height * 0.25,
    padding: 25,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',

  },
});

export default ForgotPasswordScreen;

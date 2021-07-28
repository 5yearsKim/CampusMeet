import React from 'react';
import {View, Dimensions, KeyboardAvoidingView, StyleSheet} from 'react-native';
import Register from 'src/components/auth/Register';
import AuthBackground from 'src/blocks/AuthBackground';
import {useKeyboard} from 'src/blocks/Keyboard';

const {width, height} = Dimensions.get('window');

function RegisterScreen(props) {
  const {iosPadding} = useKeyboard();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={iosPadding}
    >
      <AuthBackground/>
      <View style={styles.mainBox}>
        <Register {...props}/>
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
  mainBox: {
    width: width * 0.8,
    padding: 10,
    paddingTop: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
  },
});

export default RegisterScreen;

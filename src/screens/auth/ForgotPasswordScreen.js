import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import ForgotPassword from 'src/components/auth/ForgotPassword';
import config from 'src/config';

const colors = config.colors;
const {width, height} = Dimensions.get('window');

function ForgotPasswordScreen(props) {
  return (
    <View style={styles.container}>
      <LinearGradient
        // colors={[colors.main.primary, colors.main.primary_]}
        colors={[colors.main.primary, 'transparent']}
        style={styles.background}
      />
      <View style={styles.passwordBox}>
        <ForgotPassword {...props}/>
      </View>
    </View>
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
    height: height * 0.5,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',

  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

export default ForgotPasswordScreen;
